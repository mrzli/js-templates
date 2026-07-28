# Env

## Prerequisites

- You have to have routing set up.
- You need to have app context set up.
- You need to have examples pages structure set up.
- You have to have env variables set up.

## Example

- Create `examples/examples-app-env-page.tsx` file, with this content:

  ```tsx
  import type { ReactNode } from 'react';

  import { useAppContext } from '../../setup/app-context';

  export function ExamplesAppEnvPage(): ReactNode {
    const { env } = useAppContext();

    return <div>Example env variable: {env.exampleVar}</div>;
  }
  ```

## Routing

- In `router.tsx`, add entry under `ExamplesPage` `children`:

  ```tsx
  {
    path: 'app-env',
    element: <ExamplesAppEnvPage />,
  }
  ```

- Add link to `ExamplesPage` component:

  ```tsx
  <Link to='app-env'>App Env</Link>
  ```

## Finalize

- Format using `bun run fix`.
- Commit with "add env example".
