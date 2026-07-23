export const LIST_OF_REQUEST_METHODS = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'OPTIONS',
  'HEAD',
] as const;

export type RequestMethod = (typeof LIST_OF_REQUEST_METHODS)[number];

export type Headers = Readonly<Record<string, string>>;

export type SearchParamValue = string | number | boolean | null | undefined;
export type SearchParams = Readonly<Record<string, SearchParamValue>>;

export interface RequestConfig<TRequest = unknown> {
  readonly baseUrl?: string;
  readonly path: string;
  readonly method: RequestMethod;
  readonly headers?: Headers;
  readonly searchParams?: SearchParams;
  readonly body?: TRequest;
  readonly signal?: AbortSignal;
}

export type HttpRequestWithoutMethod<TRequest = unknown> = Omit<RequestConfig<TRequest>, 'method'>;
