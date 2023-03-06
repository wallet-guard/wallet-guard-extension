import React, { useState, useRef, useEffect } from 'react';
import styles from './chatweb3.module.css';
import ReactMarkdown from 'react-markdown';
import { v4 as uuidv4 } from 'uuid';

export const Chatweb3Tab = () => {
  const [userInput, setUserInput] = useState('');
  const [history, setHistory] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [conversationID] = useState(uuidv4());
  const [messages, setMessages] = useState([
    {
      content: 'Hi there! How can I help?',
      role: 'assistant',
    },
  ]);

  const messageListRef = useRef<any>(null);
  const textAreaRef = useRef<any>(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    const messageList = messageListRef.current;
    messageList.scrollTop = messageList.scrollHeight;
  }, [messages]);

  // Focus on text field on load
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

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

    console.log(history, 'history');

    console.log({ content: userInput, role: 'user' }, 'userInput');

    // Send user question and history to API
    const response = await fetch('http://127.0.0.1:8080/chatweb3/completion', {
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
    console.log(response, 'response');
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
      setHistory([messages[messages.length - 2], messages[messages.length - 1]]);
    }
  }, [messages]);

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.cloud}>
          <div ref={messageListRef} className={styles.messagelist}>
            {messages.map((message, index) => {
              return (
                // The latest message sent by the user will be animated while waiting for a response
                <div
                  key={index}
                  className={
                    message.role === 'user' && loading && index === messages.length - 1
                      ? styles.usermessagewaiting
                      : message.role === 'assistant'
                      ? styles.apimessage
                      : styles.usermessage
                  }
                >
                  {/* Display the correct icon depending on the message type */}
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
                        src="/images/wallets/phantom.png"
                        alt="Me"
                        width="30"
                        height="30"
                        className={styles.usericon}
                      />
                    )}
                  </div>

                  <div className={styles.markdownanswer}>
                    {/* Messages are being rendered in Markdown format */}
                    <ReactMarkdown linkTarget={'_blank'}>{message.content}</ReactMarkdown>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.cloudform}>
            <form onSubmit={handleSubmit}>
              <textarea
                disabled={loading}
                onKeyDown={handleEnter}
                ref={textAreaRef}
                autoFocus={false}
                rows={1}
                maxLength={512}
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
        </div>
      </main>
    </div>
  );
};
