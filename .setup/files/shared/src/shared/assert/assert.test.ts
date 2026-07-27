import { describe, expect, it } from 'vitest';

import { ensureNotNull, ensureNotNullish, ensureNotUndefined, invariant } from './assert';

describe('assert', () => {
  describe('invariant()', () => {
    it('does not throw an error if the condition is true', () => {
      expect(() => invariant(true, 'message')).not.toThrow();
    });

    it('throws an error if the condition is false', () => {
      expect(() => invariant(false, 'message')).toThrow('message');
    });
  });

  describe('ensureNotUndefined()', () => {
    it('returns the value if it is not undefined', () => {
      expect(ensureNotUndefined('not undefined')).toBe('not undefined');
    });

    it('throws an error if the value is undefined', () => {
      expect(() => ensureNotUndefined(undefined)).toThrow('Value is undefined.');
    });
  });

  describe('ensureNotNull()', () => {
    it('returns the value if it is not null', () => {
      expect(ensureNotNull('not null')).toBe('not null');
    });

    it('throws an error if the value is null', () => {
      expect(() => ensureNotNull(null)).toThrow('Value is null.');
    });
  });

  describe('ensureNotNullish()', () => {
    it('returns the value if it is not null or undefined', () => {
      expect(ensureNotNullish('not null or undefined')).toBe('not null or undefined');
    });

    it('throws an error if the value is null', () => {
      expect(() => ensureNotNullish(null)).toThrow('Value is undefined or null.');
    });

    it('throws an error if the value is undefined', () => {
      expect(() => ensureNotNullish(undefined)).toThrow('Value is undefined or null.');
    });
  });
});
