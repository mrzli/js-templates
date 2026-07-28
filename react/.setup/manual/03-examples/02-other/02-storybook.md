# Storybook

## Prerequisites

- You need to have storybook set up.

## Example

- Create `stories/example/` directory in the root of the project.

### Create `example-button.stories.tsx`

- In `stories/example/` directory, with content:

  ```tsx
  import type { Meta, StoryObj } from '@storybook/react-vite';
  import type { CSSProperties, ReactNode } from 'react';
  import { fn } from 'storybook/test';

  interface ExampleButtonProps {
    readonly label: string;
    readonly onClick?: () => void;
  }

  const buttonStyle: CSSProperties = {
    cursor: 'pointer',
    border: 'none',
    borderRadius: '0.25rem',
    backgroundColor: '#3b82f6',
    padding: '0.5rem 1rem',
    color: '#ffffff',
  };

  function ExampleButton({ label, onClick }: ExampleButtonProps): ReactNode {
    return (
      <button type='button' style={buttonStyle} onClick={onClick}>
        {label}
      </button>
    );
  }

  const meta = {
    component: ExampleButton,
  } satisfies Meta<typeof ExampleButton>;

  export default meta;

  type Story = StoryObj<typeof meta>;

  export const Default: Story = {
    args: {
      label: 'Click Me',
      onClick: fn(),
    },
  };
  ```

- Alternatively, for better and simpler styles, use tailwind:
  ```tsx
  // ...
  <button className='cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none' {/* ... */}>
    {/* ... */}
  </button>
  // ...
  ```

## Finalize

- Format using `bun run fix`.
- Commit with "add storybook example".
