import { describe, expect, it } from 'vitest';

import type { SearchParams } from '../types';
import { buildUrl } from './build-url';

describe('buildUrl()', () => {
  interface Example {
    readonly description: string;
    readonly input: {
      readonly baseUrl: string;
      readonly path: string;
      readonly searchParams?: SearchParams;
    };
    readonly expected: string;
  }

  const EXAMPLES: readonly Example[] = [
    {
      description: 'joins a trailing base URL slash and leading path slash with one slash',
      input: {
        baseUrl: 'https://example.com/',
        path: '/decks',
      },
      expected: 'https://example.com/decks',
    },
    {
      description: 'joins a base URL and path without slashes with one slash',
      input: {
        baseUrl: 'https://example.com',
        path: 'decks',
      },
      expected: 'https://example.com/decks',
    },
    {
      description: 'adds escaped search parameters',
      input: {
        baseUrl: 'https://example.com',
        path: '/decks',
        searchParams: { query: 'front & back', limit: 20 },
      },
      expected: 'https://example.com/decks?query=front+%26+back&limit=20',
    },
    {
      description: 'appends search parameters to an existing query string',
      input: {
        baseUrl: 'https://example.com',
        path: '/decks?sort=name',
        searchParams: { limit: 20 },
      },
      expected: 'https://example.com/decks?sort=name&limit=20',
    },
    {
      description: 'does not add a query marker when all parameters are nullish',
      input: {
        baseUrl: 'https://example.com',
        path: '/decks',
        searchParams: { limit: undefined },
      },
      expected: 'https://example.com/decks',
    },
  ];

  for (const example of EXAMPLES) {
    const { description, input, expected } = example;
    it(description, () => {
      const { baseUrl, path, searchParams } = input;
      const actual = buildUrl(baseUrl, path, searchParams);
      expect(actual).toEqual(expected);
    });
  }
});
