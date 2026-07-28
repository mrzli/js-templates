# Styling

## Setup Tailwind

- Add dependencies:
  ```bash
  bun add -d tailwindcss @tailwindcss/vite
  ```

### Update `vite.config.ts`

- Add import: `import tailwindcss from '@tailwindcss/vite';`
- Add to plugins array: `tailwindcss()`

### Update `src/index.css`

- Add `@import 'tailwindcss';`

### Finalize Step

- Format using `bun run fix`.
- Commit with "setup tailwind".

## Setup Tailwind Merge

- Install dependencies:
  - `bun add clsx tailwind-merge`
- Create `src/util/` directory (if it doesn't exist):
- Create `styles.ts` file in it:

  ```ts
  import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';

  export const cn = (...inputs: readonly ClassValue[]): string => {
    return twMerge(clsx(...inputs));
  };
  ```

- Add to index file.

### Finalize Step

- Format using `bun run fix`.
- Commit with "setup tailwind merge utility".

## Setup Class Variance Authority

- Add dependencies:
  - `bun add class-variance-authority`

### Finalize Step

- Format using `bun run fix`.
- Commit with "setup class variance authority".
