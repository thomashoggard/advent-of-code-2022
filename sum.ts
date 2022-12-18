export function sum(...n: number[]) {
  return n.reduce((sum, n) => sum + n, 0);
}
