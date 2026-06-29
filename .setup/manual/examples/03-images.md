# Images

## Prerequisites

- You need to have routing set up.
- You need to have examples pages structure set up.
- You need to have some images in `public` and `src/assets` directories.

## Importing images

- Nothing to do here, this is just for reference for future steps.
- Images in `public/` are imported by starting the path with `/`, where the subsequent path is relative to `public/`.
- Images in `src/assets/` should be imported as modules, usually using a relative path.

## Images Example

- Below is an example if you have:
  - `vite.svg` in `public/`.
  - `react.svg` in `src/assets/`.
- Create `examples/examples-images-page.tsx` file, with this content:

  ```tsx
  import type { CSSProperties, ReactNode } from 'react';

  import viteLogo from '/vite.svg';

  import reactLogo from '../../assets/react.svg';

  export function ExamplesImagesPage(): ReactNode {
    return (
      <div style='display: flex; gap: 1rem; margin-top: 1rem;'>
        <img alt='Vite logo' src={viteLogo} style='height: 4rem;' />
        <img alt='React logo' src={reactLogo} style='height: 4rem;' />
      </div>
    );
  }
  ```

## Update

## Finalize Step

- Format using `bun run fix`.
- Commit with "add images example".
