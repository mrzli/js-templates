# Tailwind

## Prerequisites

- You need to have routing set up.
- You need to have examples pages structure set up.
- You need to have Tailwind set up.

## Example

- Create `examples/examples-tailwind-page.tsx` file, with this content:

  ```tsx
  import type { ReactNode } from 'react';

  export function ExamplesTailwindPage(): ReactNode {
    return (
      <div className='mt-4 rounded-lg bg-orange-200 px-4 py-3 text-2xl text-blue-500'>
        examples-tailwind-page
      </div>
    );
  }
  ```

## Routing

- In `router.tsx`, add entry under `ExamplesPage` `children`:

  ```tsx
  {
    path: 'tailwind',
    element: <ExamplesTailwindPage />,
  }
  ```

- Add link to `ExamplesPage` component:

  ```tsx
  <Link to='tailwind'>Tailwind</Link>
  ```

## Finalize

- Format using `bun run fix`.
- Commit with "setup tailwind example".
