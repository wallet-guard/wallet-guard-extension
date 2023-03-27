import { IconPlayerStop, IconSend } from '@tabler/icons-react';
import { FC, KeyboardEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import React from 'react';
import { Message, OpenAIModel, OpenAIModelID } from '../../types';
import '../../styles/globals.css';

interface Props {
  messageIsStreaming: boolean;
  onSend: (message: Message) => void;
  model: OpenAIModel;
  stopConversationRef: MutableRefObject<boolean>;
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
}

export const ChatInput: FC<Props> = ({ onSend, messageIsStreaming, model, stopConversationRef, textareaRef }) => {
  const [content, setContent] = useState<string>();
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const maxLength = model.id === OpenAIModelID.GPT_3_5 ? 12000 : 24000;

    if (value.length > maxLength) {
      alert(`Message limit is ${maxLength} characters`);
      return;
    }

    setContent(value);
  };

  const handleSend = () => {
    if (messageIsStreaming) {
      return;
    }

    if (!content) {
      alert('Please enter a message');
      return;
    }

    onSend({ role: 'user', content });
    setContent('');

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
    <div className="absolute bottom-0 left-0 w-full dark:border-white/20 border-transparent dark:bg-[##161616] dark:bg-gradient-to-t from-[#161616] via-[#161616] to-[#161616]/0 dark:!bg-transparent dark:bg-vert-dark-gradient pt-6 md:pt-2">
      <div className="stretch md:mt-[52px] mt-4 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-3xl">
        {messageIsStreaming && (
          <button
            className="absolute -top-2 md:top-0 left-0 right-0 mx-auto dark:bg-[#161616] border w-fit border-gray-500 py-2 px-4 rounded text-black dark:text-white hover:opacity-50 md:mt-[-1%] lg:mt-[-2%]"
            onClick={handleStopConversation}
          >
            <IconPlayerStop size={16} className="inline-block mb-[2px]" /> Stop Generating
          </button>
        )}
        <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-gray-[#373B3E] dark:text-white dark:bg-[#000000] rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] mx-3 md:mx-0">
          <textarea
            ref={textareaRef}
            className="text-black dark:text-white m-0 w-full resize-none outline-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0 p-1"
            style={{
              resize: 'none',
              bottom: `${textareaRef?.current?.scrollHeight}px`,
              maxHeight: '400px',
              overflow: `${textareaRef.current && textareaRef.current.scrollHeight > 400 ? 'auto' : 'hidden'}`,
            }}
            placeholder="Type a message..."
            value={content}
            rows={1}
            onCompositionStart={() => setIsTyping(true)}
            onCompositionEnd={() => setIsTyping(false)}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <button
            className="absolute right-5 focus:outline-none text-neutral-800 hover:text-neutral-900 dark:text-neutral-100 dark:hover:text-neutral-200 dark:bg-opacity-50 hover:bg-neutral-200 p-2 rounded-sm"
            onClick={handleSend}
          >
            <IconSend size={16} className="opacity-60" />
          </button>
        </div>
      </div>
      <div className="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
        <a href="https://www.walletguard.app/chatweb3" target="_blank" rel="noreferrer" className="underline">
          ChatWeb3
        </a>
        . Our goal is to make web3, blockchain, and security more natural and safe to interact with. Your feedback will
        help us improve.
      </div>
    </div>
  );
};
