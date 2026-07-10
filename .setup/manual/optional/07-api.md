# API

## Prerequisites

- You need to have Http Client set up.
- You need to have context set up.

## Create Directory for API

- Create `src/api/` if it does not exist, but it should already be set up beacause of Http Client.

## Add Types

- Add `types.ts` file in `src/api/` directory:

  ```ts
  export interface ApiRequestOptions {
    readonly signal?: AbortSignal;
  }
  ```

## Add `parts`

- Create `src/api/parts/` directory.

### Add `example` API Part

- This is an example API part, serves as a placeholder, reference and template for future API parts.
- Add `example.ts` file in `src/api/parts/` directory:

  ```ts
  import type { HttpClient } from '../http-client';
  import type { ApiRequestOptions } from '../types';

  export interface JsonPlaceholderPost {
    readonly userId: number;
    readonly id: number;
    readonly title: string;
    readonly body: string;
  }

  export interface ExampleApi {
    readonly offline: (options?: ApiRequestOptions) => Promise<string>;
    readonly jsonPlaceholder: (
      id: number,
      options?: ApiRequestOptions,
    ) => Promise<JsonPlaceholderPost>;
  }

  export const createExampleApi = (client: HttpClient): ExampleApi => {
    return {
      offline: async (_options?: ApiRequestOptions) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(`This is an example response after 1000ms.`);
          }, 1000);
        });
      },
      jsonPlaceholder: async (id, options?: ApiRequestOptions) => {
        const response = await client.request({
          baseUrl: 'https://jsonplaceholder.typicode.com',
          path: `posts/${id}`,
          method: 'GET',
          signal: options?.signal,
        });
        return response.data as JsonPlaceholderPost;
      },
    };
  };
  ```

### Add Index File to `parts/` Directory

- It needs to export all from `example.ts` file.

## Add `app.ts`

- This is the main API interface, which is used to define the API methods:

  ```ts
  import type { HttpClient } from './http-client';
  import { createExampleApi, type ExampleApi } from './parts';

  export interface AppApi {
    readonly example: ExampleApi;
  }

  export function createAppApi(client: HttpClient): AppApi {
    return {
      example: createExampleApi(client),
    };
  }
  ```

## Add Index File to `api/` Directory

- Make sure it exports `http-client`, `parts`, `app.ts` and `types.ts`.

## Update Application to Use API

### Update `app-dependencies.ts`

- Like this:

  ```ts
  export interface AppDependencies {
    // ...
    readonly api: AppApi;
    // ...
  }

  export function createAppDependencies(
    // ...
    api: AppApi,
    // ...
  ): AppDependencies {
    return {
      // ...
      api,
      // ...
    };
  }
  ```

### Update `run.tsx`

- Like this:

  ```tsx
  export async function run(): Promise<void> {
    // ...
    const env = createAppEnv();

    const client = createHttpClient({ baseUrl: env.backendBaseUrl });
    const api = createAppApi(client);

    const dependencies = createAppDependencies(
      // ...
      api,
      // ...
    );

    const value = createAppContextValue(env, dependencies);

    // ...
  }
  ```

## Finalize

- Format using `bun run fix`.
- Commit with "setup api".
