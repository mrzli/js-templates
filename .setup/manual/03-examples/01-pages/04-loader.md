# Loader

## Prerequisites

- You need to have routing set up.
- You need to have examples pages structure set up.

## Example

- Create `examples/loader/` directory.
- Add `examples/loader/loader.ts` file:

  ```ts
  export async function loader(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolved data');
      }, 200);
    });
  }
  ```

### Use Loader

- Add `examples/loader/examples-loader-page.tsx` file:

  ```tsx
  import type { ReactNode } from 'react';
  import { useLoaderData } from 'react-router';

  import { loader } from './loader';

  export function ExamplesLoaderPage(): ReactNode {
    const data = useLoaderData<typeof loader>();

    return (
      <div>
        <div>examples-loader-page</div>
        <div>{data}</div>
      </div>
    );
  }
  ```

## Routing

- In `router.tsx`, add entry under `ExamplesPage` `children`:

  ```tsx
  {
    path: 'loader',
    element: <ExamplesLoaderPage />,
    loader: loader,
  }
  ```

- Add link to `ExamplesPage` component:

  ```tsx
  <Link to='loader'>Loader</Link>
  ```

## Finalize

- Format using `bun run fix`.
- Commit with "add loader example".
