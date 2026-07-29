const FLOAT_REGEX = /^-?\d+(?:\.\d+)?$/;

export function parseFloatOrThrow(input: string): number {
  if (!FLOAT_REGEX.test(input)) {
    throw new Error(`Value is not a valid number: '${input}'`);
  }

  const result = Number.parseFloat(input);
  if (Number.isNaN(result)) {
    throw new TypeError(`Value is not a valid number: '${input}'`);
  }

  return result;
}
