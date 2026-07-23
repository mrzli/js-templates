# Testing

## Prerequisites

- You need to have testing set up.

## Example

- Create `tests/example/` directory in the root of the project.

### Create `example-add.test.tsx`

- In `tests/example/` directory, with content:

  ```tsx
  import { describe, expect, it } from 'vitest';

  function add(a: number, b: number): number {
    return a + b;
  }

  describe('(example) add', () => {
    it('adds two numbers correctly', () => {
      expect(add(2, 3)).toBe(5);
    });

    describe('(example) list of tests', () => {
      interface Example {
        readonly input: {
          readonly a: number;
          readonly b: number;
        };
        readonly expected: number;
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: {
            a: 2,
            b: 3,
          },
          expected: 5,
        },
        {
          input: {
            a: -1,
            b: 1,
          },
          expected: 0,
        },
      ];

      for (const example of EXAMPLES) {
        const description = JSON.stringify(example);
        it(description, () => {
          const { a, b } = example.input;
          const actual = add(a, b);
          expect(actual).toEqual(example.expected);
        });
      }
    });
  });
  ```

## Finalize

- Format using `bun run fix`.
- Commit with "add testing example".
