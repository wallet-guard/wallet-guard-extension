import { FC } from 'react';
import React from 'react';
import styles from '../../styles/globals.css';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
import { IconCheck, IconCopy, IconEdit, IconRobot, IconUser, IconDots } from '@tabler/icons-react';

interface Props {}

export const ChatLoader: FC<Props> = () => {
  return (
    <div
      style={{
        color: '#F7FAFC',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        backgroundColor: '#151515',
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
          flexDirection: 'row',
        }}
      >
        <div
          style={{
            fontWeight: 'bold',
            minWidth: '40px',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <IconRobot size={30} />

          <IconDots className={`${'animate-pulse'} ml-3`} />
        </div>
      </div>
    </div>
  );
};

// export const ChatLoader: FC<Props> = () => {
//   return (
//     <div
//       className={`flex justify-center py-[20px] sm:py-[30px] whitespace-pre-wrap dark:bg-[#151515] dark:text-neutral-100 bg-neutral-100 text-neutral-900 dark:border-none"`}
//       style={{ overflowWrap: 'anywhere' }}
//     >
//       <div className="w-full sm:w-4/5 md:w-3/5 lg:w-[600px] xl:w-[800px] flex px-4">
//         <div className="mr-1 sm:mr-2 font-bold min-w-[40px]">
//           <img
//             src="/images/wg_logos/Logo-Large-Transparent.png"
//             alt="Me"
//             width="30"
//             height="30"
//             className="mr-4 rounded-sm"
//             style={{ maxWidth: '30px', height: '30px' }}
//           />
//         </div>
//         <IconDots className="animate-pulse" />
//       </div>
//     </div>
//   );
// };
