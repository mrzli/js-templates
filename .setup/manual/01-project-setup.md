# Project Setup

## Clean Up Template Files

- Remove any invalid `.git` directory already present in repo root.

## Initialize Git Repository

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

- Commit with "initial project setup with React + Vite".

## Backport

- Add the following script to `package.json`:
  ```json
  "scripts": {
    // other scripts...
    "backport": "./.setup/backport.sh . ../../templates/template-react"
  }
  ```
- Adjust target path if necessary, to point to `template-react` repo location.

### Finalize Step

- Commit with "add backport script".

## Basic Configuration Files

### Copy Setup Files

- Copy files from `.setup/files/` into project root using:
  ```bash
  cp -a .setup/files/. .
  ```

### Update `.gitignore`

- Add the following lines to `.gitignore`:
  ```
  tmp/
  ```

### Finalize Step

- Commit with "copy setup files".

## Install Dependencies

- Change `minimumReleasaseAge` in `bunfig.toml` if necessary.
- Install dependencies using `bun install`.

### Finalize Step

- Commit with "install dependencies".

## Setup Path Aliases

- Add dependecies:
  ```bash
  bun add -d vite-tsconfig-paths
  ```
- This allows you to avoid duplication of path aliases in both `tsconfig.json` and `vite.config.ts`.

### Update `vite.config.ts`

- Resolve tsconfig paths (to avoid adding duplicated alias entries):
  ```ts
  import tsconfigPaths from 'vite-tsconfig-paths';
  // ...
  plugins: [/* ... */, tsconfigPaths()],
  ```

### Add Path Aliases to `tsconfig.app.json`

- Add the following path aliases to `compilerOptions`:

  ```json
  "compilerOptions": {
    // other options...

    "paths": {
      "@/*": ["./src/*"],
      "@components": ["./src/app/components"],
      "@components/*": ["./src/app/components/*"]
    }
  }
  ```

### Finalize Step

- Commit with "setup path aliases".
