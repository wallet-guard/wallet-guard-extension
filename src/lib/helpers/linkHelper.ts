export function openGuide() {
  chrome.tabs.create({
    url: 'https://medium.com/@walletguardofficial/how-to-update-browser-extensions-e61b1138cf7e'
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
