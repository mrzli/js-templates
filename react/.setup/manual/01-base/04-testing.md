# Testing

## Add Dependencies

- Add dependencies:

  ```bash
  bun add -d vitest
  ```

## Update `package.json`

- Remove any existing `test` scripts.
- Add the test scripts, probably between linting and `preflight`.
- Also update the `preflight` script to run tests before building.
- Like this:

  ```json
  "scripts": {
    // other scripts...
    "test": "vitest run",
    "test:watch": "vitest",
    "preflight": "bun run fix && bun run test && bun run build",
    "backport": "..."
  }
  ```

## Update `vite.config.ts`

- Like this:

  ```ts
  // other imports...
  import { configDefaults, defineConfig } from 'vitest/config';

  export default defineConfig({
    // other config...
    test: {
      exclude: [...configDefaults.exclude, '.setup/**'],
    },
  });
  ```

## Update `.oxlintrc.json`

- Add the following rule to `.oxlintrc.json`:

  ```json
  "rules": {
    // ...
    "vitest/valid-title": ["warn", { "allowArguments": true }],
    // ...
  }
  ```

## Finalize Step

- Format using `bun run fix`.
- Commit with "setup testing".
