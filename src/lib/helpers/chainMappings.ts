export function getAssetLogo(chainId: string) {
  switch (chainId) {
    case '0x1':
    case '1':
      return 'images/asset_logos/ethereum.png';
    case '42161':
    case '0xa4b1':
      return 'images/asset_logos/arbitrum.png';
    case '137':
    case '0x89':
      return 'images/asset_logos/matic.png';
    case '10':
    case '0xa':
      return 'images/asset_logos/optimism.png';
    case '56':
    case '0x38':
      return 'images/asset_logos/bsc.png';
    case '8453':
    case '0x2105':
      return 'images/asset_logos/base.png';
    default:
      return 'images/asset_logos/ethereum.png';
  }
}