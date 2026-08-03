# Database

## Add PostgreSQL

### Copy Files

- From root:

  ```bash
  cp -a .setup/files/database/. .
  ```

### Update `package.json`

- Add scripts:

  ```json
  "scripts": {
    // other scripts...
    "db:start": "docker compose -f db/compose.yml up -d --wait",
    "db:stop": "docker compose -f db/compose.yml down",
    "db:logs": "docker compose -f db/compose.yml logs -f postgres"
  }
  ```

### Finalize Step

- Format using `pnpm run fix`.
- Commit with "setup database".
