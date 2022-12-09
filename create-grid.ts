export function createGrid<T>([x, y]: number[], defaultValue: T) {
  return Array(x)
    .fill(defaultValue)
    .map(() => Array(y).fill(defaultValue));
}
