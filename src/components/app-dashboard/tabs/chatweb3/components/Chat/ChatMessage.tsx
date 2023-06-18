import { Message } from '../../../../../../models/chatweb3/chatweb3';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from '../Markdown/CodeBlock';
import React from 'react';
import '../../styles/globals.css';
import { MemoizedReactMarkdown } from '../Markdown/MemoizedReactMarkdown';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import { IconCheck, IconCopy, IconEdit, IconRobot, IconUser, IconDots } from '@tabler/icons-react';

interface Props {
  message: Message;
  lightMode: 'light' | 'dark';
}

export const ChatMessage: FC<Props> = ({ message, lightMode }) => {
  return (
    <div
      style={{
        color: '#F7FAFC',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        backgroundColor: message.role === 'assistant' ? '#151515' : '#282828',
        overflowWrap: 'anywhere',
      }}
    >
      <div
        style={{
          fontSize: '1rem',
          gap: '1rem',
          maxWidth: '56rem',
          padding: '2rem',
          margin: 'auto',
          display: 'flex',
        }}
      >
        <div
          style={{
            fontWeight: 'bold',
            minWidth: '40px',
          }}
        >
          {message.role === 'assistant' ? <IconRobot size={30} /> : <IconUser size={30} />}
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
                    <table
                      style={{
                        borderCollapse: 'collapse',
                        border: '1px solid black',
                        padding: '1rem',
                      }}
                    >
                      {children}
                    </table>
                  );
                },
                th({ children }) {
                  return (
                    <th
                      style={{
                        wordBreak: 'break-word',
                        border: '1px solid black',
                        backgroundColor: '#4A5568',
                        padding: '1rem',
                        color: '#F7FAFC',
                      }}
                    >
                      {children}
                    </th>
                  );
                },
                td({ children }) {
                  return (
                    <td
                      style={{
                        wordBreak: 'break-word',
                        border: '1px solid black',
                        padding: '1rem',
                      }}
                    >
                      {children}
                    </td>
                  );
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
