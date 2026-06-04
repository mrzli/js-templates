# Storybook

## Notes

- For reference, you can see what needs to be done by executing:
  ```bash
   bun create storybook@latest --features docs
  ```

## Setup Storybook

- Add dependencies:
  ```bash
  bun add -d \
    storybook \
    @storybook/react-vite \
    @storybook/addon-docs \
    @storybook/addon-themes \
    eslint-plugin-storybook
  ```

### Update `package.json`

- Add the following scripts:
  ```json
  "scripts": {
    // other scripts...
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "backport": "..."
  }
  ```

### Update Configurations

- This refers to `eslint.config.js`.
- Add required import and config:
  ```js
  // ...
  import storybook from 'eslint-plugin-storybook';
  // ...

  export default defineConfig([
    // other configs...
    ...storybook.configs['flat/recommended'],
  ]);
  ```

### Add Storybook Config Files

- Create `.storybook/` directory in the root of the project.

#### `main.ts`

- Create `.storybook/main.ts` file with the following content:
  ```ts
  import type { StorybookConfig } from '@storybook/react-vite';

  const config: StorybookConfig = {
    stories: [
      '../stories/**/*.mdx',
      '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],
    addons: ['@storybook/addon-docs', '@storybook/addon-themes'],
    framework: '@storybook/react-vite',
  };

  export default config;
  ```

#### `preview.ts`

- Create `.storybook/preview.ts`.
- You need to import `index.css` for Tailwind styles to work in Storybook.
- Add the following content:
  ```ts
  import '../src/index.css';

  import type { Preview, ReactRenderer } from '@storybook/react-vite';
  import { withThemeByClassName } from '@storybook/addon-themes';

  const preview: Preview = {
    decorators: [
      withThemeByClassName<ReactRenderer>({
        themes: {
          light: '',
          dark: 'dark',
        },
        defaultTheme: 'dark',
      }),
    ],
    parameters: {
      actions: {
        argTypesRegex: '^on.*',
      },
      controls: {
        matchers: {
          color: /(background|color)$/i,
          date: /Date$/i,
        },
      },
    },
  };

  export default preview;
  ```
- The above should handle:
  - Theming with Tailwind's `dark` class.
  - Automatically matching action handlers (e.g., `onClick`).
  - Automatically matching color and date controls (this was here by default when storybook preview file was generated).

#### `tsconfig.json`

- Create `.storybook/tsconfig.json` with the following content:
  ```json
  {
    "extends": "../tsconfig.app.json",
    "include": ["./*.ts"]
  }
  ```
- If you import `index.css` in `preview.ts`, your editor may complain about that import. This `tsconfig.json` file will fix that issue.

### Add Example Stories

- Create `stories/example/` directory in the root of the project.
- Create file `example-button.stories.tsx` with the following content:
  ```tsx
  import type { Meta, StoryObj } from '@storybook/react-vite';
  import type { CSSProperties, FC } from 'react';
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

  const ExampleButton: FC<ExampleButtonProps> = ({ label, onClick }) => {
    return (
      <button type='button' style={buttonStyle} onClick={onClick}>
        {label}
      </button>
    );
  };

  const meta = {
    component: ExampleButton,
  } satisfies Meta<typeof ExampleButton>;

  export default meta;

  type Story = StoryObj<typeof meta>;

  export const Primary: Story = {
    args: {
      label: 'Click Me',
      onClick: fn(),
    },
  };
  ```
- Alternatively, for better and simpler styles, use tailwind:
  ```tsh
  // ...
  className='cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none'
  // ...
  ```

### Finalize Step

- Format using `bun run format`.
- Commit with "setup storybook".
