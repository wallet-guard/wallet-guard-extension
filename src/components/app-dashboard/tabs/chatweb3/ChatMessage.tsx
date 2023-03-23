import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import React = require('react');
import { CodeBlock } from './CodeBlock';

interface Props {
  message: any;
  lightMode: 'light' | 'dark';
}

export const ChatMessage: FC<Props> = ({ message, lightMode }) => {
  return (
    <div
      className={`group ${
        message.role === 'assistant'
          ? 'text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 bg-gray-50 dark:bg-[#444654]'
          : 'text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 bg-white dark:bg-[#343541]'
      }`}
      style={{ overflowWrap: 'anywhere' }}
    >
      <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto">
        <div className="prose dark:prose-invert mt-[-2px]">
          {message.role === 'user' ? (
            <div className="prose dark:prose-invert whitespace-pre-wrap">{message.content}</div>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <CodeBlock
                      key={Math.random()}
                      language={match[1]}
                      value={String(children).replace(/\n$/, '')}
                      lightMode={lightMode}
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
                    <table className="border-collapse border border-black dark:border-white py-1 px-3">
                      {children}
                    </table>
                  );
                },
                th({ children }) {
                  return (
                    <th className="border border-black dark:border-white break-words py-1 px-3 bg-gray-500 text-white">
                      {children}
                    </th>
                  );
                },
                td({ children }) {
                  return <td className="border border-black dark:border-white break-words py-1 px-3">{children}</td>;
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};
