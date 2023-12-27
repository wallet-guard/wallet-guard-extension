import { NotAllowedIcon } from '@chakra-ui/icons';
import React from 'react';

export function LockedAssetPopup() {
  return (
    <div style={{ width: '100%', borderRadius: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <NotAllowedIcon />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p>Transaction Blocked</p>
        <p>If this was intentional, visit your dashboard to unlock the collection.</p>
      </div>

    </div>
  )
}