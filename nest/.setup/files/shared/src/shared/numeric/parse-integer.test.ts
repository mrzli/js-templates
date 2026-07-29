import { describe, expect, it } from 'vitest';

import { parseIntegerOrThrow } from './parse-integer.js';

describe('parse-integer', () => {
  describe('parseIntegerOrThrow()', () => {
    describe('valid', () => {
      interface Example {
        readonly input: string;
        readonly expected: number;
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: '0',
          expected: 0,
        },
        {
          input: '1',
          expected: 1,
        },
        {
          input: '5',
          expected: 5,
        },
        {
          input: '55',
          expected: 55,
        },
        {
          input: '-1',
          expected: -1,
        },
        {
          input: '-55',
          expected: -55,
        },
      ];

      for (const example of EXAMPLES) {
        const description = JSON.stringify(example);
        it(description, () => {
          expect(parseIntegerOrThrow(example.input)).toEqual(example.expected);
        });
      }
    });

    describe('throws', () => {
      interface Example {
        readonly input: string;
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: '',
        },
        {
          input: ' ',
        },
        {
          input: 'a',
        },
        {
          input: '11a',
        },
        {
          input: '11.',
        },
        {
          input: '11.0',
        },
        {
          input: '11.1',
        },
        {
          input: 'a11',
        },
        {
          input: ' 11',
        },
        {
          input: '+1',
        },
        {
          input: {} as string,
        },
      ];

      for (const example of EXAMPLES) {
        const description = JSON.stringify(example);
        it(description, () => {
          expect(() => parseIntegerOrThrow(example.input)).toThrow('Value is not integer');
        });
      }
    });
  });
});
