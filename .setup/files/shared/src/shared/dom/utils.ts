export function shouldIgnoreKeyboardEvent(event: KeyboardEvent): boolean {
  const { repeat, target } = event;

  return (
    repeat ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  );
}
