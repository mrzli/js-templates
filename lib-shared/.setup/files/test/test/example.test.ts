import { expect, test } from 'vitest';

import { exampleFunction } from '../src/example';

test('exampleFunction()', () => {
  expect(exampleFunction()).toBe('Hello, World!');
});
