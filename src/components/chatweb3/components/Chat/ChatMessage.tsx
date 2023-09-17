import { Message } from '../../../../models/chatweb3/chatweb3';
import { FC } from 'react';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from '../Markdown/CodeBlock';
import React from 'react';
import '../../styles/chatweb3.css';
import { MemoizedReactMarkdown } from '../Markdown/MemoizedReactMarkdown';
import remarkMath from 'remark-math';
import { IconRobot, IconUser } from '@tabler/icons-react';

interface Props {
  message: Message;
  index: number;
  source: 'simulation' | 'hotkey';
}

export const ChatMessage: FC<Props> = ({ message, index, source }) => {
  return (
    <div
      style={{
        marginTop: index === 0 ? source === 'simulation' ? '118px' : '64px' : '',
        color: '#F7FAFC',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        backgroundColor: message.role === 'assistant' ? '#0b0b0b' : '#282828',
        overflowWrap: 'break-word',
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

        <div className="prose dark:prose-invert mt-[-2px]" style={{ maxWidth: '75vw' }}>
          {message.role === 'user' ? (
            <div className="prose dark:prose-invert" style={{ whiteSpace: 'pre-wrap' }}>
              {message.content}
            </div>
          ) : (
            <MemoizedReactMarkdown
              className="prose dark:prose-invert"
              remarkPlugins={[remarkGfm, remarkMath]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');

                  return !inline && match ? (
                    <CodeBlock
                      key={Math.random()}
                      language={match[1]}
                      code={String(children).replace(/\n$/, '')}
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
              {message && message.content}
            </MemoizedReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};
