import { ChatBody, Conversation, KeyValuePair, Message, OpenAIModel, OpenAIModelID, OpenAIModels } from '../types';
import { IconArrowBarLeft, IconArrowBarRight } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { saveConversation, saveConversations, updateConversation } from '../utils/app/conversation';
import { exportConversations, importConversations } from '../utils/app/data';
import { DEFAULT_SYSTEM_PROMPT } from '../utils/app/const';
import { cleanConversationHistory, cleanSelectedConversation } from '../utils/app/clean';
import React from 'react';
import { Chat } from '../components/Chat/Chat';
import '../styles/globals.css';

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation>();
  const [loading, setLoading] = useState<boolean>(false);
  const [models, setModels] = useState<OpenAIModel[]>([]);
  const [lightMode, setLightMode] = useState<'dark' | 'light'>('dark');
  const [messageIsStreaming, setMessageIsStreaming] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('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');
  const [messageError, setMessageError] = useState<boolean>(false);
  const [modelError, setModelError] = useState<boolean>(false);
  const stopConversationRef = useRef<boolean>(false);

  const handleSend = async (message: Message, isResend: boolean) => {
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

      // const chatBody: any = {
      //   conversationID: '12345',
      //   // model: updatedConversation.model,
      //   messages: updatedConversation.messages,
      //   // key: apiKey,
      //   // prompt: updatedConversation.prompt,
      // };

      const chatBody: ChatBody = {
        model: updatedConversation.model,
        messages: updatedConversation.messages,
        key: apiKey,
        prompt: updatedConversation.prompt,
      };

      console.log(chatBody);

      const controller = new AbortController();
      const response = await fetch('http://localhost:8080/chatweb3/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatBody),
      });

      if (!response.ok) {
        setLoading(false);
        setMessageIsStreaming(false);
        setMessageError(true);
        return;
      }

      const data = response.body;

      if (!data) {
        setLoading(false);
        setMessageIsStreaming(false);
        setMessageError(true);

        return;
      }

      setLoading(false);

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let isFirst = true;
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

        if (isFirst) {
          isFirst = false;
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

      saveConversation(updatedConversation);

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

      saveConversations(updatedConversations);

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

  useEffect(() => {}, [apiKey]);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      setLightMode('dark');
    }

    const apiKey = localStorage.getItem('apiKey') || '';
    if (apiKey) {
      setApiKey(apiKey);
    }

    // const conversationHistory = localStorage.getItem('conversationHistory');
    // if (conversationHistory) {
    //   const parsedConversationHistory: Conversation[] = JSON.parse(conversationHistory);
    //   const cleanedConversationHistory = cleanConversationHistory(parsedConversationHistory);
    //   setConversations(cleanedConversationHistory);
    // }

    setSelectedConversation({
      id: 1,
      name: 'New conversation',
      messages: [],
      model: OpenAIModels[OpenAIModelID.GPT_3_5],
      prompt: DEFAULT_SYSTEM_PROMPT,
    });

    // const selectedConversation = localStorage.getItem('selectedConversation');
    // if (selectedConversation) {
    //   const parsedSelectedConversation: Conversation = JSON.parse(selectedConversation);
    //   const cleanedSelectedConversation = cleanSelectedConversation(parsedSelectedConversation);
    //   setSelectedConversation(cleanedSelectedConversation);
    // } else {
    //   setSelectedConversation({
    //     id: 1,
    //     name: 'New conversation',
    //     messages: [],
    //     model: OpenAIModels[OpenAIModelID.GPT_3_5],
    //     prompt: DEFAULT_SYSTEM_PROMPT,
    //   });
    // }
  }, []);

  return (
    <>
      {selectedConversation && (
        <div className={`flex flex-col h-screen text-white dark:text-white text-sm ${lightMode}`}>
          <div className="flex h-full w-full  sm:pt-0">
            <Chat
              conversation={selectedConversation}
              messageIsStreaming={messageIsStreaming}
              modelError={modelError}
              messageError={messageError}
              models={models}
              loading={loading}
              lightMode={lightMode}
              onSend={handleSend}
              onUpdateConversation={handleUpdateConversation}
              stopConversationRef={stopConversationRef}
            />
          </div>
        </div>
      )}
    </>
  );
}
