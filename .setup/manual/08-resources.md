# Resources

## Setup Icons

- Add dependencies:
  ```bash
  bun add @iconify/react
  ```

### Add Example Page

- Add example for using the icons:
  - Add stub `app/examples/icons-page.tsx`.
  - Add some icons to it:
    - Import `import { Icon } from '@iconify/react';`
    - Add these icons to the page:
      ```tsx
      <Icon icon='cif:hr' width='500' height='300' />
      <Icon icon='mdi:linkedin' width='48' height='48' color='#0a66c2' />
      <Icon icon='mdi:github' width='48' height='48' color='#181717' />
      <Icon icon='mdi:stackoverflow' width='48' height='48' color='#f48024' />
      ```
- Remember to add route to `router.tsx` and link to `ExamplesPage`.

### Finalize Step

- Format using `bun run format`.
- Commit wuth "setup icons".
