import { Conversation, KeyValuePair, Message, OpenAIModel } from '../../../../../../models/chatweb3/chatweb3';
import { Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import { ChatInput } from './ChatInput';
import { ChatLoader } from './ChatLoader';
import { ChatMessage } from './ChatMessage';
import { Regenerate } from './Regenerate';
import React from 'react';
import '../../styles/globals.css';
import { Navbar } from './ChatWeb3Navbar';
import { StoredSimulation } from '../../../../../../lib/simulation/storage';

interface Props {
  conversation: Conversation;
  models: OpenAIModel[];
  messageIsStreaming: boolean;
  modelError: boolean;
  messageError: boolean;
  loading: boolean;
  lightMode: 'dark';
  onSend: (message: Message, isResend: boolean, storedSimulation?: StoredSimulation) => void;
  onUpdateConversation: (conversation: Conversation, data: KeyValuePair) => void;
  stopConversationRef: MutableRefObject<boolean>;
  showChatWeb3?: boolean;
  setShowChatWeb3?: Dispatch<SetStateAction<boolean>> | undefined;
  storedSimulation?: StoredSimulation;
}

export const Chat: FC<Props> = ({
  conversation,
  messageIsStreaming,
  messageError,
  loading,
  lightMode,
  onSend,
  onUpdateConversation,
  stopConversationRef,
  showChatWeb3,
  setShowChatWeb3,
  storedSimulation,
}) => {
  const [currentMessage, setCurrentMessage] = useState<Message>();

  const [hideOnLargeScreens, setHideOnLargeScreens] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setHideOnLargeScreens(window.matchMedia('(min-width: 600px)').matches);
    };

    // Add event listener to update the state on resize
    window.addEventListener('resize', handleResize);

    // Initial check on component mount
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
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
    <div
      style={{
        position: 'relative',
        flex: 1,
        maxHeight: '100%',
        minHeight: '100vh',
        backgroundColor: '#161616',
      }}
    >
      <Navbar showChatWeb3={showChatWeb3} setShowChatWeb3={setShowChatWeb3} />

      {conversation?.messages.length === 0 ? (
        <>
          <div style={{ height: '162px', backgroundColor: '#151515' }} ref={messagesEndRef} />
        </>
      ) : (
        <>
          {conversation?.messages &&
            conversation?.messages.map((message, index) => <ChatMessage key={index} message={message} index={index} />)}

          {loading && <ChatLoader />}

          <div style={{ height: '184px', backgroundColor: '#151515' }} ref={messagesEndRef} />
        </>
      )}
      <>
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
            showChatWeb3={showChatWeb3}
            onSend={(message) => {
              setCurrentMessage(message);
              if (storedSimulation) {
                onSend(message, false, storedSimulation);
              } else {
                onSend(message, false);
              }
            }}
            model={conversation.model}
          />
        )}
      </>
    </div>
  );
};
