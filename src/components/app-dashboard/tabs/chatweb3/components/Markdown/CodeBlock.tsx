import { FC, memo, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { IconCheck, IconClipboard, IconDownload } from '@tabler/icons-react';
import { generateRandomString, programmingLanguages } from '../../../../../../lib/helpers/chatweb3/codeblock';
import React from 'react';
import '../../styles/globals.css';

interface Props {
  language: string;
  value: string;
}

export const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const [isCopied, setIsCopied] = useState<Boolean>(false);

  const copyToClipboard = () => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };
  const downloadAsFile = () => {
    const fileExtension = programmingLanguages[language] || '.file';
    const suggestedFileName = `file-${generateRandomString(3, true)}${fileExtension}`;
    const fileName = window.prompt('Enter file name' || '', suggestedFileName);

    if (!fileName) {
      // user pressed cancel on prompt
      return;
    }

    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
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
            onClick={copyToClipboard}
          >
            {isCopied ? <IconCheck size={18} /> : <IconClipboard size={18} />}
            {isCopied ? 'Copied!' : 'Copy code'}
          </button>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '4px',
              backgroundColor: 'transparent',
              padding: '8px',
              fontSize: '12px',
              color: 'white',
            }}
            onClick={downloadAsFile}
          >
            <IconDownload size={18} />
          </button>
        </div>
      </div>

      <SyntaxHighlighter language={language} style={oneDark} customStyle={{ margin: 0 }}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
});
CodeBlock.displayName = 'CodeBlock';
