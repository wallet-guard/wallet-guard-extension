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
    <div
      style={{
        backgroundColor: '#202123',
        borderRadius: '0.5rem',
        paddingTop: '1rem',
        width: '255px',
        height: '287px',
        margin: '0 0.5rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          flexGrow: 1,
          paddingLeft: '1rem',
          paddingRight: '1rem',
          paddingBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', width: '120px' }}>
          <img
            style={{ width: '33.33%', height: '100%', objectFit: 'cover', borderRadius: '0.375rem' }}
            src={image}
            alt={title}
          />
        </div>
        <div style={{ display: 'flex', height: '100%' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '100%',
              paddingTop: '50px',
            }}
          >
            <h3 style={{ fontSize: '24px', fontWeight: '600' }}>{title}</h3>
          </div>
        </div>
        <p style={{ fontSize: '16px', marginTop: '0.5rem', color: '#80808F' }}>{description}</p>
      </div>
      <button
        className="btn btn-block"
        style={{
          backgroundColor: '#19FF00',
          fontWeight: '700',
          color: 'black',
          marginTop: '-26px',
          padding: '0.75rem',
          borderRadius: '0 0 0.375rem 0.375rem',
        }}
        onClick={() => createNewPersona(persona)}
        disabled={persona === PersonaType.NFT_DEGEN}
      >
        {persona === PersonaType.NFT_DEGEN ? 'Coming Soon' : 'Selected'}
      </button>
    </div>
  );
};

export default PluginCard;
