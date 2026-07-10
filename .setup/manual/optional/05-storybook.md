# Storybook

## Notes

- For reference, you can see what needs to be done by executing:
  ```bash
   bun create storybook@latest --features docs
  ```

## Add Dependencies

- Run:
  ```bash
  bun add -d \
    storybook \
    @storybook/react-vite \
    @storybook/addon-docs \
    @storybook/addon-themes
  ```

## Update `package.json`

- Add the following scripts:
  ```json
  "scripts": {
    // other scripts...
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "backport": "..."
  }
  ```

## Add Storybook Config Files

- Create `.storybook/` directory in the root of the project.

### `main.ts`

- Create `.storybook/main.ts` file with the following content:

  ```ts
  import type { StorybookConfig } from '@storybook/react-vite';

  const config: StorybookConfig = {
    stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-docs', '@storybook/addon-themes'],
    framework: '@storybook/react-vite',
  };

  export default config;
  ```

### `preview.ts`

- Create `.storybook/preview.ts`.
- You need to import `index.css` for Tailwind styles to work in Storybook.
  - This may cause an error, see next step for a fix.
- Add the following content:

  ```ts
  import '../src/index.css';

  import { withThemeByClassName } from '@storybook/addon-themes';
  import type { Preview, ReactRenderer } from '@storybook/react-vite';

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

### `tsconfig.json`

- Create `.storybook/tsconfig.json` with the following content:
  ```json
  {
    "extends": "../tsconfig.app.json",
    "include": ["./*.ts"]
  }
  ```
- If you import `index.css` in `preview.ts`, your editor may complain about that import. This `tsconfig.json` file will fix that issue.

## Update `tsconfig.app.json`

- Add `stories` to the `include` array:
  ```json
  "include": ["src", "stories"]
  ```

## Add Stories Directory

- Create `stories/` directory in the root of the project.

## Linting (Optional)

- TODO: Not tested.
- Optionally, you can add storybook linting.
- Add dependencies:

  ```bash
  bun add -d eslint-plugin-storybook
  ```

- Update `.oxlintrc.json` to include storybook plugin, add to object root:

  ```json
  {
    "jsPlugins": ["eslint-plugin-storybook"]
  }
  ```

## Finalize

- Format using `bun run fix`.
- Commit with "setup storybook".
