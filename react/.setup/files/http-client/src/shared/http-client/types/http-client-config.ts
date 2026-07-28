export interface HttpClientConfig {
  readonly baseUrl: string;
  readonly defaultHeaders?: Readonly<Record<string, string>>;
}
