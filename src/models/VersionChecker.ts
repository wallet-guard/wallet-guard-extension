import { WalletType } from '../lib/config/supportedWallets';

export interface WalletInfo {
  name: WalletType;
  localVersion: string | null;
  latestVersion: string | null;
  lastCheckedAt: number;
}