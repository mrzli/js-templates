# Env

## Prerequisites

- You have to have routing set up.
- You need to have app context set up.
- You need to have examples pages structure set up.

## Notes

- Client-side environment variables should use the `VITE_` prefix.

## Example

- In `app-context.tsx`, import `appEnv` from `app-env.ts`.
- Add `exampleVar` to `AppContextValue`.
- Add `exampleVar` to the value returned by `createAppContextValue()`.
- The final file should look like this:

  ```tsx
  import { createContext, useContext } from 'react';

  import { appEnv } from './app-env';

  export interface AppContextValue {
    readonly appName: string;
    readonly exampleVar: string;
  }

  export const AppContext = createContext<AppContextValue | undefined>(undefined);

  export function useAppContext(): AppContextValue {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
  }

  export function createAppContextValue(): AppContextValue {
    const env = appEnv();

    return {
      appName: 'Flash Cards',
      exampleVar: env.exampleVar,
    };
  }
  ```

### Use Env

- Update `examples/context-page.tsx` to display the env value:

  ```tsx
  import type { ReactNode } from 'react';

  import { useAppContext } from '../../setup/app-context';

  export function ContextPage(): ReactNode {
    const { appName, exampleVar } = useAppContext();

    return (
      <div>
        <div>App name from context: {appName}</div>
        <div>Example env variable: {exampleVar}</div>
      </div>
    );
  }
  ```

## Routing

- No routing changes are needed if you already added the context example route.

## Finalize

- Format using `bun run fix`.
- Commit with "setup env example".
