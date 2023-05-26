import { IconRefresh } from '@tabler/icons-react';
import { FC } from 'react';
import React from 'react';
import '../../styles/globals.css';

interface Props {
  onRegenerate: () => void;
}

// export const Regenerate: FC<Props> = ({ onRegenerate }) => {
//   return (
//     <div className="fixed sm:absolute bottom-4 sm:bottom-8 w-full sm:w-1/2 px-2 left-0 sm:left-[280px] lg:left-[200px] right-0 ml-auto mr-auto">
//       <div className="text-center mb-4 text-red-500">Sorry, there was an error.</div>
//       <button
//         className="flex items-center justify-center w-full h-12 bg-neutral-100 dark:bg-[#444654] text-neutral-500 dark:text-neutral-200 text-sm font-semibold rounded-lg border border-b-neutral-300 dark:border-none"
//         onClick={onRegenerate}
//       >
//         <IconRefresh className="mr-2" />
//         <div>Regenerate response</div>
//       </button>
//     </div>
//   );
// };

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
