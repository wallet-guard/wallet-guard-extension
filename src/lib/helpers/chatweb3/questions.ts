interface ChatWeb3Questions {
  [key: string]: string[];
}

interface ChatWeb3QuestionsRefactored {
  [key: string]: { original: string; reformatted: string }[];
}

export const chatWeb3Questions: ChatWeb3Questions = {
  'opensea.io': ['NFT meaning?', 'Bid how?', 'Sell how?', 'Verify ownership?'],
  'galxe.com': ["What's Galxe?", 'Trade how?', 'Invest how?', 'Galxe tokens?'],
  'gitcoin.co': ["What's Gitcoin?", 'Fund project?', 'Start grant?', 'Gitcoin hackathon?'],
  'uniswap.org': ["What's Uniswap?", 'Swap tokens?', 'Add liquidity?', 'Stake Uniswap?'],
  'stargate.finance': ["What's Stargate?", 'Deposit how?', 'Withdraw how?', 'Supported cryptocurrencies?'],
  'blur.io': ["What's Blur?", 'Create blur?', 'Share creation?', 'Blur application?'],
  'snapshot.org': ["What's Snapshot?", 'Vote how?', 'Propose vote?', "Snapshot's role?"],
  'mint.fun': ["What's Mint?", 'Play games?', 'Earn rewards?', 'Mint features?'],
  'holograph.xyz': ["What's Holograph?", 'Use it?', 'Explore 3D?', 'Holograph applications?'],
  'guild.xyz': ["What's Guild?", 'Join how?', 'Contribute how?', 'Guild benefits?'],
  'zigzag.exchange': ["What's Zigzag?", 'Exchange how?', 'Deposit how?', 'Zigzag features?'],
  'orbiter.finance': ["What's Orbiter?", 'Invest how?', 'Withdraw how?', 'Orbiter products?'],
  'lenster.xyz': ["What's Lenster?", 'Start creating?', 'View content?', 'Lenster features?'],
  'zkbridge.com': ["What's ZKBridge?", 'Connect wallet?', 'Transfer assets?', 'ZKBridge purpose?'],
  'revoke.cash': ["What's Revoke?", 'Start how?', 'Manage permissions?', 'Use Revoke?'],
  'defillama.com': ["What's DeFiLlama?", 'Analyze data?', 'View rankings?', 'DeFiLlama purpose?'],
  'zksync.io': ["What's ZkSync?", 'Transact how?', 'Withdraw how?', 'ZkSync benefits?'],
  'debank.com': ["What's DeBank?", 'Connect wallet?', 'Analyze portfolio?', 'DeBank services?'],
  'rarity.game': ["What's Rarity?", 'Start playing?', 'Progress game?', 'NFTs role?'],
  'cometh.io': ["What's Cometh?", 'Start playing?', 'Earn rewards?', 'Blockchain role?'],
  'aave.com': ["What's Aave?", 'Lend how?', 'Borrow how?', 'Aave services?'],
  'metamask.io': ['How to connect?', 'Transfer assets?', 'Gas fees?', 'Private key?'],
  'coinbase.com': ['Buy crypto?', 'Sell crypto?', 'Transfer assets?', 'Security measures?'],
  'trustwallet.com': ['Manage assets?', 'Buy tokens?', 'Staking options?', 'DApps access?'],
  'zerion.io': ['Track portfolio?', 'Buy assets?', 'Manage DeFi?', 'Transaction history?'],
  'zengo.com/': ['Keyless wallet?', 'Buy crypto?', 'Sell crypto?', 'Secure backup?'],
  'argent.xyz': ['Mobile DeFi?', 'How to send?', 'Manage assets?', 'Secure wallet?'],
  'rainbow.me': ['NFT storage?', 'Buy tokens?', 'Wallet connect?', 'Safe backup?'],
  'trezor.io': ['Setup process?', 'Backup recovery?', 'Send crypto?', 'Security features?'],
  'ledger.com': ['Setup process?', 'Send assets?', 'Update firmware?', 'Backup seed?'],
  'exodus.com': ['Desktop wallet?', 'Manage assets?', 'Secure backup?', 'Swap assets?'],
  'phantom.app': ['Solana wallet?', 'Stake SOL?', 'NFT support?', 'Swap tokens?'],
  '1inch.io': ["What's 1inch?", 'Swap tokens?', 'Trading features?', '1inch services?'],
  'binance.com': ['Trade crypto?', 'Buy assets?', 'Sell assets?', 'Binance security?'],
  'collab.land': ["What's Collab?", 'Join community?', 'Token roles?', 'Use Collab?'],
  'mirror.world': ["What's Mirror?", 'Develop Dapp?', 'Monetize how?', 'Mirror services?'],
  'slingshot.finance': ["What's Slingshot?", 'Swap tokens?', '0% fees?', 'Slingshot use?'],
  'zapper.fi': ["What's Zapper?", 'Explore DeFi?', 'Discover NFTs?', 'Zapper DAOs?'],
  'alchemy.com': ["What's Alchemy?", 'Learn Ethereum?', 'Solidity bootcamp?', 'Alchemy services?'],
  'arbitrum.io': ["What's Arbitrum?", 'Build Dapps?', 'Ethereum layer2?', 'Arbitrum benefits?'],
  'bnbchain.com': ["What's BNBChain?", 'Transaction volume?', 'Daily users?', 'Use BNBChain?'],
  'ethereum.org': ["What's Ethereum?", 'Use Ethereum?', 'Build Dapps?', 'Ethereum services?'],
  'layer3.xyz': ["What's Layer3?", 'Learn web3?', 'Community platform?', 'Layer3 use?'],
  'optimism.io': ["What's Optimism?", 'Low-cost?', 'Fast transactions?', 'Use Optimism?'],
  'polygon.technology': ["What's Polygon?", 'Low fees?', 'Fast transactions?', 'Use Polygon?'],
  'ens.domains': ["What's ENS?", 'Decentralized usernames?', 'ENS roles?', 'Use ENS?'],
  'withtally.com': ["What's Tally?", 'Govern DAO?', 'Use Tally?', 'Tally benefits?'],
  'mirror.xyz': ["What's Mirror?", 'Publish content?', 'Use Mirror?', 'Mirror services?'],
  'sandbox.game': ["What's The Sandbox?", 'Play game?', 'Create NFTs?', 'Monetize NFTs?'],
};

export const chatWeb3QuestionsRefactored: ChatWeb3QuestionsRefactored = {
  'opensea.io': [
    { original: 'NFT meaning?', reformatted: 'What is the meaning of NFT on opensea.io?' },
    { original: 'Bid how?', reformatted: 'How can I place a bid on opensea.io?' },
    { original: 'Sell how?', reformatted: 'How can I sell an item on opensea.io?' },
    { original: 'Verify ownership?', reformatted: 'How can I verify ownership of an item on opensea.io?' },
  ],
  'galxe.com': [
    { original: "What's Galxe?", reformatted: 'Could you tell me more about Galxe on galxe.com?' },
    { original: 'Trade how?', reformatted: 'How can I trade on galxe.com?' },
    { original: 'Invest how?', reformatted: 'How can I invest on galxe.com?' },
    { original: 'Galxe tokens?', reformatted: 'What are the Galxe tokens on galxe.com?' },
  ],
  'gitcoin.co': [
    { original: "What's Gitcoin?", reformatted: 'Can you tell me what Gitcoin is on gitcoin.co?' },
    { original: 'Fund project?', reformatted: 'How can I fund a project on gitcoin.co?' },
    { original: 'Start grant?', reformatted: 'How can I start a grant on gitcoin.co?' },
    { original: 'Gitcoin hackathon?', reformatted: 'How can I participate in a Gitcoin hackathon on gitcoin.co?' },
  ],
  'uniswap.org': [
    { original: "What's Uniswap?", reformatted: 'Can you explain what Uniswap is on uniswap.org?' },
    { original: 'Swap tokens?', reformatted: 'How can I swap tokens on uniswap.org?' },
    { original: 'Add liquidity?', reformatted: 'How can I add liquidity on uniswap.org?' },
    { original: 'Stake Uniswap?', reformatted: 'How can I stake on Uniswap via uniswap.org?' },
  ],
  'stargate.finance': [
    { original: "What's Stargate?", reformatted: 'Can you tell me what Stargate is on stargate.finance?' },
    { original: 'Deposit how?', reformatted: 'How can I make a deposit on stargate.finance?' },
    { original: 'Withdraw how?', reformatted: 'How can I withdraw funds on stargate.finance?' },
    {
      original: 'Supported cryptocurrencies?',
      reformatted: 'What cryptocurrencies are supported on stargate.finance?',
    },
  ],
  'blur.io': [
    { original: "What's Blur?", reformatted: 'Can you tell me what Blur is on blur.io?' },
    { original: 'Bid how?', reformatted: 'How can I place a bid on blur.io?' },
    { original: 'Sell how?', reformatted: 'How can I sell an item on blur.io?' },
    { original: 'Gas fees?', reformatted: 'What are gas fees on blur.io?' },
  ],
  'snapshot.org': [
    { original: "What's Snapshot?", reformatted: 'Could you explain what Snapshot is on snapshot.org?' },
    { original: 'Vote how?', reformatted: 'How can I vote on snapshot.org?' },
    { original: 'Propose vote?', reformatted: 'How can I propose a vote on snapshot.org?' },
    { original: "Snapshot's role?", reformatted: 'What is the role of Snapshot on snapshot.org?' },
  ],
  'mint.fun': [
    { original: "What's Mint?", reformatted: 'Could you tell me more about Mint on mint.fun?' },
    { original: 'Play games?', reformatted: 'How can I play games on mint.fun?' },
    { original: 'Earn rewards?', reformatted: 'How can I earn rewards on mint.fun?' },
    { original: 'Mint features?', reformatted: 'What are the features of Mint on mint.fun?' },
  ],
  'holograph.xyz': [
    { original: "What's Holograph?", reformatted: 'Could you tell me more about Holograph on holograph.xyz?' },
    { original: 'Use it?', reformatted: 'How can I use Holograph on holograph.xyz?' },
    { original: 'Explore 3D?', reformatted: 'How can I explore in 3D on holograph.xyz?' },
    { original: 'Holograph applications?', reformatted: 'What are the applications of Holograph on holograph.xyz?' },
  ],
  'guild.xyz': [
    { original: "What's Guild?", reformatted: 'Could you explain what Guild is on guild.xyz?' },
    { original: 'Join how?', reformatted: 'How can I join Guild on guild.xyz?' },
    { original: 'Contribute how?', reformatted: 'How can I contribute to Guild on guild.xyz?' },
    { original: 'Guild benefits?', reformatted: 'What are the benefits of joining Guild on guild.xyz?' },
  ],
  'zigzag.exchange': [
    { original: "What's Zigzag?", reformatted: 'Can you explain what Zigzag is on zigzag.exchange?' },
    { original: 'Exchange how?', reformatted: 'How can I exchange currencies on zigzag.exchange?' },
    { original: 'Deposit how?', reformatted: 'How can I make a deposit on zigzag.exchange?' },
    { original: 'Zigzag features?', reformatted: 'What features does Zigzag offer on zigzag.exchange?' },
  ],
  'orbiter.finance': [
    { original: "What's Orbiter?", reformatted: 'Could you tell me what Orbiter is on orbiter.finance?' },
    { original: 'Invest how?', reformatted: 'How can I invest on orbiter.finance?' },
    { original: 'Withdraw how?', reformatted: 'How can I make a withdrawal on orbiter.finance?' },
    { original: 'Orbiter products?', reformatted: 'What products does Orbiter offer on orbiter.finance?' },
  ],
  'lenster.xyz': [
    { original: "What's Lenster?", reformatted: 'Can you tell me what Lenster is on lenster.xyz?' },
    { original: 'Start creating?', reformatted: 'How can I start creating on lenster.xyz?' },
    { original: 'View content?', reformatted: 'How can I view content on lenster.xyz?' },
    { original: 'Lenster features?', reformatted: 'What are the features of Lenster on lenster.xyz?' },
  ],
  'zkbridge.com': [
    { original: "What's ZKBridge?", reformatted: 'Could you explain what ZKBridge is on zkbridge.com?' },
    { original: 'Connect wallet?', reformatted: 'How can I connect my wallet on zkbridge.com?' },
    { original: 'Transfer assets?', reformatted: 'How can I transfer assets on zkbridge.com?' },
    { original: 'ZKBridge purpose?', reformatted: 'What is the purpose of ZKBridge on zkbridge.com?' },
  ],
  'revoke.cash': [
    { original: "What's Revoke?", reformatted: 'Can you tell me what Revoke is on revoke.cash?' },
    { original: 'Start how?', reformatted: 'How can I get started with Revoke on revoke.cash?' },
    { original: 'Manage permissions?', reformatted: 'How can I manage permissions on revoke.cash?' },
    { original: 'Use Revoke?', reformatted: 'How can I use Revoke on revoke.cash?' },
  ],
  'defillama.com': [
    { original: "What's DeFiLlama?", reformatted: 'Could you tell me what DeFiLlama is on defillama.com?' },
    { original: 'Analyze data?', reformatted: 'How can I analyze data on defillama.com?' },
    { original: 'View rankings?', reformatted: 'How can I view rankings on defillama.com?' },
    { original: 'DeFiLlama purpose?', reformatted: 'What is the purpose of DeFiLlama on defillama.com?' },
  ],
  'zksync.io': [
    { original: "What's ZkSync?", reformatted: 'Can you explain what ZkSync is on zksync.io?' },
    { original: 'Transact how?', reformatted: 'How can I transact on zksync.io?' },
    { original: 'Withdraw how?', reformatted: 'How can I make a withdrawal on zksync.io?' },
    { original: 'ZkSync benefits?', reformatted: 'What are the benefits of ZkSync on zksync.io?' },
  ],
  'debank.com': [
    { original: "What's DeBank?", reformatted: 'Could you tell me more about DeBank on debank.com?' },
    { original: 'Connect wallet?', reformatted: 'How can I connect my wallet on debank.com?' },
    { original: 'Analyze portfolio?', reformatted: 'How can I analyze my portfolio on debank.com?' },
    { original: 'DeBank services?', reformatted: 'What services does DeBank offer on debank.com?' },
  ],
  'rarity.game': [
    { original: "What's Rarity?", reformatted: 'Can you explain what Rarity is on rarity.game?' },
    { original: 'Start playing?', reformatted: 'How can I start playing on rarity.game?' },
    { original: 'Progress game?', reformatted: 'How can I progress in the game on rarity.game?' },
    { original: 'NFTs role?', reformatted: 'What role do NFTs play on rarity.game?' },
  ],
  'cometh.io': [
    { original: "What's Cometh?", reformatted: 'Could you explain what Cometh is on cometh.io?' },
    { original: 'Start playing?', reformatted: 'How can I start playing on cometh.io?' },
    { original: 'Earn rewards?', reformatted: 'How can I earn rewards on cometh.io?' },
    { original: 'Blockchain role?', reformatted: 'What role does the blockchain play on cometh.io?' },
  ],
  'aave.com': [
    { original: "What's Aave?", reformatted: 'Could you tell me what Aave is on aave.com?' },
    { original: 'Lend how?', reformatted: 'How can I lend on aave.com?' },
    { original: 'Borrow how?', reformatted: 'How can I borrow on aave.com?' },
    { original: 'Aave services?', reformatted: 'What services does Aave provide on aave.com?' },
  ],
  'metamask.io': [
    { original: 'How to connect?', reformatted: 'How can I connect a wallet on metamask.io?' },
    { original: 'Transfer assets?', reformatted: 'How can I transfer assets on metamask.io?' },
    { original: 'Gas fees?', reformatted: 'What are the gas fees on metamask.io?' },
    { original: 'Private key?', reformatted: 'How can I manage my private key on metamask.io?' },
  ],
  'coinbase.com': [
    { original: 'Buy crypto?', reformatted: 'How can I buy crypto on coinbase.com?' },
    { original: 'Sell crypto?', reformatted: 'How can I sell crypto on coinbase.com?' },
    { original: 'Transfer assets?', reformatted: 'How can I transfer assets on coinbase.com?' },
    { original: 'Security measures?', reformatted: 'What security measures does coinbase.com have in place?' },
  ],
  'trustwallet.com': [
    { original: 'Manage assets?', reformatted: 'How can I manage assets on trustwallet.com?' },
    { original: 'Buy tokens?', reformatted: 'How can I buy tokens on trustwallet.com?' },
    { original: 'Staking options?', reformatted: 'What are the staking options on trustwallet.com?' },
    { original: 'DApps access?', reformatted: 'How can I access DApps on trustwallet.com?' },
  ],
  'zerion.io': [
    { original: 'Track portfolio?', reformatted: 'How can I track my portfolio on zerion.io?' },
    { original: 'Buy assets?', reformatted: 'How can I buy assets on zerion.io?' },
    { original: 'Manage DeFi?', reformatted: 'How can I manage DeFi on zerion.io?' },
    { original: 'Transaction history?', reformatted: 'How can I see my transaction history on zerion.io?' },
  ],
  'zengo.com/': [
    { original: 'Keyless wallet?', reformatted: 'What is a keyless wallet on zengo.com?' },
    { original: 'Buy crypto?', reformatted: 'How can I buy crypto on zengo.com?' },
    { original: 'Sell crypto?', reformatted: 'How can I sell crypto on zengo.com?' },
    { original: 'Secure backup?', reformatted: 'How can I securely backup my wallet on zengo.com?' },
  ],
  'argent.xyz': [
    { original: 'Mobile DeFi?', reformatted: 'What does Mobile DeFi mean on www.argent.xyz?' },
    { original: 'How to send?', reformatted: 'How can I send assets on www.argent.xyz?' },
    { original: 'Manage assets?', reformatted: 'How can I manage my assets on www.argent.xyz?' },
    { original: 'Secure wallet?', reformatted: 'How secure is the wallet on www.argent.xyz?' },
  ],
  'rainbow.me': [
    { original: 'NFT storage?', reformatted: 'How does NFT storage work on rainbow.me?' },
    { original: 'Buy tokens?', reformatted: 'How can I buy tokens on rainbow.me?' },
    { original: 'Wallet connect?', reformatted: 'How can I connect my wallet on rainbow.me?' },
    { original: 'Safe backup?', reformatted: 'How can I safely backup my data on rainbow.me?' },
  ],
  'trezor.io': [
    { original: 'Setup process?', reformatted: 'What is the setup process for trezor.io?' },
    { original: 'Backup recovery?', reformatted: 'How does backup recovery work on trezor.io?' },
    { original: 'Send crypto?', reformatted: 'How can I send crypto on trezor.io?' },
    { original: 'Security features?', reformatted: 'What security features does trezor.io provide?' },
  ],
  'ledger.com': [
    { original: 'Setup process?', reformatted: 'What is the setup process for ledger.com?' },
    { original: 'Send assets?', reformatted: 'How can I send assets on ledger.com?' },
    { original: 'Update firmware?', reformatted: 'How can I update the firmware on ledger.com?' },
    { original: 'Backup seed?', reformatted: 'How can I backup my seed on ledger.com?' },
  ],
  'exodus.com': [
    { original: 'Desktop wallet?', reformatted: 'Does exodus.com provide a desktop wallet?' },
    { original: 'Manage assets?', reformatted: 'How can I manage my assets on exodus.com?' },
    { original: 'Secure backup?', reformatted: 'How can I securely backup my data on exodus.com?' },
    { original: 'Swap assets?', reformatted: 'How can I swap assets on exodus.com?' },
  ],
  'phantom.app': [
    { original: 'Solana wallet?', reformatted: 'Does phantom.app provide a Solana wallet?' },
    { original: 'Stake SOL?', reformatted: 'How can I stake SOL on phantom.app?' },
    { original: 'NFT support?', reformatted: 'Does phantom.app support NFTs?' },
    { original: 'Swap tokens?', reformatted: 'How can I swap tokens on phantom.app?' },
  ],
  '1inch.io': [
    { original: "What's 1inch?", reformatted: 'Could you explain what 1inch is on 1inch.io?' },
    { original: 'Swap tokens?', reformatted: 'How can I swap tokens on 1inch.io?' },
    { original: 'Trading features?', reformatted: 'What trading features does 1inch.io provide?' },
    { original: '1inch services?', reformatted: 'What services does 1inch.io offer?' },
  ],
  'binance.com': [
    { original: 'Trade crypto?', reformatted: 'How can I trade crypto on binance.com?' },
    { original: 'Buy assets?', reformatted: 'How can I buy assets on binance.com?' },
    { original: 'Sell assets?', reformatted: 'How can I sell assets on binance.com?' },
    { original: 'Binance security?', reformatted: 'What security measures does binance.com have in place?' },
  ],
  'collab.land': [
    { original: "What's Collab?", reformatted: 'Could you explain what Collab is on collab.land?' },
    { original: 'Join community?', reformatted: 'How can I join the community on collab.land?' },
    { original: 'Token roles?', reformatted: 'What roles do tokens play on collab.land?' },
    { original: 'Use Collab?', reformatted: 'How can I use Collab on collab.land?' },
  ],
  'mirror.world': [
    { original: "What's Mirror?", reformatted: 'Could you explain what Mirror is on mirror.world?' },
    { original: 'Develop Dapp?', reformatted: 'How can I develop a Dapp on mirror.world?' },
    { original: 'Monetize how?', reformatted: 'How can I monetize on mirror.world?' },
    { original: 'Mirror services?', reformatted: 'What services does mirror.world offer?' },
  ],
  'slingshot.finance': [
    { original: "What's Slingshot?", reformatted: 'Could you explain what Slingshot is on slingshot.finance?' },
    { original: 'Swap tokens?', reformatted: 'How can I swap tokens on slingshot.finance?' },
    { original: '0% fees?', reformatted: 'Does slingshot.finance offer 0% fees?' },
    { original: 'Slingshot use?', reformatted: 'How can I use Slingshot on slingshot.finance?' },
  ],
  'zapper.fi': [
    { original: "What's Zapper?", reformatted: 'Could you explain what Zapper is on zapper.fi?' },
    { original: 'Explore DeFi?', reformatted: 'How can I explore DeFi on zapper.fi?' },
    { original: 'Discover NFTs?', reformatted: 'How can I discover NFTs on zapper.fi?' },
    { original: 'Zapper DAOs?', reformatted: 'What role do DAOs play on zapper.fi?' },
  ],
  'alchemy.com': [
    { original: "What's Alchemy?", reformatted: 'Could you explain what Alchemy is on alchemy.com?' },
    { original: 'Learn Ethereum?', reformatted: 'Where can I learn about Ethereum on alchemy.com?' },
    { original: 'Solidity bootcamp?', reformatted: 'Does alchemy.com offer a Solidity bootcamp?' },
    { original: 'Alchemy services?', reformatted: 'What services does alchemy.com offer?' },
  ],
  'arbitrum.io': [
    { original: "What's Arbitrum?", reformatted: 'Could you explain what Arbitrum is on arbitrum.io?' },
    { original: 'Build Dapps?', reformatted: 'How can I build Dapps on arbitrum.io?' },
    { original: 'Ethereum layer2?', reformatted: 'Does arbitrum.io provide an Ethereum Layer 2 solution?' },
    { original: 'Arbitrum benefits?', reformatted: 'What are the benefits of using arbitrum.io?' },
  ],
  'bnbchain.com': [
    { original: "What's BNBChain?", reformatted: 'Could you explain what BNBChain is on bnbchain.com?' },
    { original: 'Transaction volume?', reformatted: 'What is the transaction volume on bnbchain.com?' },
    { original: 'Daily users?', reformatted: 'How many daily users are there on bnbchain.com?' },
    { original: 'Use BNBChain?', reformatted: 'How can I use BNBChain on bnbchain.com?' },
  ],
  'ethereum.org': [
    { original: "What's Ethereum?", reformatted: 'Could you explain what Ethereum is on ethereum.org?' },
    { original: 'Use Ethereum?', reformatted: 'How can I use Ethereum on ethereum.org?' },
    { original: 'Build Dapps?', reformatted: 'How can I build Dapps on ethereum.org?' },
    { original: 'Ethereum services?', reformatted: 'What services does ethereum.org provide?' },
  ],
  'layer3.xyz': [
    { original: "What's Layer3?", reformatted: 'Could you explain what Layer3 is on layer3.xyz?' },
    { original: 'Learn web3?', reformatted: 'Where can I learn about web3 on layer3.xyz?' },
    { original: 'Community platform?', reformatted: 'Does layer3.xyz serve as a community platform?' },
    { original: 'Layer3 use?', reformatted: 'How can I use Layer3 on layer3.xyz?' },
  ],
  'optimism.io': [
    { original: "What's Optimism?", reformatted: 'Could you explain what Optimism is on optimism.io?' },
    { original: 'Low-cost?', reformatted: 'Does optimism.io provide low-cost transactions?' },
    { original: 'Fast transactions?', reformatted: 'Does optimism.io provide fast transactions?' },
    { original: 'Use Optimism?', reformatted: 'How can I use Optimism on optimism.io?' },
  ],
  'polygon.technology': [
    { original: "What's Polygon?", reformatted: 'Could you explain what Polygon is on polygon.technology?' },
    { original: 'Low fees?', reformatted: 'Does polygon.technology offer low transaction fees?' },
    { original: 'Fast transactions?', reformatted: 'Does polygon.technology offer fast transactions?' },
    { original: 'Use Polygon?', reformatted: 'How can I use Polygon on polygon.technology?' },
  ],
  'ens.domains': [
    { original: "What's ENS?", reformatted: 'Could you explain what ENS is on ens.domains?' },
    { original: 'Decentralized usernames?', reformatted: 'Does ens.domains provide decentralized usernames?' },
    { original: 'ENS roles?', reformatted: 'What roles does ENS play on ens.domains?' },
    { original: 'Use ENS?', reformatted: 'How can I use ENS on ens.domains?' },
  ],
  'withtally.com': [
    { original: "What's Tally?", reformatted: 'Could you explain what Tally is on withtally.com?' },
    { original: 'Govern DAO?', reformatted: 'How can I govern a DAO on withtally.com?' },
    { original: 'Use Tally?', reformatted: 'How can I use Tally on withtally.com?' },
    { original: 'Tally benefits?', reformatted: 'What are the benefits of using Tally on withtally.com?' },
  ],
  'mirror.xyz': [
    { original: "What's Mirror?", reformatted: 'Could you explain what Mirror is on mirror.xyz?' },
    { original: 'Publish content?', reformatted: 'How can I publish content on mirror.xyz?' },
    { original: 'Use Mirror?', reformatted: 'How can I use Mirror on mirror.xyz?' },
    { original: 'Mirror services?', reformatted: 'What services does mirror.xyz offer?' },
  ],
  'sandbox.game': [
    { original: "What's The Sandbox?", reformatted: 'Could you explain what The Sandbox is on sandbox.game?' },
    { original: 'Play game?', reformatted: 'How can I play the game on sandbox.game?' },
    { original: 'Create NFTs?', reformatted: 'How can I create NFTs on sandbox.game?' },
    { original: 'Monetize NFTs?', reformatted: 'How can I monetize NFTs on sandbox.game?' },
  ],
};
