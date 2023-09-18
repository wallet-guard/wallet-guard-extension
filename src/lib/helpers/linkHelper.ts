export function openGuide() {
  chrome.tabs.create({
    url: 'https://www.walletguard.app/blog/how-to-update-browser-extensions'
  });
}

export function openDashboard(source: string, updateCurrentURL = false) {
  if (updateCurrentURL) {
    chrome.tabs.update({ url: 'https://dashboard.walletguard.app/?client=extension&source=' + source });
  }

  if (source === 'install') {
    chrome.tabs.update({ url: 'https://dashboard.walletguard.app/onboarding/welcome/?client=extension&source=install' });
  } else {
    chrome.tabs.update({ url: 'https://dashboard.walletguard.app/?client=extension&source=' + source });
  }
}
