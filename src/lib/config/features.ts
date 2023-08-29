export type WalletType = keyof typeof supportedWallets;

// keep wallet names lowercase. values are the chrome web store extension id
export const supportedWallets = {
  metamask: 'nkbihfbeogaeaoehlefnkodbefgpgknn',
  phantom: 'bfnaelmomeimhlpmgjnjophhpkkoljpa',
  trustwallet: 'egjidjbpglichdcondbcbdnbeeppgdph',
  binance: 'fhbohimaelbohpjbbldcngcnapndodjp',
  rabby: 'acmacodkjbdgmoleebolmdjonilkdbch',
  coinbase: 'hnfanknocfeofbddgcijnmhnfnkdnaad',
  keplr: 'dmkamcknogkgcdfhhbddcghachkejeap',
  argentx: 'dlcobpjiigpikoobohmabehhmhfoodbb',
  xverse: 'idnnbdplmphpflfnlkomgpfbpcgelopg',
  sui: 'opcgpfmipidbgpenhmajoajpbobppdil',
} as const;

export const SUPPORTED_CHAINS = [
  '1', '0x1', // ETH Mainnet
  '42161', '0xa4b1', // Arbitrum One
  '137', '0x89' // Polygon Mainnet
];