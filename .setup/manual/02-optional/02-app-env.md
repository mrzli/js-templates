# App Env

## Prerequisites

- You need to have context set up.

## Dependencies

- Add `zod` dependency if not already added:
  ```bash
  bun add zod
  ```

## Notes

- Client-side environment variables should use the `VITE_` prefix.

## Create `.env` Files

- Create `.env.local` and `.env.sample` files in the root of the project.
- Both should have this sample content:
  ```txt
  VITE_EXAMPLE_VAR=example
  VITE_BACKEND_BASE_URL=http://localhost:3000
  ```

## Create `config` Directory

- Create `src/config/` directory in the root of the project.

## Create `app-env.ts`

- Create `app-env.ts` in `src/config/` directory:

  ```ts
  import { z } from 'zod';

  export type AppEnvMode = 'development' | 'production' | string;

  export interface AppEnv {
    readonly mode: AppEnvMode;
    readonly baseUrl: string;
    readonly prod: boolean;
    readonly dev: boolean;
    readonly ssr: boolean;
    readonly exampleVar: string;
    readonly backendBaseUrl: string;
  }

  export function createAppEnv(): AppEnv {
    return envRawToEnv(APP_ENV_RAW);
  }

  interface AppEnvRaw {
    readonly MODE: AppEnvMode;
    readonly BASE_URL: string;
    readonly PROD: boolean;
    readonly DEV: boolean;
    readonly SSR: boolean;
    readonly VITE_EXAMPLE_VAR: string;
    readonly VITE_BACKEND_BASE_URL: string;
  }

  const APP_ENV_RAW: AppEnvRaw = {
    MODE: import.meta.env.MODE,
    BASE_URL: import.meta.env.BASE_URL,
    PROD: import.meta.env.PROD,
    DEV: import.meta.env.DEV,
    SSR: import.meta.env.SSR,
    VITE_EXAMPLE_VAR: import.meta.env.VITE_EXAMPLE_VAR,
    VITE_BACKEND_BASE_URL: import.meta.env.VITE_BACKEND_BASE_URL,
  };

  const APP_ENV_SCHEMA = z.object({
    MODE: z.string(),
    BASE_URL: z.string(),
    PROD: z.boolean(),
    DEV: z.boolean(),
    SSR: z.boolean(),
    VITE_EXAMPLE_VAR: z.string(),
    VITE_BACKEND_BASE_URL: z.url(),
  });

  function envRawToEnv(raw: AppEnvRaw): AppEnv {
    const parsed = APP_ENV_SCHEMA.parse(raw);

    return {
      mode: parsed.MODE,
      baseUrl: parsed.BASE_URL,
      prod: parsed.PROD,
      dev: parsed.DEV,
      ssr: parsed.SSR,
      exampleVar: parsed.VITE_EXAMPLE_VAR,
      backendBaseUrl: parsed.VITE_BACKEND_BASE_URL,
    };
  }
  ```

## Create Index File

- Export all from `app-env.ts`.

## Update `app-context.tsx`

- Add to the context value:

  ```tsx
  import type { AppEnv } from '../config';

  export interface AppContextValue {
    // other fields
    readonly env: AppEnv;
  }

  export function createAppContextValue(
    // ...
    env: AppEnv,
    // ...
  ): AppContextValue {
    return {
      // other fields
      env,
    };
  }
  ```

## Update `run.tsx`

- Update to use inside app:

  ```tsx
  import { createAppEnv } from '../config';

  export async function run(): Promise<void> {
    // ...

    const env = createAppEnv();
    const value = createAppContextValue(
      // ...
      env,
      // ...
    );

    // ...
  }
  ```

### Finalize Step

- Format using `bun run fix`.
- Commit with "setup env".
