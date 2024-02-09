export function openGuide() {
  chrome.tabs.create({
    url: 'https://www.walletguard.app/blog/how-to-update-browser-extensions'
  });
}

export function openDashboard(source: string) {
  if (source === 'settings') {
    chrome.tabs.create({ url: 'https://dashboard.walletguard.app/settings/extension/?client=extension&source=settings' });
  } else if (source === 'install') {
    chrome.tabs.create({ url: 'https://dashboard.walletguard.app/onboarding/welcome/?client=extension&source=install' });
  } else if (source === 'referrals') {
    chrome.tabs.create({ url: 'https://dashboard.walletguard.app/?referrals&client=extension&source=referrals' });
  } else {
    chrome.tabs.create({ url: 'https://dashboard.walletguard.app/?client=extension&source=' + source });
  }
}
