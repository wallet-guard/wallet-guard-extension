import { ParseResultListed } from 'parse-domain';
import localStorageHelpers from './chrome/localStorage';
import { WgKeys } from './chrome/localStorageKeys';

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

export function isNullOrEmptyObject(obj: object): boolean {
  if (!obj || typeof obj !== 'object') {
    return true;
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
        '16': '../images/favicon/shield-green-16.png',
      },
    });
  } else if (phishing === true) {
    chrome.action.setIcon({
      path: {
        '16': '../images/favicon/shield-red-16.png',
      },
    });
  } else {
    chrome.action.setIcon({
      path: {
        '16': '../images/favicon/encrypted.png',
      },
    });
  }
}

export function createDomainName(domainObj: ParseResultListed) {
  const domain = domainObj.domain;
  const topLevelDomains = domainObj.topLevelDomains;

  // Handle URLs like gov.uk, netlify.app, etc.
  if (!domain) {
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


const sha256 = async (domain: string) => {
  const hash = await crypto.subtle.digest('SHA-256', new
    TextEncoder().encode(domain));
  return Array.from(new Uint8Array(hash)).map(b =>
    b.toString(16).padStart(2, '0')).join('');
}

type BlocklistCheckResponse = {
  blocked: boolean;
  hash: string;
}

export const isBlocked = async (urlString: string): Promise<BlocklistCheckResponse> => {
  const blocklist = await localStorageHelpers.get<string[]>(WgKeys.RequestsBlocklist);

  if (!blocklist) {
    return { blocked: false, hash: '' };
  }

  const url = new URL(urlString);
  const hash = await sha256(url.hostname.toLowerCase());
  const blocked = blocklist.includes(hash);

  return {
    blocked,
    hash
  };
}
