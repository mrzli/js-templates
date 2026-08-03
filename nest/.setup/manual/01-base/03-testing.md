# Testing

## Add Dependencies

- Add dependencies:

  ```bash
  pnpm add -D @nestjs/testing @swc/core unplugin-swc vitest
  ```

## Copy Files

- From root:

  ```bash
  cp -a .setup/files/test/. .
  ```

## Update `package.json`

- Add scripts:

  ```json
  "scripts": {
    // other scripts...
    "test": "vitest run",
    "test:unit": "vitest run --project unit",
    "test:integration": "vitest run --project integration",
    "test:e2e": "vitest run --project e2e",
    "backport": "..."
  }
  ```

## Finalize Step

- Format using `pnpm run fix`.
- Commit with "setup testing".
