# Raw Style

## Prerequisites

- You need to have routing set up.
- You need to have examples pages structure set up.

## Example

- Create `examples/examples-raw-style-page.tsx` file, with this content:

  ```tsx
  import type { CSSProperties, ReactNode } from 'react';

  import viteLogo from '/vite.svg';

  import reactLogo from '../assets/react.svg';

  const headerStyle: CSSProperties = {
    fontSize: '2rem',
    color: '#61dafb',
  };

  const bodyStyle: CSSProperties = {
    fontSize: '1rem',
    color: '#333',
  };

  export function ExamplesRawStylePage(): ReactNode {
    return (
      <div>
        <h1 style={headerStyle}>Header</h1>
        <p style={bodyStyle}>This is a body.</p>
      </div>
    );
  }
  ```

## Routing

- In `router.tsx`, add entry under `ExamplesPage` `children`:

  ```tsx
  {
    path: 'raw-style',
    element: <ExamplesRawStylePage />,
  }
  ```

- Add link to `ExamplesPage` component:

  ```tsx
  <Link to='raw-style'>Raw Style</Link>
  ```

## Finalize

- Format using `bun run fix`.
- Commit with "add raw style example".
