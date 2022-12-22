import { createGrid } from "../create-grid.ts";

const DAY = 15;

const input = Deno.readTextFileSync(`./day${DAY}/sample`)
  .split("\n")
  .slice(0, -1);

const OFFSET_X = 15;
const OFFSET_Y = 15;
// const OFFSET_X = 0;
// const OFFSET_Y = 0;

function parseInput(input: string[]) {
  const points = input.map((line) => {
    const [sx, sy, bx, by] = line.match(/-?\d+/g)!.map(Number);

    return {
      s: [sx + OFFSET_X, sy + OFFSET_Y],
      b: [bx + OFFSET_X, by + OFFSET_Y],
    };
  });

  return points;
}

function printMap(map: number[][]) {
  let printedMap = "";

  for (let r = 0; r < map.length; r++) {
    printedMap += `${r - OFFSET_Y}`.padStart(3, " ");

    for (let c = 0; c < map[r].length; c++) {
      printedMap += map[r][c];
    }
    printedMap += "\n";
  }
  console.log(printedMap);
}

function createMap(points: any[][], row: number) {
  const signals: [number, number][] = [];

  const grid = createGrid([50, 50], ".");
  grid[row + OFFSET_Y].fill("~");
  points.forEach(({ s, b }, i) => {
    const xDelta = Math.abs(s[0] - b[0]);
    const yDelta = Math.abs(s[1] - b[1]);
    const totalDelta = xDelta + yDelta;

    const distanceFromSignal = s[1] - (row + OFFSET_Y);

    if (Math.abs(distanceFromSignal) <= totalDelta) {
      const x1 = s[0] - totalDelta + Math.abs(distanceFromSignal);
      const x2 = s[0] + totalDelta - Math.abs(distanceFromSignal);
      signals.push([x1, x2]);
    }

    for (let i = 0; i <= totalDelta; i++) {
      for (let x = 0; x <= totalDelta - i; x++) {
        grid[s[1] - i][s[0] - x] = "#";
        grid[s[1] - i][s[0] + x] = "#";
        grid[s[1] + i][s[0] + x] = "#";
        grid[s[1] + i][s[0] - x] = "#";
      }
    }

    grid[s[1]][s[0]] = "S";
    grid[b[1]][b[0]] = "B";
  });
  // grid[11 + OFFSET_X][14 + OFFSET_Y] = "+";
  printMap(grid);

  // Sort x values by x1 and if same by x2
  const sortedSignals = signals.sort((a, b) => {
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;

    if (a[0] === b[0]) {
      if (a[1] > b[1]) return 1;
      if (a[1] < b[1]) return -1;
    }

    return 0;
  });

  const a = Array(4_000_000).fill(null);

  const offset = 1_000_000;
  sortedSignals.forEach(([x1, x2]) => {
    for (let i = x1; i <= x2; i++) {
      a[i + offset] = true;
    }
  });
  console.log(a.filter((a) => a).length - 1);

  // Merge overlapping x values
  const mergedSignals = sortedSignals.reduce((prev, current, i, a) => {
    if (i === 0) {
      return [current];
    }

    const previous = prev[prev.length - 1];

    if (previous[1] >= current[0]) {
      previous[1] = current[1];
      return prev;
    }

    return [...prev, current];
  }, []);

  const signalCount = mergedSignals.reduce((s, v) => s + v[1] - v[0] + 1, 0);

  console.log({ signalCount });
}

const points = parseInput(input);
// createMap(points, 2_000_000);
createMap(points, 10);

// 5403291 -
// 5403290 - right answer
