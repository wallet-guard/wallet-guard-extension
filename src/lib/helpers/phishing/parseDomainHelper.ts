import { parseDomain, ParseResultType } from 'parse-domain';
import { PhishingResponse } from '../../../models/PhishingResponse';
import { createDomainName, standardizeUrl } from '../util';

export function getDomainNameFromURL(url: string): string {
  const domainObj = parseDomain(standardizeUrl(url));
  if (domainObj.type !== ParseResultType.Listed) return url;

  return createDomainName(domainObj);
}

export function domainHasChanged(
  url: string,
  currentSite: PhishingResponse
): boolean {
  const domainObj = parseDomain(standardizeUrl(url));
  if (domainObj.type !== ParseResultType.Listed) return true;

  const domainName = createDomainName(domainObj);

  return domainName !== currentSite.domainName;
}
