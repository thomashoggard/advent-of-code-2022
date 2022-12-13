const DAY = 12;

const input = Deno.readTextFileSync(`./day${DAY}/input`)
  .split("\n")
  .slice(0, -1);

const CHART_LOWER_OFFSET = -96;
const CURRENT_POSITION_MARKER = "S";
const BEST_SIGNAL_LOCATION_MARKER = "E";

type Coords = [number, number];

function parseInput(input: string[]) {
  let s: Coords = [0, 0];
  let e: Coords = [0, 0];

  const graph = input.map((r, x) =>
    r.split("").map((c, y) => {
      if (c === CURRENT_POSITION_MARKER) {
        s = [x, y];
        return "a".charCodeAt(0) + CHART_LOWER_OFFSET;
      }
      if (c === BEST_SIGNAL_LOCATION_MARKER) {
        e = [x, y];
        return "z".charCodeAt(0) + CHART_LOWER_OFFSET;
      }
      return c.charCodeAt(0) + CHART_LOWER_OFFSET;
    })
  );

  return {
    graph,
    s,
    e,
  };
}

class Node {
  parent?: Node;
  cell: [number, number];

  constructor(cell: [number, number], parent?: Node) {
    this.parent = parent;
    this.cell = cell;
  }
}
function parseMatrix(
  canVisit: (current: Coords, adjaent: Coords) => boolean,
  row: number,
  col: number,
  s: [number, number],
  e?: [number, number]
) {
  const queue = [new Node(s)];
  const visited: Node[] = [];
  const path = [];

  const r = [-1, 1, 0, 0];
  const c = [0, 0, 1, -1];

  while (queue.length > 0) {
    const current = queue.shift()!;

    path.push(current);

    if (e && current.cell[0] === e[0] && current.cell[1] === e[1]) {
      break;
    }

    for (let i = 0; i < 4; i++) {
      const rr = current.cell[0] + r[i];
      const cc = current.cell[1] + c[i];
      const cell: [number, number] = [rr, cc];

      if (rr < 0 || rr >= row || cc < 0 || cc >= col) {
        continue;
      }

      if (visited.find((v) => v.cell[0] === rr && v.cell[1] === cc)) {
        continue;
      }

      if (!canVisit(current.cell, cell)) {
        continue;
      }

      const node = new Node(cell, current);

      queue.push(node);
      visited.push(node);
    }
  }

  return visited;
}

function reconstructPath(
  s: [number, number],
  e: [number, number],
  nodes: Node[]
) {
  let node = nodes.find((v) => v.cell[0] === e[0] && v.cell[1] === e[1]);

  const path = [];

  while (node?.parent) {
    path.push(node);

    if (node.cell[0] === s[0] && node.cell[1] === s[1]) {
      break;
    }

    node = node.parent;
  }

  return path.reverse();
}

const { graph, s, e } = parseInput(input);
const row = graph.length;
const col = graph[0].length;

function part1() {
  const nodes = parseMatrix(
    (current, adjacent) => {
      const c = graph[current[0]][current[1]];
      const a = graph[adjacent[0]][adjacent[1]];

      return a <= c + 1;
    },
    row,
    col,
    s,
    e
  );

  const path = reconstructPath(s, e, nodes);

  return path.length;
}

function part2() {
  const nodes = parseMatrix(
    (current, adjacent) => {
      const c = graph[current[0]][current[1]];
      const a = graph[adjacent[0]][adjacent[1]];

      return c <= a + 1;
    },
    row,
    col,
    e,
    s
  );

  const exits: Coords[] = [];
  for (let i = 0; i < row; i++) {
    if (graph[0][i] === 1) {
      exits.push([0, i]);
    }
    if (graph[row - 1][i] === 1) {
      exits.push([row - 1, i]);
    }
    if (graph[i][0] === 1) {
      exits.push([i, 0]);
    }
    if (graph[i][col - 1] === 1) {
      exits.push([i, col - 1]);
    }
  }

  const paths = exits.map((exit) => reconstructPath(e, exit, nodes));

  const sortedPaths = paths
    .sort((a, b) => {
      if (a.length > b.length) return 1;
      if (a.length < b.length) return -1;
      return 0;
    })
    .filter((path) => path.length > 0);

  return sortedPaths[0].length;
}

console.log("Part 1:", part1());
console.log("Part 2:", part2());
