const DAY = 13;

const input = Deno.readTextFileSync(`./day${DAY}/input`)
  .split("\n")
  .slice(0, -1);

type Packet = [number | Packet];
type PacketPair = [Packet, Packet];

function parseInput(input: string[]) {
  const pairs: PacketPair[] = [];

  for (let i = 0; i < input.length; i += 3) {
    const left: Packet = JSON.parse(input[i]);
    const right: Packet = JSON.parse(input[i + 1]);

    pairs.push([left, right]);
  }

  return pairs;
}

function comparePairs(left: Packet, right: Packet): boolean | undefined {
  while (left.length > 0 || right.length > 0) {
    let l: number | Packet = left.shift()!;
    let r: number | Packet = right.shift()!;

    if (typeof l === "number" && typeof r === "number") {
      if (l < r) {
        return true;
      } else if (l > r) {
        return false;
      } else if (l === r) {
        return comparePairs(left, right);
      }
    } else {
      if (typeof l === "number") {
        l = [l];
      }
      if (typeof r === "number") {
        r = [r];
      }

      if (l === undefined) {
        return true;
      } else if (r === undefined) {
        return false;
      }

      const c = comparePairs(l, r);
      if (c === undefined) continue;
      return c;
    }
  }
}

function deepClone<T>(obj: T) {
  return JSON.parse(JSON.stringify(obj));
}

function part1(pairs: PacketPair[]) {
  const cloned = deepClone(pairs) as PacketPair[];

  return cloned.map((pair, i) => {
    const [left, right] = pair;

    return comparePairs(left, right) ? i + 1 : 0;
  });
}

function part2(pairs: PacketPair[]) {
  const packets = pairs.flatMap(([left, right]) => [left, right]);
  packets.push([[2]]);
  packets.push([[6]]);

  const ordered = packets.sort((a, b) => {
    const c = comparePairs(deepClone(a), deepClone(b));
    if (c === undefined) return 0;
    if (c) return -1;
    if (!c) return 1;
  });

  const dividerOne =
    ordered.findIndex((v) => JSON.stringify(v) === JSON.stringify([[2]])) + 1;
  const dividerTwo =
    ordered.findIndex((v) => JSON.stringify(v) === JSON.stringify([[6]])) + 1;

  return dividerOne * dividerTwo;
}

function sum(...n: number[]) {
  return n.reduce((sum, n) => sum + n, 0);
}

const pairs = parseInput(input);
const indices = part1(pairs);
const decoderKey = part2(pairs);

console.log("Part 1:", sum(...indices)); // 5013
console.log("Part 2:", decoderKey); // 25038
