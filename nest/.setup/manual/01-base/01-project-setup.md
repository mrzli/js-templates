# Setup

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

## Setup NestJS Project

### Copy Setup Files

- From root:

  ```bash
  cp -a .setup/files/initial/. .
  ```

### For Reference

- Create a dir called `tmp/` inside repo root.
- Navigate into `tmp/`.
- Run script to create the project files:

  ```bash
  pnpm dlx @nestjs/cli new <project-name> \
    --package-manager pnpm \
    --strict \
    --skip-install \
    --skip-git
  ```

- After you are done with it, remove the `tmp/` directory:
  - Navigate back to repo root.
  - Execute the following command:

    ```bash
    rm -rf tmp
    ```

### Update `package.json`

- Replace `<project-name>` with your desired project name.

### Install Dependencies

- Install runtime dependencies:

  ```bash
  pnpm add @nestjs/common @nestjs/core @nestjs/platform-express reflect-metadata rxjs
  ```

- Install development dependencies:

  ```bash
  pnpm add -D @nestjs/cli @nestjs/schematics @types/node typescript@6
  ```

- TODO Until `typescript` `7.1` is released, use `typescript@6` because NestJS needs some APIs that are not available in `7.0`.

### Finalize Step

- Commit with "initial project setup".

## Scripts

- Add the following script to `package.json`:

  ```json
  "scripts": {
    // other scripts...
    "backport": "./.setup/backport.sh . ../../mrzli/js-templates/nest"
  }
  ```

- For `backport`, adjust target path if necessary, to point to `js-templates` repo location, `react` directory.

### Finalize Step

- Commit with "add backport script".
