export function openGuide() {
  chrome.tabs.create({
    url: 'https://www.walletguard.app/blog/how-to-update-browser-extensions'
  });
}

export function openDashboard(source: string) {
  chrome.tabs.create({ url: 'https://dashboard.walletguard.app' });
}
