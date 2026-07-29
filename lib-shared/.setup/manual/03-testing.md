# Testing

## Add Dependencies

- Add dependencies:

  ```bash
  bun add -D vitest
  ```

## Copy Files

- From root:

  ```bash
  cp -a .setup/files/test/. .
  ```

## Update `package.json`

- Add the following scripts (and update `preflight` script):

  ```json
  "scripts": {
    // other scripts...
    "test": "vitest run",
    "preflight": "bun run typecheck && bun run check && bun run test && bun run build",
    "prepare": "..."
  }
  ```

## Finalize Step

- Format using `bun run fix`.
- Commit with "setup testing".
