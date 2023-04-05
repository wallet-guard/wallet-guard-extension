import { Conversation, KeyValuePair, Message, OpenAIModel } from '../../../../../../models/chatweb3/chatweb3';
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react';
import { ChatInput } from './ChatInput';
import { ChatLoader } from './ChatLoader';
import { ChatMessage } from './ChatMessage';
import { ModelSelect } from './ModelSelect';
import { Regenerate } from './Regenerate';
import { SystemPrompt } from './SystemPrompt';
import React from 'react';
import '../../styles/globals.css';
import { ChatInputDashboard } from './ChatInputDashboard';
import { Navbar } from './ChatWeb3Navbar';
import { ChatWeb3Landing } from './ChatWeb3Landing';

interface Props {
  conversation: Conversation;
  models: OpenAIModel[];
  messageIsStreaming: boolean;
  modelError: boolean;
  messageError: boolean;
  loading: boolean;
  lightMode: 'light' | 'dark';
  onSend: (message: Message, isResend: boolean) => void;
  onUpdateConversation: (conversation: Conversation, data: KeyValuePair) => void;
  stopConversationRef: MutableRefObject<boolean>;
}

export const Chat: FC<Props> = ({
  conversation,
  models,
  messageIsStreaming,
  modelError,
  messageError,
  loading,
  lightMode,
  onSend,
  onUpdateConversation,
  stopConversationRef,
}) => {
  const [currentMessage, setCurrentMessage] = useState<Message>();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    scrollToBottom();
    textareaRef.current?.focus();
  }, [conversation.messages]);

  return (
    <div className="relative flex-1 overflow-none dark:bg-[#161616]">
      {modelError ? (
        <div className="flex flex-col justify-center mx-auto h-full w-[300px] sm:w-[500px] space-y-6">
          <div className="text-center text-red-500">Error fetching models.</div>
          <div className="text-center text-red-500">
            Make sure your OpenAI API key is set in the bottom left of the sidebar or in a .env.local file and refresh.
          </div>
          <div className="text-center text-red-500">If you completed this step, OpenAI may be experiencing issues.</div>
        </div>
      ) : (
        <>
          <div className="overflow-scroll max-h-full">
            {conversation.messages.length === 0 ? (
              <>
                <Navbar />

                <div className="flex flex-col mx-auto space-y-10 sm:w-[600px]">
                  <ChatWeb3Landing />
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center py-2 text-neutral-500 bg-neutral-100 dark:bg-[#161616] dark:text-neutral-200 text-sm  dark:border-none">
                  Model: {conversation.model.name}
                </div>

                {conversation.messages.map((message, index) => (
                  <ChatMessage key={index} message={message} lightMode={'dark'} />
                ))}

                {loading && <ChatLoader />}

                <div className=" dark:bg-[#161616] h-[162px]" ref={messagesEndRef} />
              </>
            )}
          </div>

          {messageError ? (
            <Regenerate
              onRegenerate={() => {
                if (currentMessage) {
                  onSend(currentMessage, true);
                }
              }}
            />
          ) : (
            <ChatInput
              stopConversationRef={stopConversationRef}
              messageIsStreaming={messageIsStreaming}
              textareaRef={textareaRef}
              onSend={(message) => {
                setCurrentMessage(message);
                onSend(message, false);
              }}
              model={conversation.model}
            />
          )}
        </>
      )}
    </div>
  );
};
