import type { SearchParams } from '../types';
import { toSearchParams } from './search-params';

export function buildUrl(baseUrl: string, path: string, searchParams?: SearchParams): string {
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${normalizedBaseUrl}${normalizedPath}`;
  const queryString = searchParams === undefined ? '' : toSearchParams(searchParams).toString();

  if (queryString.length === 0) {
    return url;
  }

  return `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
}
