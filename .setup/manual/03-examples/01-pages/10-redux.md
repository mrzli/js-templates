# Redux

## Prerequisites

- You have to have routing set up.
- You need to have examples pages structure set up.
- You need to have redux set up.

## Example

- Create `examples/examples-redux-page.tsx` file with this content:

  ```tsx
  import type { ReactNode } from 'react';

  import {
    selectExample,
    selectExampleLastUpdatedAt,
    selectExampleValue,
    useAppDispatch,
    useAppSelector,
    actionExampleChange,
    actionExampleReset,
  } from '@/store';

  export function ExamplesReduxPage(): ReactNode {
    const dispatch = useAppDispatch();
    const exampleState = useAppSelector(selectExample);
    const value = useAppSelector(selectExampleValue);
    const lastUpdatedAt = useAppSelector(selectExampleLastUpdatedAt);

    return (
      <div>
        <h1>Redux Examples</h1>
        <p>This page reads and updates the strongly typed example slice from the Redux store.</p>
        <p>Current value: {value}</p>
        <p>Last updated: {lastUpdatedAt ?? 'Never'}</p>
        <div>
          <button
            type='button'
            onClick={() => {
              dispatch(actionExampleChange(-1));
            }}
          >
            -1
          </button>
          <button
            type='button'
            onClick={() => {
              dispatch(actionExampleReset());
            }}
          >
            reset
          </button>
          <button
            type='button'
            onClick={() => {
              dispatch(actionExampleChange(1));
            }}
          >
            +1
          </button>
        </div>
        <pre style={{ background: '#f4f4f4', padding: '16px', overflow: 'auto' }}>
          {JSON.stringify(exampleState, undefined, 2)}
        </pre>
      </div>
    );
  }
  ```

## Routing

- In `router.tsx`, add entry under `ExamplesPage` `children`:

  ```tsx
  {
    path: 'redux',
    element: <ExamplesReduxPage />,
  },
  ```

- Add link to `ExamplesPage` component:

  ```tsx
  <Link to='redux'>Redux</Link>
  ```

## Finalize

- Format using `bun run fix`.
- Commit with "add redux example".
