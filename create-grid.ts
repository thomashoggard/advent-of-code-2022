export function createGrid<T>([x, y]: number[], defaultValue?: T) {
  return Array(x)
    .fill(defaultValue)
    .map(() => {
      if (defaultValue) {
        return Array(y).fill(defaultValue);
      }
      return Array(y);
    });
}
