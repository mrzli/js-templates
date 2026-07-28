# Linting and Formatting

## Setup Linting and Formatting

- Install missing dependencies:
  ```bash
  bun add -D oxfmt oxlint
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
    "fix": "bun run fmt && bun run lint:fix",
    "check": "bun run fmt:check && bun run lint"
  }
  ```

### Finalize Step

- Commit with "setup linting and formatting".

## Format Project Files

- Do the initial formatting of project files with `bun run fix`.

### Finalize Step

- Commit with "format project files".
