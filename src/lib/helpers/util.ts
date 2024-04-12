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
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(domain));
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

type BlocklistCheckResponse = {
  blocked: boolean;
  hash: string;
};

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
    hash,
  };
};

export function filterURLQueryParameters(input: string): string {
  const filteredParams = new Set(
    [
      'username',
      'user',
      'email',
      'fullname',
      'name',
      'first_name',
      'last_name',
      'phone',
      'phone_number',
      'address',
      'city',
      'state',
      'zipcode',
      'postal_code',
      'country',
      'ssn',
      'passport',
      'driver_license',
      'credit_card',
      'password',
      'token',
      'auth',
      'authentication',
      'session',
      'bank_account',
      'bvn',
      'routing_number',
      'transaction_id',
      'medical_record',
      'health_insurance',
      'patient_id',
      'national_id',
      'tax_id',
      'employee_id',
      'member_id',
      'ip_address',
      'mac_address',
      'device_id',
      'login',
      'subscriber_id',
      'member',
      'profile_id',
      'user_id',
      'api_key',
      'client_id',
      'client_secret',
      'access_token',
      'refresh_token',
      'dob',
      'gender',
      'race',
      'nationality',
      'marital_status',
      'wallet_address',
      'public_key',
      'tx_id',
      'transaction_hash',
      'nonce',
      'contract_address',
      'token_id',
      'signature',
      'seed_phrase',
      'node_id',
      'chain_id',
    ].map((p) => p.toLowerCase())
  );

  const url = new URL(input);
  const params = url.searchParams;

  Array.from(params.keys()).forEach((key) => {
    if (filteredParams.has(key.toLowerCase())) {
      params.delete(key);
    }
  });

  url.search = params.toString();

  return url.toString();
}
