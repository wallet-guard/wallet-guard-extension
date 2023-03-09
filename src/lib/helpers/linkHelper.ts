import posthog from 'posthog-js'

export function openGuide() {
  chrome.tabs.create({
    url: 'https://medium.com/@walletguardofficial/how-to-update-browser-extensions-e61b1138cf7e'
  });
}

export function openDashboard(updateCurrentURL = false) {
  posthog.capture('open dashboard');
  if (updateCurrentURL) {
    chrome.tabs.update({ url: 'chrome-extension://pdgbckgdncnhihllonhnjbdoighgpimk/dashboard.html' });
  } else {
    chrome.tabs.create({
      url: 'chrome-extension://pdgbckgdncnhihllonhnjbdoighgpimk/dashboard.html'
    });
  }
}
