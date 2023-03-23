import { FC, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import React = require('react');
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface Props {
  language: string;
  value: string;
  lightMode: 'light' | 'dark';
}

export const CodeBlock: FC<Props> = ({ language, value, lightMode }) => {
  return (
    <div className="relative text-[16px] pt-2">
      <SyntaxHighlighter language={language} style={lightMode === 'light' ? oneLight : oneDark}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
};
