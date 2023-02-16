export type WalletType = keyof typeof supportedWallets;

// keep wallet names lowercase. values are the chrome web store extension id
export const supportedWallets = {
  metamask: 'nkbihfbeogaeaoehlefnkodbefgpgknn',
  phantom: 'bfnaelmomeimhlpmgjnjophhpkkoljpa',
  trustwallet: 'egjidjbpglichdcondbcbdnbeeppgdph',
  binance: 'fhbohimaelbohpjbbldcngcnapndodjp'
} as const;