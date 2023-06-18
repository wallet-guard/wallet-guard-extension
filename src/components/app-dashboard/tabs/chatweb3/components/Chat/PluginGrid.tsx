// src/PluginGrid.tsx
import React, { useEffect } from 'react';

import PluginCard from './PluginCard';
import { PersonaType } from '../../../../../../models/chatweb3/chatweb3';

interface PluginData {
  image: string;
  title: string;
  persona: PersonaType;
  description: string;
}

// if screen size is less than 500px
// then display 1 card per row

interface Props {
  onSend: (plugin: any) => void;
}

const PluginGrid: React.FC<Props> = ({ onSend }) => {
  const [plugins, setPlugins] = React.useState<PluginData[]>([]);

  const handleSelect = (pluginTitle: string) => {
    console.log(`Selected plugin: ${pluginTitle}`);
  };

  useEffect(() => {
    if (window.innerWidth > 500) {
      let x: PluginData[] = [
        {
          image: '/images/chatweb3/web3.png',
          title: 'New to Web3',
          persona: PersonaType.LEARN_WEB3,
          description:
            'This plugin contextualizes everything web3 meant to help and support with navigating the space.',
        },

        {
          image: '/images/chatweb3/broker.png',
          title: 'DeFi Trader',
          persona: PersonaType.DEFI_TRADER,
          description:
            'Stay ahead of DeFi trends with real-time information on high-yield savings and lending opportunities.',
        },
        {
          image: '/images/chatweb3/coding.png',
          title: 'Web3 Developer',
          persona: PersonaType.WEB3_DEVELOPER,
          description: 'Access Solidity Docs, Alchemy, and Etherscan tools to build powerful web3 applications.',
        },
        {
          image: '/images/chatweb3/art.png',
          title: 'NFT Degen',
          persona: PersonaType.NFT_DEGEN,
          description: 'Get contextualized NFT insights and answers to your favorite NFT questions with GPT.',
        },
      ];
      setPlugins(x);
    } else {
      let xx: PluginData[] = [
        {
          image: '/images/chatweb3/web3.png',
          title: 'New to Web3',
          persona: PersonaType.LEARN_WEB3,
          description:
            'This plugin contextualizes everything web3 meant to help and support with navigating the space.',
        },
      ];
      setPlugins(xx);
    }
  }, []);

  return (
    <div className="container" style={{ padding: '2rem', margin: 'auto' }}>
      <div className="row">
        {plugins &&
          plugins.map((plugin, index) => (
            <div className="col-12 col-lg-6 col-xl-3 mb-4" key={index}>
              <PluginCard
                image={plugin.image}
                title={plugin.title}
                persona={plugin.persona}
                description={plugin.description}
                onSelect={() => handleSelect(plugin.title)}
                onSend={onSend}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
export default PluginGrid;