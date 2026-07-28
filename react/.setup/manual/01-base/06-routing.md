# Routing

## Setup Routing

- Add react-router dependency with:
  ```bash
  bun add react-router
  ```

### Create Router File

- Create `src/routing/` directory if it does not already exist.

#### Create `router.tsx` File

- Use 'data mode' routing.
- Initially, create an empty router file:

  ```tsx
  import { createBrowserRouter } from 'react-router';

  export const router = createBrowserRouter([]);
  ```

- Add the hierarchy of components to the router configuration.
- Use `index` routes for default subpages.
- This is the structure:

  ```tsx
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ]
  }
  ```

#### Create `index.ts` File

- Export all from `router.tsx`.

### Use Router in the Application

- Update the file that renders the app (`setup/run.tsx` or wherever else you placed it).
- Add imports:
  ```tsx
  import { RouterProvider } from 'react-router';
  import { router } from '../routing';
  ```
- Replace `<App />` with:
  ```tsx
  <RouterProvider router={router} />
  ```
- Remove import for `App` component, since it is now rendered through the router.

### Update `HomePage` Component

- Add imports:

  ```tsx
  import { Link, Outlet } from 'react-router';
  ```

- Add content inside `div` - link(s) and `<Outlet />` for rendering child routes:
  ```tsx
  <nav>
    <Link to=''>Home</Link>
  </nav>
  <Outlet />
  ```

### Finalize Step

- Format using `bun run fix`.
- Commit with "setup basic routing".
