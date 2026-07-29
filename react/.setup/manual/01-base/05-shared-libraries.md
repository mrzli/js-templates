# Shared Libraries

- This section will setup some general shared code, that will often be used by any project.

## Copy Files

- From root:

  ```bash
  cp -a .setup/files/shared/. .
  ```

## Install Dependencies

- Shared code that is part of personal libraries can be installed locally using `link:`.
- Example:

  ```bash
  bun add -D @mrzli-jslib/assert@link:@mrzli-jslib/assert
  ```

- Alternatively, simply add to `package.json` like the example below, then run `bun install`:

  ```json
  "dependencies": {
    // ...
    "@mrzli-jslib/assert": "link:@mrzli-jslib/assert"
    // ..
  }
  ```

### Finalize Step

- Format using `bun run fix`.
- Commit with "setup shared libraries".
