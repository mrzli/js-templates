import { describe, expect, it } from 'vitest';

import { round } from './round.js';

describe('round', () => {
  describe('round()', () => {
    interface Example {
      readonly input: {
        readonly value: number;
        readonly precision: number;
      };
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: 0,
          precision: 0,
        },
        expected: 0,
      },
      {
        input: {
          value: 1,
          precision: 0,
        },
        expected: 1,
      },
      {
        input: {
          value: 0.1,
          precision: 0,
        },
        expected: 0,
      },
      {
        input: {
          value: 0.5,
          precision: 0,
        },
        expected: 1,
      },
      {
        input: {
          value: 1.234,
          precision: 0,
        },
        expected: 1,
      },
      {
        input: {
          value: 1.234,
          precision: 1,
        },
        expected: 1.2,
      },
      {
        input: {
          value: 1.234,
          precision: 2,
        },
        expected: 1.23,
      },
      {
        input: {
          value: 1.236,
          precision: 2,
        },
        expected: 1.24,
      },
      {
        input: {
          value: -1.236,
          precision: 2,
        },
        expected: -1.24,
      },
      {
        input: {
          value: -1.234,
          precision: 2,
        },
        expected: -1.23,
      },
      {
        input: {
          value: -1.234,
          precision: 0,
        },
        expected: -1,
      },
      {
        input: {
          value: -0.5,
          precision: 0,
        },
        expected: -0,
      },
    ];

    for (const example of EXAMPLES) {
      const description = JSON.stringify(example);
      it(description, () => {
        const actual = round(example.input.value, example.input.precision);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
