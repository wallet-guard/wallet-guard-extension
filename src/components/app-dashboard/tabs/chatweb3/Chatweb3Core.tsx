import React, { useState, useRef, useEffect } from 'react';
import styles from './chatWeb3.module.css';
import ReactMarkdown from 'react-markdown';
import { v4 as uuidv4 } from 'uuid';
import AIWriter from 'react-aiwriter';
import { ChatWeb3Details } from './ChatWeb3Details';

// type to define the message object
type ChatWeb3Message = {
  content: string;
  role: string;
};

interface ChatWeb3CoreProps {
  message?: string;
}

const FADE_INTERVAL_MS = 1750;
const WORD_CHANGE_INTERVAL_MS = FADE_INTERVAL_MS * 2;
const WORDS_TO_ANIMATE = [
  '"How should I store my seed phrase as secure as possible?"',
  '"Explain to me what an NFT is as if I knew nothing"',
  '"What is the difference between a hardware wallet and a software wallet?"',
  '"Which wallets have a strong reputation in bullet points?"',
];

export const ChatWeb3Core = (props: ChatWeb3CoreProps) => {
  const [userInput, setUserInput] = useState('');
  const [history, setHistory] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [conversationID] = useState(uuidv4());
  const [messages, setMessages] = useState<ChatWeb3Message[]>([]);

  const [fadeProp, setFadeProp] = useState<any>({ fade: styles.fadeIn });
  const [wordOrder, setWordOrder] = useState(0);

  const messageListRef = useRef<any>(null);
  const textAreaRef = useRef<any>(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    const messageList = messageListRef.current;
    messageList.scrollTop = messageList.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const fadeTimeout = setInterval(() => {
      fadeProp.fade === styles.fadeIn ? setFadeProp({ fade: styles.fadeOut }) : setFadeProp({ fade: styles.fadeIn });
    }, FADE_INTERVAL_MS);

    return () => clearInterval(fadeTimeout);
  }, [fadeProp]);

  useEffect(() => {
    const wordTimeout = setInterval(() => {
      setWordOrder((prevWordOrder) => (prevWordOrder + 1) % WORDS_TO_ANIMATE.length);
    }, WORD_CHANGE_INTERVAL_MS);

    return () => clearInterval(wordTimeout);
  }, []);

  useEffect(() => {
    if (props.message) {
      setUserInput(props.message);
    }
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [props.message]);

  // Focus on text field on load
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [messages]);

  // Handle errors
  const handleError = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: 'Oops! There seems to be an error. Please try again.', role: 'assistant' },
    ]);
    setLoading(false);
    setUserInput('');
  };

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (userInput.trim() === '') {
      return;
    }

    setLoading(true);
    setMessages((prevMessages) => [...prevMessages, { content: userInput, role: 'user' }]);

    // Send user question and history to API
    const response = await fetch('https://zz2dqmtmwz.us-east-2.awsapprunner.com/chatweb3/completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversationID: conversationID,
        question: { content: userInput, role: 'user' },
        history: history,
      }),
    });
    if (!response.ok) {
      handleError();
      return;
    }

    // Reset user input
    setUserInput('');
    const data = await response.json();

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: data.chatCompletionMessage.role, content: data.chatCompletionMessage.content },
    ]);
    setLoading(false);
  };

  // Prevent blank submissions and allow for multiline input
  const handleEnter = (e: any) => {
    if (e.key === 'Enter' && userInput) {
      if (!e.shiftKey && userInput) {
        handleSubmit(e);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // Keep history in sync with messages
  useEffect(() => {
    if (messages.length >= 3) {
      setHistory([messages[messages.length - 3], messages[messages.length - 2], messages[messages.length - 1]]);
    } else if (messages.length >= 2) {
      setHistory([messages[messages.length - 2], messages[messages.length - 1]]);
    }
  }, [messages]);

  return (
    <>
      <main className={styles.main}>
        {messages.length !== 0 ? (
          <div className={styles.cloud}>
            <div ref={messageListRef} className={`${styles.messagelist}`}>
              {messages.map((message, index) => {
                return (
                  // The latest message sent by the user will be animated while waiting for a response
                  <div
                    key={index}
                    className={
                      message.role === 'user' && loading && index === messages.length - 1
                        ? `${styles.usermessagewaiting}`
                        : message.role === 'assistant'
                        ? `${styles.apimessage}`
                        : `${styles.usermessage}`
                    }
                  >
                    {/* Display the correct icon depending on the message type */}
                    <div
                      style={{
                        width: 'min(100%, 800px)',
                        margin: 'auto',
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <div className="pr-2">
                        {message.role === 'user' ? (
                          <img
                            src="/images/wallets/metamask.png"
                            alt="AI"
                            width="30"
                            height="30"
                            className={styles.boticon}
                          />
                        ) : (
                          <img
                            src="/images/wg_logos/Logo-Large-Transparent.png"
                            alt="Me"
                            width="30"
                            height="30"
                            className={styles.usericon}
                            style={{ maxWidth: '30px', height: '30px' }}
                          />
                        )}
                      </div>

                      <div className={`${styles.markdownanswer}`}>
                        {/* Messages are being rendered in Markdown format */}
                        {/* <AIWriter> */}
                        <ReactMarkdown linkTarget={'_blank'}>{message.content}</ReactMarkdown>
                        {/* </AIWriter> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className={`${styles.nocloud} container text-center`} ref={messageListRef}>
            <h1 style={{ fontWeight: 'bold', fontSize: '4rem' }}>Leverage the power of ChatWeb3</h1>

            <h5 style={{ fontWeight: 'bold', fontSize: '1.5rem' }} className="pt-1">
              Your personal web3 security companion to help with all things blockchain.
            </h5>

            <div className="pt-2" style={{ position: 'relative', fontSize: '1.2rem' }}>
              <span className={fadeProp.fade}>{WORDS_TO_ANIMATE[wordOrder]}</span>
            </div>

            <ChatWeb3Details />
          </div>
        )}
      </main>
      <div className="container">
        <div className={styles.center}>
          <div className={`${styles.cloudform}`}>
            <form onSubmit={handleSubmit}>
              <textarea
                disabled={loading}
                onKeyDown={handleEnter}
                ref={textAreaRef}
                autoFocus={false}
                rows={1}
                maxLength={4000}
                id="userInput"
                name="userInput"
                placeholder={loading ? 'Waiting for response...' : 'Type your question...'}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className={styles.textarea}
              />
              <button type="submit" disabled={loading} className={styles.generatebutton}>
                {/* {loading ? (
                  <div className={styles.loadingwheel}>
                    <CircularProgress color="inherit" size={20} />{' '}
                  </div>
                ) : (
                  // Send icon SVG in input field
                  <svg viewBox="0 0 20 20" className={styles.svgicon} xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                )} */}
              </button>
            </form>
          </div>
          <p className="pt-2 text-center" style={{ color: '#909196', fontSize: '14px' }}>
            ChatWeb3 Mar 13 Version. Our goal is to make web3, blockchain, and security more natural and safe to
            interact with. Your feedback will help us improve.
          </p>
        </div>
      </div>
    </>
  );
};
