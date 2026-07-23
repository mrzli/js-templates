import type { HttpClientConfig, HttpClient, ApiResponse, RequestConfig } from './types';
import { buildUrl } from './util';

export function createHttpClient(config: HttpClientConfig): HttpClient {
  const { baseUrl, defaultHeaders } = config;

  const baseHeaders = createBaseHeaders(defaultHeaders);

  const request = async <TResponse>(
    requestConfig: RequestConfig,
  ): Promise<ApiResponse<TResponse>> => {
    const { baseUrl: baseUrlOverride, path, searchParams } = requestConfig;

    const url = buildUrl(baseUrlOverride ?? baseUrl, path, searchParams);
    const requestInit = toRequestInitObject(requestConfig, baseHeaders);

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
  };

  return {
    request,
    get: (requestConfig) => request({ ...requestConfig, method: 'GET' }),
    post: (requestConfig) => request({ ...requestConfig, method: 'POST' }),
    put: (requestConfig) => request({ ...requestConfig, method: 'PUT' }),
    delete: (requestConfig) => request({ ...requestConfig, method: 'DELETE' }),
    patch: (requestConfig) => request({ ...requestConfig, method: 'PATCH' }),
    options: (requestConfig) => request({ ...requestConfig, method: 'OPTIONS' }),
    head: (requestConfig) => request({ ...requestConfig, method: 'HEAD' }),
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
