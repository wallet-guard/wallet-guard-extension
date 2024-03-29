import { useState, useRef, useEffect } from 'react';
import {
  ChatWeb3RequestBody,
  Conversation,
  KeyValuePair,
  Message,
  OpenAIModel,
  OpenAIModelID,
  OpenAIModels,
} from '../../models/chatweb3/chatweb3';
import { CHATWEB3_SERVER_URL_PROD } from '../environment';
import { updateConversation } from '../helpers/chatweb3/conversation';
import { StoredSimulation } from '../simulation/storage';

export const useChat = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation>();
  const [loading, setLoading] = useState<boolean>(false);
  const [models, setModels] = useState<OpenAIModel[]>([]);
  const [messageIsStreaming, setMessageIsStreaming] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);
  const [modelError, setModelError] = useState<boolean>(false);
  const stopConversationRef = useRef<boolean>(false);

  const handleSend = async (message: Message, isResend: boolean, storedSimulation: StoredSimulation | null = null) => {
    if (selectedConversation) {
      let updatedConversation: Conversation;

      if (isResend) {
        const updatedMessages = [...selectedConversation.messages];
        updatedMessages.pop();

        updatedConversation = {
          ...selectedConversation,
          messages: [...updatedMessages, message],
        };
      } else {
        updatedConversation = {
          ...selectedConversation,
          messages: [...selectedConversation.messages, message],
        };
      }

      setSelectedConversation(updatedConversation);
      setLoading(true);
      setMessageIsStreaming(true);
      setMessageError(false);

      const controller = new AbortController();

      const requestBody: ChatWeb3RequestBody = {
        model: updatedConversation.model,
        messages: updatedConversation.messages,
        plugin: 'DEFAULT',
      };

      let requestUrl;

      if (storedSimulation) {
        // Add simulation to the request payload only if storedSimulation exists
        requestBody.simulation = storedSimulation;
        requestUrl = CHATWEB3_SERVER_URL_PROD + '/v2/simulation';
      } else {
        requestUrl = CHATWEB3_SERVER_URL_PROD + '/v2/chat';
      }

      // Convert request payload to JSON
      const body = JSON.stringify(requestBody);

      // Make the request
      const res = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: body,
      });

      if (!res.ok) {
        setLoading(false);
        setMessageIsStreaming(false);
        setMessageError(true);
        return;
      }

      const data = res.body;

      if (!data) {
        setLoading(false);
        setMessageIsStreaming(false);
        setMessageError(true);

        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let isFirstMessageChunk = true;
      let text = '';

      while (!done) {
        if (stopConversationRef.current === true) {
          controller.abort();
          done = true;
          break;
        }
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        text += chunkValue;

        if (isFirstMessageChunk) {
          setLoading(false);
          isFirstMessageChunk = false;
          const updatedMessages: Message[] = [
            ...updatedConversation.messages,
            { role: 'assistant', content: chunkValue },
          ];

          updatedConversation = {
            ...updatedConversation,
            messages: updatedMessages,
          };

          setSelectedConversation(updatedConversation);
        } else {
          const updatedMessages: Message[] = updatedConversation.messages.map((message, index) => {
            if (index === updatedConversation.messages.length - 1) {
              return {
                ...message,
                content: text,
              };
            }

            return message;
          });

          updatedConversation = {
            ...updatedConversation,
            messages: updatedMessages,
          };

          setSelectedConversation(updatedConversation);
        }
      }

      const updatedConversations: Conversation[] = conversations.map((conversation) => {
        if (conversation.id === selectedConversation.id) {
          return updatedConversation;
        }

        return conversation;
      });

      if (updatedConversations.length === 0) {
        updatedConversations.push(updatedConversation);
      }

      setConversations(updatedConversations);

      setMessageIsStreaming(false);
    }
  };

  const handleUpdateConversation = (conversation: Conversation, data: KeyValuePair) => {
    const updatedConversation = {
      ...conversation,
      [data.key]: data.value,
    };

    const { single, all } = updateConversation(updatedConversation, conversations);

    setSelectedConversation(single);
    setConversations(all);
  };

  useEffect(() => {
    setSelectedConversation({
      id: 1,
      name: 'New conversation',
      messages: [],
      model: OpenAIModels[OpenAIModelID.GPT_3_5],
      prompt: 'DEFAULT',
    });
  }, []);

  return {
    selectedConversation,
    messageIsStreaming,
    modelError,
    messageError,
    models,
    loading,
    handleSend,
    handleUpdateConversation,
    stopConversationRef,
  };
};
