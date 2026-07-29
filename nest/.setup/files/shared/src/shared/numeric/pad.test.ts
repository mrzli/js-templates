import { describe, expect, it } from 'vitest';

import { padNonNegativeIntWithZeroes } from './pad.js';

describe('pad', () => {
  describe('padNonNegativeIntWithZeroes()', () => {
    describe('valid', () => {
      interface Example {
        readonly input: {
          readonly value: number;
          readonly maxLength: number;
        };
        readonly expected: string;
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: {
            value: 1,
            maxLength: 3,
          },
          expected: '001',
        },
        {
          input: {
            value: 1,
            maxLength: 4,
          },
          expected: '0001',
        },
        {
          input: {
            value: 10,
            maxLength: 3,
          },
          expected: '010',
        },
        {
          input: {
            value: 2111,
            maxLength: 3,
          },
          expected: '2111',
        },
        {
          input: {
            value: 0,
            maxLength: 3,
          },
          expected: '000',
        },
      ];

      for (const example of EXAMPLES) {
        const description = JSON.stringify(example);
        it(description, () => {
          expect(padNonNegativeIntWithZeroes(example.input.value, example.input.maxLength)).toEqual(
            example.expected,
          );
        });
      }
    });

    describe('throws', () => {
      interface Example {
        readonly input: {
          readonly value: number;
          readonly maxLength: number;
        };
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: {
            value: -1,
            maxLength: 3,
          },
        },
        {
          input: {
            value: 1.2,
            maxLength: 3,
          },
        },
        {
          input: {
            value: 1,
            maxLength: 0,
          },
        },
        {
          input: {
            value: 1,
            maxLength: -1,
          },
        },
        {
          input: {
            value: 1,
            maxLength: 5.2,
          },
        },
      ];

      for (const example of EXAMPLES) {
        const description = JSON.stringify(example);
        it(description, () => {
          expect(() =>
            padNonNegativeIntWithZeroes(example.input.value, example.input.maxLength),
          ).toThrow('must be');
        });
      }
    });
  });
});
