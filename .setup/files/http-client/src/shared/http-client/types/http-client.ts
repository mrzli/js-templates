import type { ApiResponse } from './api-response';
import type { HttpRequestWithoutMethod, RequestConfig } from './request-config';

type HttpClientRequest = <TResponse, TRequest = unknown>(
  config: RequestConfig<TRequest>,
) => Promise<ApiResponse<TResponse>>;

type HttpClientRequestExplicitMethod = <TResponse, TRequest = unknown>(
  config: HttpRequestWithoutMethod<TRequest>,
) => Promise<ApiResponse<TResponse>>;

export interface HttpClient {
  readonly request: HttpClientRequest;
  readonly get: HttpClientRequestExplicitMethod;
  readonly post: HttpClientRequestExplicitMethod;
  readonly put: HttpClientRequestExplicitMethod;
  readonly delete: HttpClientRequestExplicitMethod;
  readonly patch: HttpClientRequestExplicitMethod;
  readonly options: HttpClientRequestExplicitMethod;
  readonly head: HttpClientRequestExplicitMethod;
}
