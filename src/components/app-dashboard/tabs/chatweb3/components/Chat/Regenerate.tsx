import { IconRefresh } from '@tabler/icons-react';
import { FC } from 'react';
import React from 'react';
import '../../styles/chatweb3.css';

interface Props {
  onRegenerate: () => void;
}

export const Regenerate: FC<Props> = ({ onRegenerate }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1rem',
        width: '100%',
        padding: '0.5rem',
        left: 0,
        right: 0,
        margin: 'auto',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '1rem',
          color: '#f56565',
        }}
      >
        Sorry, there was an error.
      </div>
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '3rem',
          backgroundColor: '#f7fafc',
          color: '#a0aec0',
          fontSize: '0.875rem',
          fontWeight: 500,
          borderRadius: '0.375rem',
          border: '1px solid #d2d6dc',
        }}
        onClick={onRegenerate}
      >
        <IconRefresh style={{ marginRight: '0.5rem' }} />
        <div>Regenerate response</div>
      </button>
    </div>
  );
};
