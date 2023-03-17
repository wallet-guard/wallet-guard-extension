export function openGuide() {
  chrome.tabs.create({
    url: 'https://www.walletguard.app/blog/how-to-update-browser-extensions'
  });
}

export function openDashboard(source: string, updateCurrentURL = false) {
  if (updateCurrentURL) {
    chrome.tabs.update({ url: 'chrome-extension://pdgbckgdncnhihllonhnjbdoighgpimk/dashboard.html?source=' + source });
  } else {
    chrome.tabs.create({
      url: 'chrome-extension://pdgbckgdncnhihllonhnjbdoighgpimk/dashboard.html?source=' + source
    });
  }
}
