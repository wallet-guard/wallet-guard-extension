import React, { ChangeEvent, useState } from 'react';
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
    <div
      className={`flex sm:flex-col items-center `}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
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

export const ChatWeb3Landing = () => {
  return (
    <div>
      <div
        className={`mt-4 grid grid-cols-1 gap-8 sm:grid-cols-3`}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
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
