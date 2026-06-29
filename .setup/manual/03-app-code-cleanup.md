# App Code Cleanup

## Clean Up Basic App Code

### CSS Updates

- Keep `index.css` file, but delete all its content.
- Remove all other CSS files and their imports.

### Clean Up Images

- Remove all images from `src/assets/` and `public/` directories.
  - Alternatively, keep some if you want to create example page for images.
  - See [images.md](./examples/images.md) for more information.

### Create `app` Directory

- Create `src/app/` directory if it does not already exist.

### Create Stub Home Page

- Create `home-page.tsx` file under `src/app/` directory.
- Add stub content to it:

  ```tsx
  import type { ReactNode } from 'react';

  export function HomePage(): ReactNode {
    return <div>home-page</div>;
  }
  ```

### Update `App.tsx`

- Rename to `app.tsx` (uncapitalize) and move to `src/app/` directory.
- Have it have a simple content displaying the `HomePage` component:

  ```tsx
  import type { ReactNode } from 'react';

  import { HomePage } from './home-page';

  export function App(): ReactNode {
    return (
      <div>
        <HomePage />
      </div>
    );
  }
  ```

### Update `main.tsx`

- Update `main.tsx` to import the `App` component from its new location.

  ```tsx
  import { App } from './app/app';
  ```

### Finalize Step

- Format using `bun run fix`.
- Commit with "cleanup basic app code".

## Create Basic App Setup Structure

- Create `src/setup/` directory if it does not already exist.

### Create `run.tsx` File

- Create `run.tsx` file under `src/setup/` directory.
- Move the logic from `src/main.tsx` to `src/setup/run.tsx`.
- Create an async function called `run` that contains the logic.
- Make it look something like this:

  ```tsx
  import { StrictMode } from 'react';
  import { createRoot } from 'react-dom/client';

  import { App } from '../app/app';

  export async function run(): Promise<void> {
    const root = document.getElementById('root');

    if (!root) {
      throw new Error('Root element not found');
    }

    const content = (
      <StrictMode>
        <App />
      </StrictMode>
    );

    createRoot(root).render(content);
  }
  ```

### Create `index.ts` File

- Create `index.ts` file under `src/setup/` directory.
- Export everything from `run.tsx` in that file.

### Update `main.tsx`

- It should retain import for `index.css`.
- Other than that, it should only import and execute the `run` function.
- It should look like this:

  ```tsx
  import './index.css';
  import { run } from './setup';

  run();
  ```

### Finalize Step

- Format using `bun run fix`.
- Commit with "create basic app setup structure".
