# Icon

## Prerequisites

- You need to have routing set up.
- You need to have examples pages structure set up.
- You need to have icons set up.

## Example

- Create `examples/examples-icon-page.tsx` file, with this content:

  ```tsx
  import type { ReactNode } from 'react';
  import { Icon } from '@iconify/react';

  export function ExamplesIconPage(): ReactNode {
    return (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Icon icon='cif:hr' width='120' height='72' />
        <Icon icon='mdi:linkedin' width='48' height='48' color='#0a66c2' />
        <Icon icon='mdi:github' width='48' height='48' color='#181717' />
        <Icon icon='mdi:stackoverflow' width='48' height='48' color='#f48024' />
      </div>
    );
  }
  ```

## Routing

- In `router.tsx`, add entry under `ExamplesPage` `children`:

  ```tsx
  {
    path: 'icon',
    element: <ExamplesIconPage />,
  }
  ```

- Add link to `ExamplesPage` component:

  ```tsx
  <Link to='icon'>Icon</Link>
  ```

## Finalize

- Format using `bun run fix`.
- Commit with "setup icon example".
