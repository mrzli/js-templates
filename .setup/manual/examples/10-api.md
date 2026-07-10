# API

## Prerequisites

- You have to have routing set up.
- You need to have examples pages structure set up.
- You need to have API set up.

## Example

- Create `examples/examples-api-page.tsx` file with this content:

  ```tsx
  import { useEffect, useState, type ReactNode } from 'react';

  import type { JsonPlaceholderPost } from '@/api';
  import { useAppContext } from '@/setup';

  export function ExamplesApiPage(): ReactNode {
    return (
      <div>
        <h1>API Examples</h1>
        <hr />
        <OfflineExampleSection />
        <hr />
        <JsonPlaceholderSection />
      </div>
    );
  }

  function OfflineExampleSection(): ReactNode {
    const { dependencies } = useAppContext();
    const [message, setMessage] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
      const controller = new AbortController();

      const fetchData = async () => {
        try {
          const result = await dependencies.api.example.offline({ signal: controller.signal });
          setMessage(result);
          setError(undefined);
        } catch (err) {
          if (err instanceof Error && err.name !== 'AbortError') {
            setError(err.message);
          }
        }
      };

      fetchData();

      return () => {
        controller.abort();
      };
    }, [dependencies.api.example]);

    return (
      <div>
        <h2>Mocked API with timeout</h2>
        <OfflineContent message={message} error={error} />
      </div>
    );
  }

  function OfflineContent({
    message,
    error,
  }: {
    message: string | undefined;
    error: string | undefined;
  }): ReactNode {
    if (error) {
      return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    if (message === undefined) {
      return <p>Loading timeout example...</p>;
    }

    return <p>{message}</p>;
  }

  function JsonPlaceholderSection(): ReactNode {
    const { dependencies } = useAppContext();
    const [post, setPost] = useState<JsonPlaceholderPost | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
      const controller = new AbortController();

      const fetchData = async () => {
        try {
          const result = await dependencies.api.example.jsonPlaceholder(1, {
            signal: controller.signal,
          });
          setPost(result);
          setError(undefined);
        } catch (err) {
          if (err instanceof Error && err.name !== 'AbortError') {
            setError(err.message);
          }
        }
      };

      fetchData();

      return () => {
        controller.abort();
      };
    }, [dependencies.api.example]);

    return (
      <div>
        <h2>JSONPlaceholder Fetch</h2>
        <JsonPlaceholderContent post={post} error={error} />
      </div>
    );
  }

  function JsonPlaceholderContent({
    post,
    error,
  }: {
    post: JsonPlaceholderPost | undefined;
    error: string | undefined;
  }): ReactNode {
    if (error) {
      return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    if (post === undefined) {
      return <p>Loading JSONPlaceholder post...</p>;
    }

    return (
      <pre style={{ background: '#f4f4f4', padding: '16px', overflow: 'auto' }}>
        {JSON.stringify(post, undefined, 2)}
      </pre>
    );
  }
  ```

## Routing

- In `router.tsx`, add entry under `ExamplesPage` `children`:

  ```tsx
  {
    path: 'api',
    element: <ExamplesApiPage />,
  },
  ```

- Add link to `ExamplesPage` component:

  ```tsx
  <Link to='api'>API</Link>
  ```

## Finalize

- Format using `bun run fix`.
- Commit with "add api example".
