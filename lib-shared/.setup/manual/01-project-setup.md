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

## Setup Library Project

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
  bun create tsdown@latest
  # Enter some project name when prompted, e.g., `my-project`.
  # Select 'Default' template.
  ```

- After you are done with it, remove the `tmp/` directory:
  - Navigate back to repo root.
  - Execute the following command:

    ```bash
    rm -rf tmp
    ```

### Update `package.json`

- Update placeholders in:
  - `name`.
  - `description`.
  - `homepage`.
  - `repository.url`.
  - `bugs.url`.

### Install Dependencies

- Install development dependencies:

  ```bash
  bun add -D tsdown typescript
  ```

### Finalize Step

- Commit with "initial project setup".

## Scripts

### Backport

- Do not add `backport` script, so that you do not pollute the library project.
- However use the following command to `backport` changes to `js-templates` repo, if you have the `.setup` directory in the library project and you want to use it to update the `js-templates` repo:


  ```bash
  ./.setup/backport.sh . ../../mrzli/js-templates/lib-shared
  ```
