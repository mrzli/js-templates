# Styling

## Setup Tailwind

- Add dependencies:
  ```bash
  bun add -d tailwindcss @tailwindcss/vite prettier-plugin-tailwindcss
  ```

### Update Configurations

- Update prettier config, add the plugin:
  ```json
  "plugins": ["prettier-plugin-tailwindcss"]
  ```
- Update `vite.config.ts`:
  - Add import: `import tailwindcss from '@tailwindcss/vite';`
  - Add to plugins array: `tailwindcss()`

### Add Tailwind to the Project 

- Update `index.css`:
  - Add `@import 'tailwindcss';`

### Add Tailwind Example Page

- Add example for tailwind usage:
  - Add stub `app/examples/tailwind-page.tsx`.
  - Add some tailwind classes to the `div`, for example: `text-2xl text-blue-500 bg-orange-200`.
- Remember to add route to `router.tsx` and link to `ExamplesPage`.

### Finalize Step

- Format using `bun run format`.
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

- Format using `bun run format`.
- Commit with "setup tailwind merge utility".

## Setup Class Variance Authority

- Add dependencies:
  - `bun add class-variance-authority`

### Finalize Step

- Format using `bun run format`.
- Commit with "setup class variance authority".
