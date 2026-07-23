# Image

## Prerequisites

- You need to have routing set up.
- You need to have examples pages structure set up.
- You need to have some images in `public` and `src/assets` directories.

## Notes

- Images in `public/` are imported by starting the path with `/`, where the subsequent path is relative to `public/`.
- Images in `src/assets/` should be imported as modules, usually using a relative path.

## Example

- Below is an example if you have:
  - `vite.svg` in `public/`.
  - `react.svg` in `src/assets/`.
- Create `examples/examples-image-page.tsx` file, with this content:

  ```tsx
  import type { CSSProperties, ReactNode } from 'react';

  import viteLogo from '/vite.svg';

  import reactLogo from '../../assets/react.svg';

  export function ExamplesImagePage(): ReactNode {
    return (
      <div style='display: flex; gap: 1rem; margin-top: 1rem;'>
        <img alt='Vite logo' src={viteLogo} style='height: 4rem;' />
        <img alt='React logo' src={reactLogo} style='height: 4rem;' />
      </div>
    );
  }
  ```

## Routing

- In `router.tsx`, add entry under `ExamplesPage` `children`:

  ```tsx
  {
    path: 'image',
    element: <ExamplesImagePage />,
  }
  ```

- Add link to `ExamplesPage` component:

  ```tsx
  <Link to='image'>Image</Link>
  ```

## Finalize

- Format using `bun run fix`.
- Commit with "add image example".
