import { Message } from '../../types';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from '../Markdown/CodeBlock';
import React from 'react';
import '../../styles/globals.css';
import styles from '../../../../chatweb3/chatweb3Styles.module.css';
import { MemoizedReactMarkdown } from '../Markdown/MemoizedReactMarkdown';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';

interface Props {
  message: Message;
  lightMode: 'light' | 'dark';
}

export const ChatMessage: FC<Props> = ({ message, lightMode }) => {
  return (
    <div
      className={`group ${
        message.role === 'assistant'
          ? 'text-gray-100 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 bg-gray-50 dark:bg-[#151515]'
          : 'text-gray-100 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 dark:bg-[#232323]'
      }`}
      style={{ overflowWrap: 'anywhere' }}
    >
      <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto">
        <div className="font-bold min-w-[40px]">
          {message.role === 'assistant' ? (
            <img
              src="/images/wg_logos/Logo-Large-Transparent.png"
              alt="Me"
              width="30"
              height="30"
              className={styles.usericon}
              style={{ maxWidth: '30px', height: '30px' }}
            />
          ) : (
            <img src="/images/wallets/metamask.png" alt="AI" width="30" height="30" className={styles.boticon} />
          )}
        </div>

        <div className="prose dark:prose-invert mt-[-2px]">
          {message.role === 'user' ? (
            <div className="prose dark:prose-invert whitespace-pre-wrap">{message.content}</div>
          ) : (
            <MemoizedReactMarkdown
              className="prose dark:prose-invert"
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeMathjax]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');

                  return !inline && match ? (
                    <CodeBlock
                      key={Math.random()}
                      language={match[1]}
                      value={String(children).replace(/\n$/, '')}
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                table({ children }) {
                  return (
                    <table className="border-collapse border border-black py-1 px-3 dark:border-white">
                      {children}
                    </table>
                  );
                },
                th({ children }) {
                  return (
                    <th className="break-words border border-black bg-gray-500 py-1 px-3 text-white dark:border-white">
                      {children}
                    </th>
                  );
                },
                td({ children }) {
                  return <td className="break-words border border-black py-1 px-3 dark:border-white">{children}</td>;
                },
              }}
            >
              {message.content}
            </MemoizedReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};
