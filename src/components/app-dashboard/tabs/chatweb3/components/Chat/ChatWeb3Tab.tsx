import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useChat } from '../../../../../../lib/hooks/useChat';
import { Chat } from './Chat';
import { CompletedSuccessfulSimulation } from '../../../../../../lib/simulation/storage';
import posthog from 'posthog-js';

export const ChatWeb3Tab = ({
  showChatWeb3,
  setShowChatWeb3,
  storedSimulation,
}: {
  showChatWeb3?: boolean | undefined;
  setShowChatWeb3?: Dispatch<SetStateAction<boolean>> | undefined;
  storedSimulation?: CompletedSuccessfulSimulation | undefined;
}) => {
  const [lightMode, setLightMode] = useState<'dark'>('dark');
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
    if (showChatWeb3) {
      posthog.capture('chatweb3 opened', { source: 'simulation' });
    } else {
      posthog.capture('chatweb3 closed', { source: 'hotkey' });
    }
  }, []);

  return (
    <>
      {selectedConversation && (
        <div className={`d-flex flex-column text-white`} style={{ fontSize: '0.875rem', height: '100%', minHeight: '100vh' }}>
          <div className="d-flex h-100 w-100">
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
              storedSimulation={storedSimulation}
            />
          </div>
        </div>
      )}
    </>
  );
};
