import React from 'react';

interface AssetChangeImageProps {
  imageURL?: string;
}

export function AssetChangeImage(props: AssetChangeImageProps) {
  return (
    <img
      width={35}
      src={props.imageURL ? props.imageURL : '/images/popup/unknown.png'}
      style={{ borderRadius: '20%', maxHeight: '35px' }}
    />
  );
}
