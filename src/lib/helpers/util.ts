import { ParseResultListed } from 'parse-domain';

export function standardizeUrl(url: string): string {
  url = url.replace('https://', '');
  url = url.replace('http://', '');
  url = url.replace('www.', '');

  const backslashIndex = url.indexOf('/');
  if (backslashIndex !== -1) {
    url = url.substring(0, backslashIndex);
  }

  return url;
}

export function isEmptyObject(obj: object): boolean {
  if (typeof obj !== 'object') {
    return false;
  }

  return Object.keys(obj).length === 0;
}

export function mapSubdomains(subdomains: string[] | undefined): string {
  if (!subdomains || subdomains.length === 0) return '';

  let mapped = '';

  for (let sub of subdomains) {
    mapped += `${sub}.`;
  }

  return mapped;
}

export function setIcon(phishing: boolean): void {

  if (phishing === false) {
    chrome.action.setIcon({
      path: {
        '16': '../images/favicon/shield-green-16.png'
      }
    });
  } else if (phishing === true) {
    chrome.action.setIcon({
      path: {
        '16': '../images/favicon/shield-red-16.png'
      }
    });
  } else {
    chrome.action.setIcon({
      path: {
        '16': '../images/favicon/encrypted.png'
      }
    });
  }
}

export function createDomainName(domainObj: ParseResultListed) {
  const domain = domainObj.domain;
  const topLevelDomains = domainObj.topLevelDomains;

  // Handle URLs like gov.uk, netlify.app, etc.
  if (!domain) {
    console.log('domain is blank');
    return topLevelDomains.join('.');
  }

  let domainExtension = '';
  topLevelDomains.forEach((topLevelDomain) => {
    domainExtension += '.' + topLevelDomain;
  });

  return domainObj.domain + domainExtension;
}

export function urlIsPhishingWarning(url: string): boolean {
  if (url.startsWith('chrome-extension://') && url.includes('phish.html')) {
    return true;
  }

  return false;
}
