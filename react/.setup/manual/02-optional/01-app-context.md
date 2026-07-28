# App Context

## Create `app-context.tsx` File

- Create `setup/app-context.tsx` file.
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

  export function useAppContext(): AppContextValue {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
  }

  export function createAppContextValue(): AppContextValue {
    return {
      appName: 'My App',
    };
  }
  ```

## Update Index Exports

- Add the file to index exports.

## Setup Context in the App

- Update `run.tsx` to wrap the app in the context provider:

  ```tsx
  // ...
  import { AppContext, createAppContextValue } from './app-context';

  export async function run(): Promise<void> {
    // ...

    const value = createAppContextValue();

    const content = (
      <StrictMode>
        <AppContext.Provider value={value}>/*...*/</AppContext.Provider>
      </StrictMode>
    );

    // ...
  }
  ```

## Finalize Step

- Format using `bun run fix`.
- Commit with "setup app context".
