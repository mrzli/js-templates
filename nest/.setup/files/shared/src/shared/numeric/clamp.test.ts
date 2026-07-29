import { describe, expect, it } from 'vitest';

import { clamp } from './clamp.js';

describe('clamp', () => {
  describe('clamp()', () => {
    interface Example {
      readonly input: {
        readonly value: number;
        readonly min: number;
        readonly max: number;
      };
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: 0,
          min: 0,
          max: 0,
        },
        expected: 0,
      },
      {
        input: {
          value: 0,
          min: 0,
          max: 10,
        },
        expected: 0,
      },
      {
        input: {
          value: 1,
          min: 0,
          max: 10,
        },
        expected: 1,
      },
      {
        input: {
          value: 10,
          min: 0,
          max: 10,
        },
        expected: 10,
      },
      {
        input: {
          value: 0,
          min: 1,
          max: 10,
        },
        expected: 1,
      },
      {
        input: {
          value: 0,
          min: -1,
          max: 10,
        },
        expected: 0,
      },
      {
        input: {
          value: -2,
          min: -1,
          max: 10,
        },
        expected: -1,
      },
      {
        input: {
          value: 20,
          min: 0,
          max: 10,
        },
        expected: 10,
      },
    ];

    for (const example of EXAMPLES) {
      const description = JSON.stringify(example);
      it(description, () => {
        const actual = clamp(example.input.value, example.input.min, example.input.max);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
