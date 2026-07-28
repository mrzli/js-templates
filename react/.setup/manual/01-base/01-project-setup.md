# Project Setup

## Clean Up Template Files

- Remove any invalid `.git` directory already present in repo root.

## Initialize Git Repository

- Do this only if necessary:
  - If the repo is not already a git repository.
  - Or if you previously removed the `.git`, and now want to reinitialize it.
- Run the following command to initialize a new git repository:
  ```bash
  git init
  ```

## Setup React + Vite Project

- Create a dir called `tmp/` inside repo root.
- Navigate into `tmp/`.
- Run script to create the project files:
  ```bash
  bun create vite <project-name> --template react-ts --no-interactive
  ```
- Navigate back to repo root.
- Copy newly created project files into repo root using:
  ```bash
  cp -a tmp/<project-name>/. .
  ```
- Remove the `tmp/` directory with:
  ```bash
  rm -rf tmp
  ```

### Finalize Step

- Commit with "initial project setup".

## Scripts

- Add the following script to `package.json`:

  ```json
  "scripts": {
    // other scripts...
    "preflight": "bun run build",
    "backport": "./.setup/backport.sh . ../../mrzli/js-templates/react"
  }
  ```

- `preflight` will be expanded later on to include other checks, such as linting, formatting and testing. This is why it is added here.
- For `backport`, adjust target path if necessary, to point to `js-templates` repo location, `react` directory.

### Finalize Step

- Commit with "add backport script".

## Basic Configuration Files

### Copy Setup Files

- From root:

  ```bash
  cp -a .setup/files/initial/. .
  ```

### Finalize Step

- Commit with "copy setup files".

## Install Dependencies

- Change `minimumReleasaseAge` in `bunfig.toml` if necessary.
- Install dependencies using `bun install`.

### Finalize Step

- Commit with "install dependencies".

## Setup Path Aliases

- This allows cleaner imports in the project, without having to use relative paths in some cases.

### Update `vite.config.ts`

- Resolve tsconfig paths (to avoid adding duplicated alias entries):
  ```ts
  // ...
  plugins: [/* ... */],
  resolve: {
    tsconfigPaths: true,
  },
  ```

### Add Path Aliases to `tsconfig.app.json`

- Add the following path aliases to `compilerOptions`:

  ```json
  "compilerOptions": {
    // other options...

    "paths": {
      "@/*": ["./src/*"]
    }
  }
  ```

### Finalize Step

- Commit with "setup path aliases".

## Other Dependencies

- Until Temporal becomes the default and supported by all browsers, install the polyfill:

  ```bash
  bun add @js-temporal/polyfill
  ```

### Finalize Step

- Commit with "install other dependencies".
