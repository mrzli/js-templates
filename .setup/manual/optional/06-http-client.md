# Http Client

## Create Directory for Http Client

- Create `src/api/http-client` directory, recursively, if it does not exist.

## Add Types

- Create `src/api/http-client/types` directory.

### Add `request-config.ts`

- This is the type passed to the `request` method of the HTTP client, containing, target, headers, data etc. for making the request:

  ```ts
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

  export interface RequestConfig<TRequest = unknown> {
    readonly baseUrl?: string;
    readonly path: string;
    readonly method: RequestMethod;
    readonly headers?: Readonly<Record<string, string>>;
    readonly body?: TRequest;
    readonly signal?: AbortSignal;
  }
  ```

### Add `api-response.ts`

- This is the wrapper type for the response, and the return value of the HTTP client `request` method:

  ```ts
  export interface ApiResponse<T> {
    readonly status: number;
    readonly headers: Readonly<Record<string, string>>;
    readonly data: T | undefined;
  }
  ```

### Add `http-client-config.ts`

- This is the configuration used when creating the HTTP client:

  ```ts
  export interface HttpClientConfig {
    readonly baseUrl: string;
    readonly defaultHeaders?: Readonly<Record<string, string>>;
  }
  ```

### Add `http-client.ts`

- This is the interface defining the HTTP client:

  ```ts
  import type { ApiResponse } from './api-response';
  import type { RequestConfig } from './request-config';

  export interface HttpClient {
    readonly request: <TResponse>(config: RequestConfig) => Promise<ApiResponse<TResponse>>;
  }
  ```

### Add `index.ts`

- Export all from each of the files in this directory.

## Add Implementation

### Add `http-client.ts`

- This is the implementation of the HTTP client, which uses the `fetch` API to make requests:

  ```ts
  import type { HttpClientConfig, HttpClient, ApiResponse, RequestConfig } from './types';

  export function createHttpClient(config: HttpClientConfig): HttpClient {
    const { baseUrl, defaultHeaders } = config;

    const baseHeaders = createBaseHeaders(defaultHeaders);

    return {
      request: async <TResponse>(config: RequestConfig): Promise<ApiResponse<TResponse>> => {
        const { baseUrl: baseUrlOverride, path } = config;

        const url = buildUrl(baseUrlOverride ?? baseUrl, path);
        const requestInit = toRequestInitObject(config, baseHeaders);

        const response = await fetch(url, requestInit);

        if (!response.ok) {
          const errorText = await getErrorText(response);
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await getJsonResponse<TResponse>(response);

        return {
          status: response.status,
          headers: toHeadersObject(response.headers),
          data,
        };
      },
    };
  }

  function createBaseHeaders(
    defaultHeaders: Readonly<Record<string, string>> | undefined,
  ): Readonly<Record<string, string>> {
    return {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    };
  }

  function buildUrl(baseUrl: string, path: string): string {
    const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${normalizedBaseUrl}${normalizedPath}`;
  }

  function toRequestInitObject(
    config: RequestConfig,
    baseHeaders: Readonly<Record<string, string>>,
  ): RequestInit {
    const { method, headers, body, signal } = config;

    return {
      method,
      headers: {
        ...baseHeaders,
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    };
  }

  async function getErrorText(response: Response): Promise<string> {
    try {
      return await response.text();
    } catch {
      return 'No error message available';
    }
  }

  async function getJsonResponse<TResponse>(response: Response): Promise<TResponse | undefined> {
    if (response.status === 204) {
      return undefined;
    }

    try {
      return await response.json();
    } catch {
      return undefined;
    }
  }

  function toHeadersObject(headers: Headers): Record<string, string> {
    return Object.fromEntries(headers.entries());
  }
  ```

### Add `index.ts`

- Export all from `http-client.ts` and the `types` directory.

## Finalize

- Format using `bun run fix`.
- Commit with "setup http client".
