// src/PluginCard.tsx
import React from 'react';
import { PersonaType } from '../../../../../../models/chatweb3/chatweb3';

interface PluginCardProps {
  image: string;
  title: string;
  persona: PersonaType;
  description: string;
  onSelect: () => void;
  onSend: (plugin: any) => void;
}

const PluginCard: React.FC<PluginCardProps> = ({ image, title, description, onSelect, persona, onSend }) => {
  const createNewPersona = (pluginPersona: PersonaType) => {
    onSend(pluginPersona);
  };

  return (
    <div className="bg-[#202123] rounded-lg shadow-md pt-4 w-245 h-287 mx-2 flex flex-col">
      <div className="flex-grow pl-4 pr-4 pb-4">
        <div className="flex w-[120px]">
          <img className="w-1/3 h-full object-cover rounded-md" src={image} alt={title} />
        </div>
        <div className="flex h-3/3">
          <div className="flex flex-col justify-between w-3/3 pt-[70px]">
            <h3 className="text-[24px] font-semibold">{title}</h3>
          </div>
        </div>
        <p className="text-[16px] mt-4 text-[#80808F]">{description}</p>
      </div>
      <button
        className="bg-[#19FF00] font-bold text-black w-full py-3 rounded-b-md hover:[#19FF00] transition-colors duration-200"
        onClick={() => createNewPersona(persona)}
        disabled={persona === PersonaType.NFT_DEGEN}
      >
        {persona === PersonaType.NFT_DEGEN ? 'Coming Soon' : 'Select'}
      </button>
    </div>
  );
};

export default PluginCard;
