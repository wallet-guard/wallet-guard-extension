// This script will run on Google search results pages due to the manifest file's content script match pattern.
document.addEventListener('DOMContentLoaded', function () {
  console.log("checking for ads");
  // Google uses specific class names for ads, which can change over time.
  // As of the last update, the following class names are known to be used for ads.
  // You'll need to make sure these are up-to-date.
  const adSelectors = [
    '.commercial-unit-desktop-rhs', // Sidebar ads
    '.commercial-unit-desktop-top', // Top ads
    '.cu-container',               // Another ad container class
    'div[data-text-ad]',           // Marked text ads
    '.ads-ad',                     // General ad class
    '#tads',                       // Top ads div ID
    '#tadsb',                      // Bottom ads div ID
    '#bottomads'                   // Alternative Bottom ads div ID
  ];

  // Function to remove ads based on the selectors.
  function removeAds(selectors: string[]) {
    selectors.forEach(selector => {
      const ads = document.querySelectorAll(selector);
      ads.forEach(ad => ad.remove());
      console.log('removing ad with selector', selector);
    });
  }

  // Execute the ad removal function with the defined selectors.
  removeAds(adSelectors);

  // You might want to set up a MutationObserver to handle ads that load after the initial page load,
  // such as when new search results are dynamically added to the page as the user scrolls.
});
