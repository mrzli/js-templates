export function padNonNegativeIntWithZeroes(value: number, maxLength: number): string {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error("'value' must be an integer greater or equal to zero");
  }

  if (!Number.isInteger(maxLength) || maxLength <= 0) {
    throw new Error("'maxLength' must be an positive greater than zero");
  }

  return value.toString().padStart(maxLength, '0');
}
