# Redux Observable

## Prerequisites

- You have to have routing set up.
- You need to have examples pages structure set up.
- You need to have redux set up.
- You need to have redux observable set up.

## Example

- Create `examples/examples-redux-observable-page.tsx` file with this content:

  ```tsx
  import type { ReactNode } from 'react';

  import type { JsonPlaceholderPost } from '@/domain/types';
  import {
    actionExampleGetJsonPlaceholder,
    selectExampleJsonPlaceholderLoading,
    selectExampleJsonPlaceholderData,
    selectExampleJsonPlaceholderError,
    useAppDispatch,
    useAppSelector,
  } from '@/store';

  export function ExamplesReduxObservablePage(): ReactNode {
    const dispatch = useAppDispatch();
    const jsonPlaceholderLoading = useAppSelector(selectExampleJsonPlaceholderLoading);
    const jsonPlaceholderData = useAppSelector(selectExampleJsonPlaceholderData);
    const jsonPlaceholderError = useAppSelector(selectExampleJsonPlaceholderError);

    return (
      <div>
        <h1>Redux Observable Examples</h1>
        <div>
          <button
            type='button'
            onClick={() => {
              dispatch(actionExampleGetJsonPlaceholder(1));
            }}
          >
            Load post 1
          </button>
          <button
            type='button'
            onClick={() => {
              dispatch(actionExampleGetJsonPlaceholder(2));
            }}
          >
            Load post 2
          </button>
        </div>
        <JsonPlaceholderContent
          jsonPlaceholderLoading={jsonPlaceholderLoading}
          jsonPlaceholderData={jsonPlaceholderData}
          jsonPlaceholderError={jsonPlaceholderError}
        />
      </div>
    );
  }

  interface JsonPlaceholderContentProps {
    readonly jsonPlaceholderLoading: boolean;
    readonly jsonPlaceholderData: JsonPlaceholderPost | undefined;
    readonly jsonPlaceholderError: string | undefined;
  }

  function JsonPlaceholderContent({
    jsonPlaceholderLoading,
    jsonPlaceholderData,
    jsonPlaceholderError,
  }: JsonPlaceholderContentProps): ReactNode {
    if (jsonPlaceholderLoading) {
      return <p>Loading...</p>;
    }

    if (jsonPlaceholderError) {
      return <p style={{ color: 'red' }}>Error: {jsonPlaceholderError}</p>;
    }

    if (jsonPlaceholderData) {
      return (
        <pre style={{ background: '#f4f4f4', padding: '16px', overflow: 'auto' }}>
          {JSON.stringify(jsonPlaceholderData, undefined, 2)}
        </pre>
      );
    }

    return <p>No data loaded yet. Click a button above to load a post.</p>;
  }
  ```

## Routing

- In `router.tsx`, add entry under `ExamplesPage` `children`:

  ```tsx
  {
    path: 'redux-observable',
    element: <ExamplesReduxObservablePage />,
  },
  ```

- Add link to `ExamplesPage` component:

  ```tsx
  <Link to='redux-observable'>Redux Observable</Link>
  ```

## Finalize

- Format using `bun run fix`.
- Commit with "add redux observable example".
