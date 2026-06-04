# App Setup

## App Context

### App Context Code

- Create `src/setup/app-context.tsx` file.
- It needs:
  - Type for the context value.
  - The context itself.
  - The context consumer hook.
  - Function to create the context value.
- Example:
  ```ts
  import { createContext, useContext } from 'react';

  export interface AppContextValue {
    readonly appName: string;
  }

  export const AppContext = createContext<AppContextValue | undefined>(undefined);

  export const useAppContext = (): AppContextValue => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
  };

  export const createAppContextValue = (): AppContextValue => {
    return {
      appName: 'My App',
    };
  };
  ```
- Add the file to index exports.

### Setup Context in the App

- Update `run.tsx` to wrap the app in the context provider:
  ```tsx
  // ...
  import { AppContext, createAppContextValue } from './context';

  export const run = async () => {
    // ...

    const value = createAppContextValue();

    const content = (
      <StrictMode>
        <AppContext.Provider value={value}>
          // ....
        </AppContext.Provider>
      </StrictMode>
    );

    // ...
  };
  ```

### Add Context Example File

- Call it `context-page.tsx`, under examples directory.
- Have it display the `appName` from the context.
- Example:
  ```tsx
  // ...

  export const ContextPage: FC = () => {
    const { appName } = useAppContext();

    return <div>App name from context: {appName}</div>;
  };
  ```

### Finalize Step

- Format using `bun run format`.
- Commit with "setup app context".

## Setup Environment Handling

- Add `zod` dependency if not already added:
  ```bash
  bun add zod
  ```

### Create `.env` Files

- Create `.env.local` and `.env.sample` files in the root of the project.
- Both should have this sample content:
  ```txt
  VITE_EXAMPLE_VAR=example
  VITE_BACKEND_BASE_URL=http://localhost:3000
  ```

### Create Env Code

- Create `app-env.ts` in `src/setup` directory:
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

  export const appEnv = (): AppEnv => {
    return envRawToEnv(APP_ENV_RAW);
  };

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

  const envRawToEnv = (raw: AppEnvRaw): AppEnv => {
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
  };
  ```
- Export it in the `index.ts` file.

### Setup Usage in App

- In `app-context.tsx` file.
- Import the type and creator function.
- Add field to context value interface.
- Add creation to the context value creator function.

### Example Usage

- Display one of the env variables in the `context-page.tsx`.

### Finalize Step

- Format using `bun run format`.
- Commit with "setup env".

## Setup App Dependencies

### Add Dependencies Code

- Create `app-dependencies.ts` file in `src/setup/` directory.
- Example:
  ```ts
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface AppDependencies {}

  export const createAppDependencies = (): AppDependencies => {
    return {};
  };
  ```
- Add the file to index exports.

### Add to Context

- Import, add field to context value type, add creation.

### Finalize Step

- Format using `bun run format`.
- Commit with "setup app dependencies in context".
