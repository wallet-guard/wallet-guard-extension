import { Conversation, KeyValuePair, Message, OpenAIModel } from '../../types';
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react';
import { ChatInput } from './ChatInput';
import { ChatLoader } from './ChatLoader';
import { ChatMessage } from './ChatMessage';
import { ModelSelect } from './ModelSelect';
import { Regenerate } from './Regenerate';
import { SystemPrompt } from './SystemPrompt';
import React from 'react';
import '../../styles/globals.css';

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  return (
    <div className="relative flex-1 overflow-none dark:bg-[#343541]">
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
                <div className="flex flex-col mx-auto pt-12 space-y-10 w-[350px] sm:w-[600px]">
                  <div className="text-4xl font-semibold text-center text-gray-800 dark:text-gray-100">
                    {'ChatWeb3'}
                  </div>

                  {models.length > 0 && (
                    <div className="flex flex-col h-full space-y-4 border p-4 rounded border-neutral-500">
                      <ModelSelect
                        model={conversation.model}
                        models={models}
                        onModelChange={(model) =>
                          onUpdateConversation(conversation, {
                            key: 'model',
                            value: model,
                          })
                        }
                      />

                      <SystemPrompt
                        conversation={conversation}
                        onChangePrompt={(prompt) =>
                          onUpdateConversation(conversation, {
                            key: 'prompt',
                            value: prompt,
                          })
                        }
                      />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center py-2 text-neutral-500 bg-neutral-100 dark:bg-[#444654] dark:text-neutral-200 text-sm  dark:border-none">
                  Model: {conversation.model.name}
                </div>

                {conversation.messages.map((message, index) => (
                  <ChatMessage key={index} message={message} lightMode={'dark'} />
                ))}

                {loading && <ChatLoader />}

                <div className=" dark:bg-[#343541] h-[162px]" ref={messagesEndRef} />
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
