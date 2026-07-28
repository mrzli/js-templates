# API

## Prerequisites

- You need to have Http Client set up.
- You need to have context set up.

## Copy Files

- From root:

  ```bash
  cp -a .setup/files/api/. .
  ```

## Create Directory for API

- Create `src/api/` if it does not exist, but it should already be set up beacause of Http Client.

## Add `types`

- Create `src/api/types/` directory.
- Create `src/api/types/responses/` directory.

### Add `example-json-placeholder-post.ts` File

- With content:

  ```ts
  export interface ResponseDataExampleJsonPlaceholderPost {
    readonly userId: number;
    readonly id: number;
    readonly title: string;
    readonly body: string;
  }
  ```

### Add Index Files

- Add index file to `reponses/` directory, which exports all from all files.
- Add index file to `types/` directory, which exports all from `responses/` directory.

## Add `parts`

- Create `src/api/parts/` directory.

### Add `example` API Part

- This is an example API part, serves as a placeholder, reference and template for future API parts.
- Add `example.ts` file in `src/api/parts/` directory:

  ```ts
  import type { ApiRequestOptions } from '@/shared/api';
  import type { HttpClient } from '@/shared/http-client';

  import type { ResponseDataExampleJsonPlaceholderPost } from '../types';

  export interface ExampleApi {
    readonly offline: (options?: ApiRequestOptions) => Promise<string>;
    readonly jsonPlaceholder: (
      id: number,
      options?: ApiRequestOptions,
    ) => Promise<ResponseDataExampleJsonPlaceholderPost>;
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
        const response = await client.get({
          baseUrl: 'https://jsonplaceholder.typicode.com',
          path: `posts/${id}`,
          signal: options?.signal,
        });
        return response.data as ResponseDataExampleJsonPlaceholderPost;
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

- Make sure it exports `parts`, `types` and `app.ts`.

## Add Domain Code

- Add `src/domain/` directory if it does not exist.
- Add `helpers/` and `types/` directories inside `src/domain/` if they do not exist.

### Add `json-placeholder-post.ts` File to `types/` Directory

- With content:

  ```ts
  export interface JsonPlaceholderPost {
    readonly userId: number;
    readonly id: number;
    readonly title: string;
    readonly body: string;
  }
  ```

### Add Index File to `types/` Directory

- Export all from all files (just one file for now).

### Add `exacmple-json-placeholder-post.ts` File to `helpers/` Directory

- With content:

  ```ts
  import type { ResponseDataExampleJsonPlaceholderPost } from '@/api';

  import type { JsonPlaceholderPost } from '../types';

  export function fromDtoExampleJsonPlaceholderPost(
    dto: ResponseDataExampleJsonPlaceholderPost,
  ): JsonPlaceholderPost {
    return dto;
  }
  ```

### Add Index File to `helpers/` Directory

- Export all from all files (just one file for now).

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
