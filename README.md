# Wallet Guard

<img src="public/images/wg_logos/Logo-Large-Transparent.png"  width="180px" alt="Wallet Guard logo" align="right">

Secure your online assets with Wallet Guard - the ultimate web3 security browser extension. Our solution features advanced multi-layered security measures designed to protect against scams and fraud. This is done via proactive phishing protection and transaction analysis, providing you a comprehensive security suite.

<br>
<br>

# Detect and Block Malicious Websites

Wallet Guard's Proactive Phishing Protection uses an ensemble of machine learning models to check for common phishing attack methods such as recently created domains, homoglyph translations and impersonation attempts.

<img src="https://cdn.walletguard.app/extension-assets/phishing-screen.png" alt="Phishing screen example">

<br>

# Transaction Simulations

What's the benefit of Transaction Simulations?
The blockchain can be scary without knowing what you're doing!

- Transaction Simulations will enable you to understand exactly what is entering and leaving your wallet on any transaction!
- This human readable context + a friendly UI will help defeat many scams we see in web3.
- Wallet Guard's transaction simulation also works in tandem with our proactive phishing detection to provide deeper insights on transactions!
  <img src="https://cdn.walletguard.app/extension-assets/SimulationExample.gif" alt="Example of transaction simulation">

<br>

# How are we proxying transactions

Like MetaMask, Wallet Guard injects the Ethereum web3 API into the JavaScript context of any website, enabling the secure reading and verification of transaction requests from decentralized applications (dApps).

Wallet Guard acts as an intermediary between your browser and wallet, analyzing transactions without modification. Once you’ve made a decision, we return the transaction to your wallet without any changes, allowing Wallet Guard to operate seamlessly in the background.

```typescript
  if (provider && !provider?.isWalletGuard) {
    log.debug({ provider }, 'Added proxy');

    try {
      Object.defineProperty(provider, 'request', {
        value: new Proxy(provider.request, requestHandler),
      });
      Object.defineProperty(provider, 'send', {
        value: new Proxy(provider.send, sendHandler),
      });
      Object.defineProperty(provider, 'sendAsync', {
        value: new Proxy(provider.sendAsync, sendAsyncHandler),
      });
      provider.isWalletGuard = true;
      console.log('Wallet Guard is running!');
    } catch (error) {
      console.log('Wallet Guard could not start!');
    }
  }
};

```

<br>

## Terms of Service and Privacy

💻 Open Source: We believe in product transparency. We encourage our users to audit our open-source codebase.

📄 Privacy: Your data privacy is very important to us. Check out our privacy policy here. https://walletguard.app/privacy

📋 Terms of service: By using Wallet Guard you agree to our terms of use outlined here: https://walletguard.app/terms

<br>

## Contact Us

Any questions or concerns? contacts us!

- [Twitter](https://twitter.com/wallet_guard)
- [Discord](http://discord.gg/cM8USCesnd)

## Beta environment publishing

In order to test new permissions publishing proactively, you should publish to the Beta environment first. To publish a development build to the Chrome store, copy this name and description into the `manifest.json` and `package.json`. Key is only for `manifest.json`

BETA Environment (Requires your email to be added to verified testers & signed-in using that Google account): https://chrome.google.com/webstore/detail/wallet-guard-development/hneinefadakgidghilfdhbpalmgbnbjd/?authuser=0

```
  "name": "Wallet Guard DEVELOPMENT BUILD",
  "description": "THIS EXTENSION IS FOR BETA TESTING",
  "key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkmDbgtHSlVypnBDmDD/JXSyah+EUyhV5ResDho2X2JPge2wfqtw/O2zOwTJ77x0NvF8zFXwdH6IG77dtKxlF00p/CfdFpspIJb7E0ovoRVqXrNEJPAX2fByILVzo3CZNj8mqv//DTkHKRAbQVpKWOjLT0YmgwVl4L+adXdHLGFMKqjDtTwP5eRp5gpjnXsU1DKvRCUo8/7q92AaMze6MKNEPjKq5H7gOHuXG9UESv4c2n2i40osmR++PBoDgpnSnnmAUVne28tBo7YpQeuXJ3WOoIDPyeM5FtmosEj+pk0bgixJ3bBjXL0xx1f/LzH7Pk3ET3vc6C9lili8XdfJ9XQIDAQAB",
```

For the full Docs on publishing to a test environment, visit https://developer.chrome.com/docs/webstore/cws-dashboard-distribution/
