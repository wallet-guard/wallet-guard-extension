// import {
//   Conversation,
//   KeyValuePair,
//   Message,
//   OpenAIModel,
//   PersonaType,
// } from '../../../../../../models/chatweb3/chatweb3';
// import { FC, MutableRefObject, useEffect, useRef, useState } from 'react';
// import { ChatInput } from './ChatInput';
// import { ChatLoader } from './ChatLoader';
// import { ChatMessage } from './ChatMessage';
// import { ModelSelect } from './ModelSelect';
// import { Regenerate } from './Regenerate';
// import { SystemPrompt } from './SystemPrompt';
// import React from 'react';
// import '../../styles/globals.css';
// import { ChatInputDashboard } from './ChatInputDashboard';
// import { Navbar } from './ChatWeb3Navbar';
// import { ChatWeb3Landing } from './ChatWeb3Landing';
// import PluginGrid from './PluginGrid';

// interface Props {
//   conversation: Conversation;
//   models: OpenAIModel[];
//   messageIsStreaming: boolean;
//   modelError: boolean;
//   messageError: boolean;
//   loading: boolean;
//   lightMode: 'light' | 'dark';
//   onSend: (message: Message, isResend: boolean) => void;
//   onUpdateConversation: (conversation: Conversation, data: KeyValuePair) => void;
//   stopConversationRef: MutableRefObject<boolean>;
// }

// export const Chat: FC<Props> = ({
//   conversation,
//   models,
//   messageIsStreaming,
//   modelError,
//   messageError,
//   loading,
//   lightMode,
//   onSend,
//   onUpdateConversation,
//   stopConversationRef,
// }) => {
//   const [currentMessage, setCurrentMessage] = useState<Message>();

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//     textareaRef.current?.focus();
//   }, [conversation.messages]);

//   return (
//     <div className="relative flex-1 overflow-none dark:bg-[#161616]">
//       <Navbar />

//       {conversation?.messages.length === 0 ? (
//         <>
//           <div className="mx-auto flex w-[350px] flex-col space-y-10 pt-12 lg:w-[600px] xl:w-[1200px]">
//             <div className="text-center text-3xl font-semibold text-gray-800 dark:text-gray-100 sm:text-2xl md:text-3xl sm:pt-0 md:pt-[5%]">
//               <div>Who are you?</div>
//             </div>

//             <div>
//               <PluginGrid
//                 onSend={(plugin: any) => {
//                   // create a generic Message

//                   let messagesTest: Message;

//                   if (plugin == PersonaType.LEARN_WEB3) {
//                     messagesTest = {
//                       role: 'assistant',
//                       content:
//                         '# Learn Web3 Plugin \n  The Learn Web3 plugin is designed to provide users with an accessible and comprehensive introduction to the world of web3. With this plugin, users can learn about the basics of decentralized technologies, blockchain, and cryptocurrencies, while receiving support to navigate the ever-evolving Web3 ecosystem. ' +
//                         '\n### Example questions: \n* How is having my money in MetaMask make me my own bank? \n*  Can you explain how zero-knowledge proofs can be used to enhance privacy and security in web3 applications? \n* Can you explain what a smart contract is and how it works in the context of blockchain technology?',
//                     };
//                   } else if (plugin == PersonaType.WEB3_DEVELOPER) {
//                     messagesTest = {
//                       role: 'assistant',
//                       content:
//                         '# Web3 Developer Plugin \n The Web3 Developer plugin is a comprehensive resource for developers seeking to build powerful Web3 applications. With access to Solidity documentation, Alchemy, and Etherscan tools, users can streamline their development process and create innovative decentralized applications. ' +
//                         ' \n### Example questions: \n* Create a decentralized voting system using a smart contract. The system should allow users to create proposals, vote on them, and tally the votes. Ensure the voting process is transparent, tamper-proof, and resistant to double-voting.\n* What are the main advantages of using Alchemy as a development platform for Web3 applications? \n* How can I use Etherscan to track transactions and explore the Ethereum blockchain?',
//                     };
//                   } else if (plugin == PersonaType.NFT_DEGEN) {
//                     messagesTest = {
//                       role: 'assistant',
//                       content:
//                         '# NFT Degen Plugin \n The NFT Degen plugin offers users a seamless way to discover contextualized insights and answers to their favorite NFT questions. Leveraging the power of GPT, this plugin provides expert guidance on navigating the NFT market, collecting, trading, and staying informed on the latest trends. ' +
//                         ' \n### Example questions: \n* What factors should I consider when evaluating the value of an NFT?\n*How can I safely buy, sell, and trade NFTs in the marketplace? \n* What are some of the most popular NFT platforms for artists and collectors?',
//                     };
//                   } else if (plugin == PersonaType.DEFI_TRADER) {
//                     messagesTest = {
//                       role: 'assistant',
//                       content:
//                         '# DeFi Trader Plugin \n The DeFi Trader plugin is a powerful tool for users looking to make informed decisions in the decentralized finance (DeFi) market. With real-time updates on high-yield savings, lending opportunities, and DeFi trends, users can maximize their investments and stay ahead of the curve. ' +
//                         ' \n### Example questions: \n* How does the concept of liquidity pools and automated market makers (AMMs) work to enable seamless token swaps in DeFi?\n* How can I manage risks when investing in DeFi projects? \n* What are some popular DeFi strategies for earning passive income?',
//                     };
//                   } else {
//                     return;
//                   }
//                   setCurrentMessage(messagesTest);
//                   const updatedConversation = {
//                     ...conversation,
//                     messages: [...conversation.messages, messagesTest],
//                   };
//                 }}
//               />
//             </div>
//           </div>

//           <div className="h-[162px] dark:bg-[#151515]" ref={messagesEndRef} />
//         </>
//       ) : (
//         <>
//           {conversation?.messages.map((message, index) => (
//             <ChatMessage key={index} message={message} lightMode={'dark'} />
//           ))}

//           {loading && <ChatLoader />}

//           <div className="h-[162px] dark:bg-[#151515]" ref={messagesEndRef} />
//         </>
//       )}
//       <>
//         {messageError ? (
//           <Regenerate
//             onRegenerate={() => {
//               if (currentMessage) {
//                 onSend(currentMessage, true);
//               }
//             }}
//           />
//         ) : (
//           <ChatInput
//             stopConversationRef={stopConversationRef}
//             messageIsStreaming={messageIsStreaming}
//             textareaRef={textareaRef}
//             onSend={(message) => {
//               setCurrentMessage(message);
//               onSend(message, false);
//             }}
//             model={conversation.model}
//           />
//         )}
//       </>
//     </div>
//   );
// };

import {
  Conversation,
  KeyValuePair,
  Message,
  OpenAIModel,
  PersonaType,
} from '../../../../../../models/chatweb3/chatweb3';
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react';
import { ChatInput } from './ChatInput';
import { ChatLoader } from './ChatLoader';
import { ChatMessage } from './ChatMessage';
import { ModelSelect } from './ModelSelect';
import { Regenerate } from './Regenerate';
import { SystemPrompt } from './SystemPrompt';
import React from 'react';
import '../../styles/globals.css';
import { ChatInputDashboard } from './ChatInputDashboard';
import { Navbar } from './ChatWeb3Navbar';
import { ChatWeb3Landing } from './ChatWeb3Landing';
import PluginGrid from './PluginGrid';

interface Props {
  conversation: Conversation;
  models: OpenAIModel[];
  messageIsStreaming: boolean;
  modelError: boolean;
  messageError: boolean;
  loading: boolean;
  lightMode: 'light' | 'dark';
  onSend: (message: Message, isResend: boolean, storedSimulation?: any) => void;
  onUpdateConversation: (conversation: Conversation, data: KeyValuePair) => void;
  stopConversationRef: MutableRefObject<boolean>;
  showChatWeb3?: any;
  setShowChatWeb3?: any;
  fromSimulation?: boolean;
  storedSimulation?: any;
}

export const Chat: FC<Props> = ({
  conversation,
  models,
  messageIsStreaming,
  modelError,
  messageError,
  loading,
  lightMode,
  onSend,
  onUpdateConversation,
  stopConversationRef,
  showChatWeb3,
  setShowChatWeb3,
  fromSimulation,
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
        overflow: 'hidden',
        maxHeight: '100%',

        backgroundColor: lightMode === 'dark' ? '#161616' : 'initial',
      }}
    >
      <Navbar showChatWeb3={showChatWeb3} setShowChatWeb3={setShowChatWeb3} fromSimulation={fromSimulation} />

      {conversation?.messages.length === 0 ? (
        <>
          {hideOnLargeScreens && (
            <div
              style={{
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
                paddingTop: '48px',
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '1.875rem',
                  fontWeight: '600',
                  color: lightMode === 'dark' ? 'white' : '#404040',
                }}
              >
                <div>Choose your plugin</div>
              </div>

              <div>
                <PluginGrid
                  onSend={(plugin: any) => {
                    // setCurrentMessage({ role: 'user', content: 'plugin' });
                  }}
                />
              </div>
            </div>
          )}

          <div
            style={{ height: '162px', backgroundColor: lightMode === 'dark' ? '#151515' : 'initial' }}
            ref={messagesEndRef}
          />
        </>
      ) : (
        <>
          {conversation?.messages.map((message, index) => (
            <ChatMessage key={index} message={message} lightMode={'dark'} />
          ))}

          {loading && <ChatLoader />}

          <div
            style={{ height: '162px', backgroundColor: lightMode === 'dark' ? '#151515' : 'initial' }}
            ref={messagesEndRef}
          />
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
            onSend={(message) => {
              console.log('storedSimulation', storedSimulation);
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
