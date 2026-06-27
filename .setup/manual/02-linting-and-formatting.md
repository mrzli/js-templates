# Linting and Formatting

## Setup Linting and Formatting

- Install missing dependencies:
  ```bash
  bun add -d oxfmt
  ```

### Update `package.json`

- Remove any existing `lint` and `format` scripts.
- Add the following scripts:
  ```json
  "scripts": {
    // other scripts...
    "fmt": "oxfmt",
    "fmt:check": "oxfmt --check",
    "lint": "oxlint",
    "lint:fix": "oxlint --fix",
    "fix": "bun run fmt && bun run lint:fix",
    "check": "bun run fmt:check && bun run lint",
    "backport": "..."
  }
  ```

### Update Lint Config File

- This refers to `.oxlintrc.json`.
- Update `"plugins"` so it looks like this:
  ```json
  "plugins": ["react", "typescript", "oxc", "unicorn", "eslint", "import", "promise", "vitest"],
  ```

### Finalize Step

- Commit with "setup linting and formatting".

## Format Project Files

- Do the initial formatting of project files with `bun run fix`.

### Finalize Step

- Commit with "format project files".
