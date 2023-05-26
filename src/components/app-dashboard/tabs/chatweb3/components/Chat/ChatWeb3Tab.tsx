import React, { useEffect, useState } from 'react';
import { useChat } from '../../../../../../lib/hooks/useChat';
import { Chat } from './Chat';

export const ChatWeb3Tab = ({
  showChatWeb3,
  setShowChatWeb3,
  fromSimulation,
}: {
  showChatWeb3?: any;
  setShowChatWeb3?: any;
  fromSimulation?: boolean;
}) => {
  const [lightMode, setLightMode] = useState<'dark' | 'light'>('dark');
  const {
    selectedConversation,
    messageIsStreaming,
    modelError,
    messageError,
    models,
    loading,
    handleSend,
    handleUpdateConversation,
    stopConversationRef,
  } = useChat();

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      setLightMode('dark');
    }
  }, []);

  return (
    <>
      {selectedConversation && (
        <div className={`d-flex flex-column text-white`} style={{ fontSize: '0.875rem', height: '100vh' }}>
          <div className="d-flex h-100 w-100 pt-0">
            <Chat
              conversation={selectedConversation}
              messageIsStreaming={messageIsStreaming}
              modelError={modelError}
              messageError={messageError}
              showChatWeb3={showChatWeb3}
              setShowChatWeb3={setShowChatWeb3}
              models={models}
              loading={loading}
              lightMode={lightMode}
              onSend={handleSend}
              onUpdateConversation={handleUpdateConversation}
              stopConversationRef={stopConversationRef}
              fromSimulation={fromSimulation}
            />
          </div>
        </div>
      )}
    </>
  );
};
