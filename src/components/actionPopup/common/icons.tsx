import React from 'react';
import styles from '../ActionPopup.module.css';

interface BaseIconProps {
  size: string;
  imageSrc: string;
  active: boolean;
}

interface IconProps {
  active: boolean;
}

function BaseIcon(props: BaseIconProps) {
  return <img width={props.size} className={props.active ? styles.iconActive : ''} src={props.imageSrc} />;
}

export function GlobeIcon(props: IconProps) {
  return <BaseIcon size="24px" active={props.active} imageSrc="images/popup/actionPopup/app_icons/globe.svg" />;
}

export function ChatIcon(props: IconProps) {
  return <BaseIcon size="24px" active={props.active} imageSrc="images/popup/actionPopup/app_icons/chat.svg" />;
}

export function WalletIcon(props: IconProps) {
  return <BaseIcon size="24px" active={props.active} imageSrc="images/popup/actionPopup/app_icons/wallet.svg" />;
}
