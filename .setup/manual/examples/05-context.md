### Add Context Example File

- Call it `context-page.tsx`, under examples directory.
- Have it display the `appName` from the context.
- Example:

  ```tsx
  // ...

  export function ContextPage(): ReactNode {
    const { appName } = useAppContext();

    return <div>App name from context: {appName}</div>;
  }
  ```

### Finalize Step

- Format using `bun run fix`.
- Commit with "add context example".
