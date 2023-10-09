export function openGuide() {
  chrome.tabs.create({
    url: 'https://www.walletguard.app/blog/how-to-update-browser-extensions'
  });
}

export function openDashboard(source: string, isSimulator = false) {
  if (isSimulator) {
    chrome.tabs.create({
      url: 'https://dashboard.walletguard.app/?client=extension&source=' + source
    });
    return;
  }

  if (source === 'install') {
    chrome.tabs.create({ url: 'https://dashboard.walletguard.app/onboarding/welcome/?client=extension&source=install' });
  } else if (source === 'phishing_page_my_dashboard') {
    chrome.tabs.update({ url: 'https://dashboard.walletguard.app/?client=extension&source=' + source });
  } else {
    chrome.tabs.create({ url: 'https://dashboard.walletguard.app/?client=extension&source=' + source });
  }
}
