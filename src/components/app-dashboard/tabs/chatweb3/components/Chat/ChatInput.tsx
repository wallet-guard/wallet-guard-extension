import { IconPlayerStop, IconSend } from '@tabler/icons-react';
import { FC, KeyboardEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import React from 'react';
import { Message, OpenAIModel, OpenAIModelID } from '../../../../../../models/chatweb3/chatweb3';
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
    <div className="absolute bottom-0 left-0 w-full border-transparent bg-gradient-to-b from-transparent via-white to-white pt-6 dark:border-white/20 dark:via-[#151515] dark:to-[#151515] md:pt-2 ">
      <div className="stretch md:mt-[52px] mt-4 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-3xl">
        {messageIsStreaming && (
          <button
            className="absolute top-2 md:top-0 left-0 right-0 mx-auto dark:bg-[#161616] border w-fit border-gray-500 py-2 px-4 rounded text-black dark:text-white hover:opacity-50 md:mt-[-1%] lg:mt-[-2%]"
            onClick={handleStopConversation}
          >
            <IconPlayerStop size={16} className="inline-block mb-[2px]" /> Stop Generating
          </button>
        )}
        <div className="relative mx-2 flex w-full flex-grow flex-col rounded-md border border-black/10  shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:border-gray-900/50 dark:bg-[#202123] dark:text-white dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] sm:mx-4">
          {/* {persona === PersonaType.DEFAULT ? (
            <div className="absolute left-2 top-2 rounded-sm p-1 text-neutral-800 opacity-60 hover:bg-neutral-200 hover:text-neutral-900 dark:bg-opacity-50 dark:text-neutral-100 dark:hover:text-neutral-200">
              <IconBolt size={20} />
            </div>  
          ) : (
            <img
              src={
                persona == PersonaType.LEARN_WEB3
                  ? 'web3.png'
                  : persona == PersonaType.WEB3_DEVELOPER
                  ? 'coding.png'
                  : persona == PersonaType.DEFI_TRADER
                  ? 'broker.png'
                  : persona == PersonaType.NFT_DEGEN
                  ? 'art.png'
                  : 'web3.png'
              }
              width={26}
              alt=""
              className="absolute left-2 top-2 rounded-sm p-1 text-neutral-800 opacity-60 hover:bg-neutral-200 hover:text-neutral-900 dark:bg-opacity-50 dark:text-neutral-100 dark:hover:text-neutral-200"
            />
          )} */}

          <textarea
            ref={textareaRef}
            className="m-0 w-full resize-none border-0 bg-transparent p-0 py-2 pr-8 text-black dark:bg-transparent dark:text-white py-3 focus:outline-none focus:border-none pl-4"
            style={{
              resize: 'none',
              bottom: `${textareaRef?.current?.scrollHeight}px`,
              maxHeight: '400px',
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
            className="absolute right-2 top-2 rounded-sm p-1 text-neutral-800 opacity-60 hover:bg-neutral-200 hover:text-neutral-900 dark:bg-opacity-50 dark:text-neutral-100 dark:hover:text-neutral-200"
            onClick={handleSend}
          >
            {messageIsStreaming ? (
              <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-neutral-800 opacity-60 dark:border-neutral-100"></div>
            ) : (
              <IconSend size={18} />
            )}
          </button>
        </div>
      </div>
      <div className="hidden lg:block px-3 pt-2 pb-3 text-center text-[12px] text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
        <a href="https://walletguard.app" target="_blank" rel="noreferrer" className="underline">
          ChatWeb3
        </a>
        .{' '}
        {'Making web3 accessible to everyone with an AI powered chatbot meant to help you navigate the web3 ecosystem.'}
      </div>
    </div>
  );
};
