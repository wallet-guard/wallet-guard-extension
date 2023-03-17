import React from 'react';
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

const ChatWeb3DetailsColumn = (props: ChatWeb3DetailsColumnProps) => {
  return (
    <div
      style={{
        maxWidth: '225px',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div className={styles.flexCenter}>{props.image}</div>
      <p style={{ fontSize: '1.2rem', marginTop: '5px' }}>{props.title}</p>
      {props.children}
    </div>
  );
};

export const ChatWeb3Details = () => {
  const ChatWeb3DetailTextBox = (props: ChatWeb3DetailTextBoxProps) => {
    return <div className={`${styles.details} ${styles.flexCenter}`}>{props.children}</div>;
  };
  return (
    <div
      className={styles.flexCenter}
      style={{
        marginTop: '60px',
        gap: '30px',
      }}
    >
      <ChatWeb3DetailsColumn title="Use Cases" image={sun}>
        <ChatWeb3DetailTextBox>Get answers to any web3 related question</ChatWeb3DetailTextBox>
        <ChatWeb3DetailTextBox>Here to help protect you from scams</ChatWeb3DetailTextBox>
        <ChatWeb3DetailTextBox>Translate difficult web3 concepts into plain English</ChatWeb3DetailTextBox>
      </ChatWeb3DetailsColumn>
      <ChatWeb3DetailsColumn title="Capabilities" image={thunder}>
        <ChatWeb3DetailTextBox>Knowledge & Guidance</ChatWeb3DetailTextBox>
        <ChatWeb3DetailTextBox>Security first approach</ChatWeb3DetailTextBox>
        <ChatWeb3DetailTextBox>Blockchain & transaction analytics</ChatWeb3DetailTextBox>
      </ChatWeb3DetailsColumn>
      <ChatWeb3DetailsColumn title="Limitations" image={alert}>
        <ChatWeb3DetailTextBox>May occasionally generate incorrect information</ChatWeb3DetailTextBox>
        <ChatWeb3DetailTextBox>May occasionally produce biased content</ChatWeb3DetailTextBox>
        <ChatWeb3DetailTextBox>Limited knowledge while in beta version</ChatWeb3DetailTextBox>
      </ChatWeb3DetailsColumn>
    </div>
  );
};
