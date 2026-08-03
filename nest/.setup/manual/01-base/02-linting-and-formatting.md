# Linting and Formatting

## Setup Linting and Formatting

- Install missing dependencies:
  ```bash
  pnpm add -D oxfmt oxlint
  ```

### Update `package.json`

- Add these scripts:

  ```json
  "scripts": {
    // other scripts...
    "fmt": "oxfmt",
    "fmt:check": "oxfmt --check",
    "lint": "oxlint",
    "lint:fix": "oxlint --fix",
    "fix": "pnpm run fmt && pnpm run lint:fix",
    "check": "pnpm run fmt:check && pnpm run lint",
    "backport": "..."
  }
  ```

### Finalize Step

- Commit with "setup linting and formatting".

## Format Project Files

- Do the initial formatting of project files with `pnpm run fix`.

### Finalize Step

- Commit with "format project files".
