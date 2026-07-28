import { describe, expect, it } from 'vitest';

import type { SearchParams } from '../types';
import { toSearchParams } from './search-params';

describe('toSearchParams()', () => {
  interface Example {
    readonly description: string;
    readonly input: SearchParams;
    readonly expected: string;
  }

  const EXAMPLES: readonly Example[] = [
    {
      description: 'converts string, number, and boolean values',
      input: {
        text: 'value',
        count: 20,
        enabled: false,
      },
      expected: 'text=value&count=20&enabled=false',
    },
    {
      description: 'omits null and undefined values',
      input: {
        text: 'value',
        missing: undefined,
        empty: null,
      },
      expected: 'text=value',
    },
    {
      description: 'escapes keys and values when serialized',
      input: { 'query type': 'front & back/?=' },
      expected: 'query+type=front+%26+back%2F%3F%3D',
    },
  ];

  for (const example of EXAMPLES) {
    const { description, input, expected } = example;
    it(description, () => {
      const actual = toSearchParams(input).toString();
      expect(actual).toEqual(expected);
    });
  }
});
