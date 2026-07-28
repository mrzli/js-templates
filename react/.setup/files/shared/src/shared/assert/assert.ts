export function invariant(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export function ensureNotUndefined(value: undefined): never;
export function ensureNotUndefined<T>(value: T | undefined): T;
export function ensureNotUndefined<T>(value: T | undefined): T {
  invariant(value !== undefined, 'Value is undefined.');
  return value;
}

export function ensureNotNull(value: null): never;
export function ensureNotNull<T>(value: T | null): T;
export function ensureNotNull<T>(value: T | null): T {
  invariant(value !== null, 'Value is null.');
  return value;
}

export function ensureNotNullish(value: null | undefined): never;
export function ensureNotNullish<T>(value: T | null | undefined): T;
export function ensureNotNullish<T>(value: T | null | undefined): T {
  invariant(value !== undefined && value !== null, 'Value is undefined or null.');
  return value;
}

export function ensureNever(value: never): never {
  return value;
}
