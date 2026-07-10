# Context

## Prerequisites

- You need to have routing set up.
- You need to have examples pages structure set up.
- You need to have app context set up.

## Example

- Create `examples/examples-app-context-page.tsx` file, with this content:

  ```tsx
  import type { ReactNode } from 'react';

  import { useAppContext } from '../../setup/app-context';

  export function ExamplesAppContextPage(): ReactNode {
    const { appName } = useAppContext();

    return <div>App name from context: {appName}</div>;
  }
  ```

## Routing

- In `router.tsx`, add entry under `ExamplesPage` `children`:

  ```tsx
  {
    path: 'app-context',
    element: <ExamplesAppContextPage />,
  }
  ```

- Add link to `ExamplesPage` component:

  ```tsx
  <Link to='app-context'>App Context</Link>
  ```

## Finalize

- Format using `bun run fix`.
- Commit with "add context example".
