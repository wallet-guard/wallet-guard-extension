import React, { Dispatch, SetStateAction, useState } from 'react';
import { useChat } from '../../../../../../lib/hooks/useChat';
import { Chat } from './Chat';
import { StoredSimulation } from '../../../../../../lib/simulation/storage';

export const ChatWeb3Tab = ({
  showChatWeb3,
  setShowChatWeb3,
  storedSimulation,
}: {
  showChatWeb3?: boolean | undefined;
  setShowChatWeb3?: Dispatch<SetStateAction<boolean>> | undefined;
  storedSimulation?: StoredSimulation | undefined;
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

  return (
    <>
      {selectedConversation && (
        <div className={`d-flex flex-column text-white`} style={{ fontSize: '0.875rem', height: '100%' }}>
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
              storedSimulation={storedSimulation}
            />
          </div>
        </div>
      )}
    </>
  );
};
