import { IconSend } from '@tabler/icons-react';
import { FC, KeyboardEvent, MutableRefObject, useEffect, useState } from 'react';
import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { Message, OpenAIModel, OpenAIModelID } from '../../../../../../models/chatweb3/chatweb3';
import '../../styles/chatweb3.css';
import { Spinner } from '@chakra-ui/react';
import { chatWeb3QuestionsRefactored } from '../../../../../../lib/helpers/chatweb3/questions';
import posthog from 'posthog-js';
import { CompletedSuccessfulSimulation } from '../../../../../../lib/simulation/storage';

interface Props {
  messageIsStreaming: boolean;
  onSend: (message: Message) => void;
  model: OpenAIModel;
  stopConversationRef: MutableRefObject<boolean>;
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  showChatWeb3?: boolean;
  storedSimulation?: CompletedSuccessfulSimulation;
}

export const ChatInput: FC<Props> = ({
  onSend,
  messageIsStreaming,
  model,
  stopConversationRef,
  textareaRef,
  showChatWeb3,
  storedSimulation
}) => {
  const [content, setContent] = useState<string>();
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [currentUrl, setCurrentUrl] = useState<string | undefined>('');
  const [hideOnLargeScreens, setHideOnLargeScreens] = useState(false);

  useEffect(() => {
    if (storedSimulation) {
      setCurrentUrl(storedSimulation.simulation.scanResult.domainName);
    }
  }, []);

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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const maxLength = model.id === OpenAIModelID.GPT_3_5 ? 12000 : 24000;

    if (value.length > maxLength) {
      alert(`Message limit is ${maxLength} characters`);
      return;
    }

    setContent(value);
  };

  const handleSend = (exampleQuestion?: string) => {
    if (messageIsStreaming) {
      return;
    }

    if (exampleQuestion) {
      onSend({ role: 'user', content: exampleQuestion });
      posthog.capture('chatweb3 message sent', { message: exampleQuestion });
      setContent('');
    } else {
      if (!content) {
        alert('Please enter a message');
        return;
      }
      onSend({ role: 'user', content });
      posthog.capture('chatweb3 message sent', { message: content });

      setContent('');
    }

    if (window.innerWidth < 640 && textareaRef && textareaRef.current) {
      textareaRef.current.blur();
    }
  };

  const isMobile = () => {
    const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
    return mobileRegex.test(userAgent);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isTyping) {
      if (e.key === 'Enter' && !e.shiftKey && !isMobile()) {
        e.preventDefault();
        handleSend();
      }
    }
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
      textareaRef.current.style.overflow = `${textareaRef?.current?.scrollHeight > 400 ? 'auto' : 'hidden'}`;
    }
  }, [content]);

  function handleStopConversation() {
    stopConversationRef.current = true;
    setTimeout(() => {
      stopConversationRef.current = false;
    }, 1000);
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '0',
        borderTop: 'transparent',
        paddingTop: '1.5rem',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0.75rem',
          marginTop: '1rem',
          marginBottom: '0.5rem',
          marginLeft: '1rem',
          marginRight: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div style={{ width: '100%', maxWidth: '860px' }}>
          {!hideOnLargeScreens && (
            <div>
              <div className="pb-2" style={{ textAlign: 'left' }}>
                <ButtonGroup variant="outline" size="sm" spacing="2">
                  <Button
                    onClick={() => {
                      handleSend(
                        showChatWeb3
                          ? 'Why does this transaction need approvals?'
                          : currentUrl && chatWeb3QuestionsRefactored[currentUrl]
                            ? chatWeb3QuestionsRefactored[currentUrl][0].reformatted
                            : "What's a NFT?"
                      );
                    }}
                  >
                    {showChatWeb3
                      ? 'What are approvals?'
                      : currentUrl && chatWeb3QuestionsRefactored[currentUrl]
                        ? chatWeb3QuestionsRefactored[currentUrl][0].original
                        : "What's a NFT?"}
                  </Button>
                  <Button
                    onClick={() => {
                      handleSend(
                        showChatWeb3
                          ? 'What risk metrics are associated with this transaction?'
                          : currentUrl && chatWeb3QuestionsRefactored[currentUrl]
                            ? chatWeb3QuestionsRefactored[currentUrl][1].reformatted
                            : "What's a DApp?"
                      );
                    }}
                  >
                    {showChatWeb3
                      ? 'Explain this transaction'
                      : currentUrl && chatWeb3QuestionsRefactored[currentUrl]
                        ? chatWeb3QuestionsRefactored[currentUrl][1].original
                        : "What's a DApp?"}
                  </Button>
                </ButtonGroup>
              </div>
              <div className="pb-2" style={{ textAlign: 'left' }}>
                <ButtonGroup variant="outline" size="sm" spacing="2">
                  <Button
                    onClick={() => {
                      handleSend(
                        currentUrl && chatWeb3QuestionsRefactored[currentUrl]
                          ? chatWeb3QuestionsRefactored[currentUrl][2].reformatted
                          : 'Define smart contracts?'
                      );
                    }}
                  >
                    {currentUrl && chatWeb3QuestionsRefactored[currentUrl]
                      ? chatWeb3QuestionsRefactored[currentUrl][2].original
                      : 'Define smart contracts?'}
                  </Button>
                  <Button
                    onClick={() => {
                      handleSend(
                        currentUrl && chatWeb3QuestionsRefactored[currentUrl]
                          ? chatWeb3QuestionsRefactored[currentUrl][3].reformatted
                          : "What's gas fees?"
                      );
                    }}
                  >
                    {currentUrl && chatWeb3QuestionsRefactored[currentUrl]
                      ? chatWeb3QuestionsRefactored[currentUrl][3].original
                      : "What's gas fees?"}
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          )}

          <div
            style={{
              position: 'relative',

              display: 'flex',
              flexGrow: 1,
              flexDirection: 'column',
              borderRadius: '0.375rem',
              border: '1px solid #121212',
              background: '#202123',
              color: 'white',
              boxShadow: '0 0 15px rgba(0,0,0,0.10)',
            }}
          >
            <textarea
              ref={textareaRef}
              style={{
                margin: '0',
                width: '100%',
                resize: 'none',
                fontSize: '1rem',
                border: '0',
                background: 'transparent',
                padding: '0',
                paddingTop: '0.75rem',
                outline: 'none', // added this line

                paddingBottom: '0.75rem',
                paddingLeft: '1rem',
                paddingRight: '2rem',
                color: 'white',
                bottom: `${textareaRef?.current?.scrollHeight}px`,
                maxHeight: '25rem',
                overflow: `${textareaRef.current && textareaRef.current.scrollHeight > 400 ? 'auto' : 'hidden'}`,
              }}
              placeholder={'Type a message...' || ''}
              value={content}
              rows={1}
              onCompositionStart={() => setIsTyping(true)}
              onCompositionEnd={() => setIsTyping(false)}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <button
              style={{
                position: 'absolute',
                right: '0.5rem',
                top: '0.5rem',
                borderRadius: '0.25rem',
                padding: '0.25rem',
                color: 'white',
                background: 'transparent',
                border: 'transparent',
              }}
              onClick={() => handleSend()}
            >
              {messageIsStreaming ? <Spinner color="gray.500" size="md" /> : <IconSend size={18} />}
            </button>
          </div>
        </div>
      </div>
      {hideOnLargeScreens ? (
        <div
          style={{
            paddingLeft: '0.75rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.75rem',
            textAlign: 'center',
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          <a
            href="https://walletguard.app"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'underline', color: 'white' }}
          >
            ChatWeb3
          </a>
          . Making web3 accessible to everyone with an AI-powered chatbot meant to help you navigate the web3 ecosystem.
        </div>
      ) : (
        <div
          style={{
            paddingTop: '0.2rem',
            paddingBottom: '0.75rem',
            textAlign: 'center',
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          Powered by <span style={{ fontWeight: 'bold' }}>Wallet Guard</span>
        </div>
      )}
    </div>
  );
};
