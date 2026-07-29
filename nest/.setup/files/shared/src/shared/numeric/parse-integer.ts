const INTEGER_REGEX = /^-?\d+$/;

export function parseIntegerOrThrow(input: string): number {
  if (!INTEGER_REGEX.test(input)) {
    throw new Error(`Value is not integer: '${input}'`);
  }

  return Number.parseInt(input, 10);
}
