import { useEffect, useState } from 'react';
import React from 'react';
import { useChat } from '../hooks/useChat';
import { Chat } from '../components/Chat/Chat';

export const Home = () => {
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
};
