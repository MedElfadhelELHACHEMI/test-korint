export function debounce<T>(
  func: (...args: T[]) => unknown,
  delay = 200,
): typeof func {
  let timeout: number;
  return function (...args: T[]) {
    clearTimeout(timeout as number);
    timeout = setTimeout(() => func(...args), delay);
  };
}
