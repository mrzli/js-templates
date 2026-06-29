# App Dependencies

## Create `app-dependencies.ts`

- Create `app-dependencies.ts` file in `src/setup/` directory.
- Example:

  ```ts
  export interface AppDependencies {}

  export function createAppDependencies(): AppDependencies {
    return {};
  }
  ```

- Add the file to index exports.

## Update `app-context.tsx`

- Add `dependencies` field to `AppContextValue` type.
- Update `createAppContextValue` to accept `dependencies` parameter.

## Update `run.tsx`

- Import `createAppDependencies` and create dependencies.
- Pass dependencies to `createAppContextValue`.

## Finalize Step

- Format using `bun run fix`.
- Commit with "setup app dependencies in context".
