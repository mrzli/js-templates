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

- Add scripts:

  ```json
  "scripts": {
    // other scripts...
    "test": "vitest"
  }
  ```

## Finalize Step

- Format using `bun run fix`.
- Commit with "setup testing".
