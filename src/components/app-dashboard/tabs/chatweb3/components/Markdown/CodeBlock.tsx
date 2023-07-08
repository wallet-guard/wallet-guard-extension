import { FC, memo, useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { IconCheck, IconClipboard } from '@tabler/icons-react';
import React from 'react';
import { useClipboard } from '@chakra-ui/react';

import '../../styles/chatweb3.css';

interface Props {
  language: string;
  code: string;
}

export const CodeBlock: FC<Props> = memo(({ language, code }) => {
  const { onCopy, value, setValue, hasCopied } = useClipboard(code);

  return (
    <div style={{ position: 'relative', fontFamily: 'sans-serif', fontSize: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px' }}>
        <span style={{ fontSize: '12px', textTransform: 'lowercase', color: 'white' }}>{language}</span>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              borderRadius: '4px',
              backgroundColor: 'transparent',
              padding: '8px',
              fontSize: '12px',
              color: 'white',
            }}
            onClick={onCopy}
          >
            {hasCopied ? <IconCheck size={18} /> : <IconClipboard size={18} />}
            {hasCopied ? 'Copied!' : 'Copy code'}
          </button>
        </div>
      </div>

      <SyntaxHighlighter language={language} style={oneDark} customStyle={{ margin: 0 }}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
});
