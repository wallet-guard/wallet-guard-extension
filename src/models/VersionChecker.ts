import { WalletName } from '../lib/config/features';

export interface WalletInfo {
  name: WalletName;
  localVersion: string | null;
  latestVersion: string | null;
  lastCheckedAt: number;
}