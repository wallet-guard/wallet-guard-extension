import { Conversation } from '../../../../../../models/chatweb3/chatweb3';
import { FC, useEffect, useRef, useState } from 'react';
import React from 'react';
import '../../styles/chatweb3.css';

interface Props {
  conversation: Conversation;
  onChangePrompt: (prompt: string) => void;
}

export const SystemPrompt: FC<Props> = ({ conversation, onChangePrompt }) => {
  const [value, setValue] = useState<string>('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const maxLength = 4000;

    if (value.length > maxLength) {
      alert(`Prompt limit is ${maxLength} characters`);
      return;
    }

    setValue(value);

    if (value.length > 0) {
      onChangePrompt(value);
    }
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="flex flex-col">
      <label className="text-left dark:text-neutral-400 text-neutral-700 mb-2">System Prompt</label>
      <textarea
        ref={textareaRef}
        className="w-full rounded-lg px-4 py-2 focus:outline-none dark:bg-[#40414F] dark:border-opacity-50 dark:border-neutral-800 dark:text-neutral-100 border border-neutral-500 shadow text-neutral-900"
        style={{
          resize: 'none',
          bottom: `${textareaRef?.current?.scrollHeight}px`,
          maxHeight: '300px',
          overflow: `${textareaRef.current && textareaRef.current.scrollHeight > 400 ? 'auto' : 'hidden'}`,
        }}
        placeholder="Enter a prompt"
        value={value}
        rows={1}
        onChange={handleChange}
      />
    </div>
  );
};
