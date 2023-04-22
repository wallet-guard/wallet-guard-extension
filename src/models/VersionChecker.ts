import { WalletType } from '../lib/config/features';

export interface WalletInfo {
  name: WalletType;
  localVersion: string | null;
  latestVersion: string | null;
  lastCheckedAt: number;
}