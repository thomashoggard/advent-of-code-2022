import { createGrid } from "../create-grid.ts";

const DAY = 14;

const input = Deno.readTextFileSync(`./day${DAY}/input`)
  .split("\n")
  .slice(0, -1);

function parseInput(input: string[]) {
  return input.map((line) =>
    line.match(/\d+,\d+/g)!.map((s) => s.match(/\d+/g)!.map(Number))
  );
}

// const X_OFFSET = 450;
const X_OFFSET = 200;

function createMap(paths: number[][][]) {
  const grid = createGrid([400, 700], ".");
  // const grid = createGrid([40, 100], ".");

  paths.forEach((path) => {
    for (let i = 1; i < path.length; i++) {
      const from = path[i - 1];
      const to = path[i];

      const deltaX = to[0] - from[0];
      const deltaY = from[1] - to[1];

      for (let i = 0; i <= Math.abs(deltaX); i++) {
        const offset = Math.sign(deltaX) === 1 ? i : deltaX + i;
        grid[from[1]][from[0] + offset - X_OFFSET] = "#";
      }
      for (let i = 0; i <= Math.abs(deltaY); i++) {
        const offset = Math.sign(deltaY) === 1 ? i : deltaY + i;
        grid[from[1] - offset][from[0] - X_OFFSET] = "#";
      }

      grid[0][500 - X_OFFSET] = "+";
    }
  });

  return grid;
}

function moveSand(map: any[][], sand = -1) {
  for (let i = 0; i !== sand; i++) {
    let current = [0, 500 - X_OFFSET];

    while (true) {
      const down = [current[0] + 1, current[1]];
      const left = [current[0] + 1, current[1] - 1];

      const right = [current[0] + 1, current[1] + 1];

      if (map[down[0]] === undefined || map[down[0]][down[1]] === undefined) {
        return i;
      }

      if (map[down[0]][down[1]] === "#") {
        if (map[left[0]][left[1]] === ".") {
          map[current[0]][current[1]] = ".";
          current = left;
          map[left[0]][left[1]] = "0";
          continue;
        } else if (map[right[0]][right[1]] === ".") {
          map[current[0]][current[1]] = ".";
          current = right;
          map[right[0]][right[1]] = "0";
          continue;
        } else {
          break;
        }
      }

      if (map[down[0]][down[1]] === ".") {
        if (map[current[0]][current[1]] !== "+") {
          map[current[0]][current[1]] = ".";
        }
        current = down;
        map[down[0]][down[1]] = "0";
      } else if (map[left[0]][left[1]] === ".") {
        map[current[0]][current[1]] = ".";
        current = left;
        map[left[0]][left[1]] = "0";
      } else if (map[right[0]][right[1]] === ".") {
        map[current[0]][current[1]] = ".";
        current = right;
        map[right[0]][right[1]] = "0";
      } else {
        break;
      }
    }
  }
}

function addFloor(map: number[][]) {
  let floor = 0;
  for (let i = map.length - 1; i >= 0; i--) {
    if (map[i].find((c) => c === "#")) {
      floor = i + 2;
      break;
    }
  }

  if (floor) {
    map[floor].fill("#");
  }

  return floor;
}

function part1() {
  const parsedInput = parseInput(input);
  const map = createMap(parsedInput);
  const abyss = moveSand(map);

  return abyss;
}

function part2() {
  const parsedInput = parseInput(input);
  const map = createMap(parsedInput);
  const floor = addFloor(map);
  const abyss = moveSand(map, 10000000);

  const totalSand = map.reduce((count, r, i, m) => {
    const rowCount = r.filter((c) => c === "0").length;
    return count + rowCount;
  }, 0);

  printMap(map);

  return totalSand + 1;
}

function printMap(map: number[][]) {
  let printedMap = "";
  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[r].length; c++) {
      printedMap += map[r][c];
    }
    printedMap += "\n";
  }
  console.log(printedMap);
}

console.log("Part 1:", part1());
console.log("Part 2:", part2());

// 22336 - too low
