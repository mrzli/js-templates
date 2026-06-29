# Examples Pages

## Prerequisites

- You need to have routing set up.

## Create Pages Structure for Examples

- This section will provide the structure for files and comoponents showcasing the features described in subsequent steps.
- Create `src/app/examples/` directory if it does not already exist.

### Stub Page Structure

- Nothing to do here, this is just for reference for future steps.
- This is the structure of any new page where no content was defined:
- Component name should be in `PascalCase` of the file name.
- Content should be a single `div`, with the `kebab-case` of the file name as its text content.
- Example for a file named `some-page.tsx`:

  ```tsx
  import type { ReactNode } from 'react';

  export function SomePage(): ReactNode {
    return <div>some-page</div>;
  }
  ```

### Examples Directory Structure

- Nothing to do here, this is just for reference for future steps.
- This is the final structure of pages you will have after following all the steps in this section:

  ```
  src/
  └── app/
      ├── examples/
      │   ├── examples-home-page.tsx
      │   └── examples-page.tsx
      ├── app.tsx
      └── home-page.tsx
  ```

### Create Page Stubs

- Create stub pages for:
  - `examples-home-page.tsx`.
  - `examples-page.tsx`.

### Update `router.tsx`

- Add the hierarchy of example components to the router configuration:

  ```tsx
    {
    path: '/',
    element: <App />,
    children: [
      // other children
      {
        path: 'examples',
        element: <ExamplesPage />,
        children: [
          {
            index: true,
            element: <ExamplesHomePage />,
          },
        ],
      },
    ]
  }
  ```

### Update Examples Page Component

- Update `examples/examples-page.tsx` component to enable routing:

  ```tsx
  import type { ReactNode } from 'react';
  import { Link, Outlet } from 'react-router';

  export function ExamplesPage(): ReactNode {
    return (
      <div>
        <nav>
          <Link to=''>Home</Link>
        </nav>
        <Outlet />
      </div>
    );
  }
  ```

### Finalize Step

- Format using `bun run fix`.
- Commit with "create examples pages structure".
