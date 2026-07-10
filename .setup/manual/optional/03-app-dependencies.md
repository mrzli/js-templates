# App Dependencies

## Prerequisites

- You need to have context set up.

## Create `dependencies/` Directory

- Create `src/dependencies/` directory if it does not exist.

## Create `app-dependencies.ts`

- Create `app-dependencies.ts` file in `src/dependencies/` directory.
- Example:

  ```ts
  export interface AppDependencies {}

  export function createAppDependencies(): AppDependencies {
    return {};
  }
  ```

## Update Index Exports

- Export it in the index file.

## Update `app-context.tsx`

- Add to the context value:

  ```tsx
  import type { AppDependencies } from '../dependencies';

  export interface AppContextValue {
    // other fields
    readonly dependencies: AppDependencies;
  }

  export function createAppContextValue(
    // ...
    dependencies: AppDependencies,
    // ...
  ): AppContextValue {
    return {
      // other fields
      dependencies,
    };
  }
  ```

## Update `run.tsx`

- Update to use inside app:

  ```tsx
  import { createAppDependencies } from '../dependencies';

  export async function run(): Promise<void> {
    // ...

    const dependencies = createAppDependencies();
    const value = createAppContextValue(
      // ...
      dependencies,
      // ...
    );

    // ...
  }
  ```

## Finalize Step

- Format using `bun run fix`.
- Commit with "setup app dependencies".
