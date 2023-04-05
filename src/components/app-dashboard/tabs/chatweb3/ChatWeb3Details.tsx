import React, { ChangeEvent, useState } from 'react';
import styles from './chatweb3Styles.module.css';
import { sun, thunder, alert } from './icons';

interface ChatWeb3DetailTextBoxProps {
  children: string;
}

interface ChatWeb3DetailsColumnProps {
  title: string;
  image: JSX.Element;
  children: React.ReactNode;
}

const ChatWeb3DetailsColumn = ({ title, image, children }: ChatWeb3DetailsColumnProps) => (
  <div>
    <div className={`flex sm:flex-col items-center ${styles.flexCenter}`}>
      {image}
      <p className="ml-2 sm:ml-0 sm:mt-5 flex-grow" style={{ fontSize: '1.2rem' }}>
        {title}
      </p>
    </div>
    {children}
  </div>
);

const ChatWeb3DetailTextBox = (props: ChatWeb3DetailTextBoxProps) => {
  return (
    <div className="bg-[#222222] rounded-xl p-3 mt-2 text-base leading-[18px] md:min-h-[71px] min-w-[235px] flex items-center">
      {props.children}
    </div>
  );
};

export const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Default (GPT-3.5)');

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownSelect = (model: any) => {
    setSelectedModel(model);
    setIsDropdownOpen(false);
  };

  return (
    <div
      className="bg-[#232323] h-16 flex items-center justify-between px-4"
      style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)' }}
    >
      <div className="flex items-center flex-1">
        <img className="h-8 w-auto" src="/images/wg_logos/Logo-Large-Transparent.png" alt="Logo" />
        <h1 className="text-white font-large text-lg ml-2">
          <b>ChatWeb3</b>
        </h1>
      </div>
      <div className="flex items-center">
        {/* dropdown button */}
        <div className="relative">
          <button
            className="flex items-center text-white text-sm font-medium hover:text-white focus:outline-none"
            onClick={handleDropdownToggle}
          >
            <span className="text-[#737373]">
              Model: <span className="text-white">{selectedModel}</span>
            </span>
            <svg className="ml-1 h-5 w-5 text-white" viewBox="0 0 24 24" aria-hidden="true">
              {/* Define a path element for the caret */}
              <path fill="none" stroke="currentColor" strokeWidth="2" d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {/* dropdown menu */}
          {/* dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#4F4F4F] ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button
                  className={`block w-full text-left px-4 py-2 text-sm relative ${
                    selectedModel === 'Default (GPT-3.5)' ? 'text-[#19FF00]' : 'text-white'
                  }`}
                  onClick={() => handleDropdownSelect('Default (GPT-3.5)')}
                  role="menuitem"
                  style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}
                >
                  {selectedModel === 'Default (GPT-3.5)' && (
                    <span className="absolute right-4 text-[#19FF00] text-sm">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M15.293 5.293a1 1 0 0 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.414L8 11.586l6.293-6.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                  Default (GPT-3.5)
                </button>
                <div style={{ borderBottom: '1px solid #4F4F4F' }} />

                <button
                  className={`block w-full text-left px-4 py-2 text-sm relative ${
                    selectedModel === 'GPT-4' ? 'text-green-500' : 'text-white'
                  }`}
                  onClick={() => handleDropdownSelect('GPT-4')}
                  role="menuitem"
                  disabled
                >
                  <div className="flex justify-between">
                    <span>GPT-4</span>
                    <span className="absolute right-4 text-gray-400 text-sm">Coming soon</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ChatWeb3Details = () => {
  return (
    <div>
      <div className={`${styles.flexCenter} mt-4 grid grid-cols-1 gap-8 sm:grid-cols-3`}>
        <div className="flex flex-col sm:flex-row justify-between md:gap-2">
          <div className="mb-4 sm:mb-0 sm:w-1/3">
            <ChatWeb3DetailsColumn title="Use Cases" image={sun}>
              <ChatWeb3DetailTextBox>Get answers to any web3 related question</ChatWeb3DetailTextBox>
              <ChatWeb3DetailTextBox>Here to help protect you from scams</ChatWeb3DetailTextBox>
              <ChatWeb3DetailTextBox>Translate difficult web3 concepts into plain English</ChatWeb3DetailTextBox>
            </ChatWeb3DetailsColumn>
          </div>

          <div className="mb-4 sm:mb-0 sm:w-1/3">
            <ChatWeb3DetailsColumn title="Capabilities" image={thunder}>
              <ChatWeb3DetailTextBox>Knowledge & Guidance</ChatWeb3DetailTextBox>
              <ChatWeb3DetailTextBox>Security first approach</ChatWeb3DetailTextBox>
              <ChatWeb3DetailTextBox>Blockchain & transaction analytics</ChatWeb3DetailTextBox>
            </ChatWeb3DetailsColumn>
          </div>

          <div className="sm:w-1/3">
            <ChatWeb3DetailsColumn title="Limitations" image={alert}>
              <ChatWeb3DetailTextBox>May occasionally generate incorrect information</ChatWeb3DetailTextBox>
              <ChatWeb3DetailTextBox>May occasionally produce biased content</ChatWeb3DetailTextBox>
              <ChatWeb3DetailTextBox>Limited knowledge while in beta version</ChatWeb3DetailTextBox>
            </ChatWeb3DetailsColumn>
          </div>
        </div>
      </div>
    </div>
  );
};
