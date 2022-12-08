const DAY = 8;

const input = Deno.readTextFileSync(`./day${DAY}/input`)
  .split("\n")
  .slice(0, -1);

function parseInput(input: string[]) {
  const trees: number[][] = [];

  for (let i = 0; i < input.length; i++) {
    const row = input[i].split("").map(Number);
    trees.push(row);
  }

  return trees;
}

function calculateVisibleTrees(trees: number[][]) {
  const visibleTrees: number[][] = Array(trees.length)
    .fill(0)
    .map(() => Array(trees.length).fill(0));

  for (let i = 0; i < trees.length; i++) {
    // left
    let t = -1;
    for (let x = 0; x < trees.length; x++) {
      const tree = trees[i][x];

      if (tree > t) {
        visibleTrees[i][x] = 1;
        t = tree;
      }
    }

    // right
    t = -1;
    for (let x = trees.length - 1; x > 0; x--) {
      const tree = trees[i][x];
      if (tree > t) {
        visibleTrees[i][x] = 1;
        t = tree;
      }
    }

    // top
    t = -1;
    for (let x = 0; x < trees.length; x++) {
      const tree = trees[x][i];
      if (tree > t) {
        visibleTrees[x][i] = 1;
        t = tree;
      }
    }

    // bottom
    t = -1;
    for (let x = trees.length - 1; x > 0; x--) {
      const tree = trees[x][i];
      if (tree > t) {
        visibleTrees[x][i] = 1;
        t = tree;
      }
    }
  }

  let count = 0;
  for (let r = 0; r < visibleTrees.length; r++) {
    let row = "";
    const colors = [];
    for (let c = 0; c < visibleTrees.length; c++) {
      if (visibleTrees[r][c]) {
        colors.push("color: teal");
        row += "%c";
        count += 1;
      }
      row += `${trees[r][c]}%c`;
      colors.push("color: white");
    }
    console.log(row, ...colors);
  }
  return count;
}

const trees = parseInput(input);

const visibleCount = calculateVisibleTrees(trees);

console.log(`Answer: ${visibleCount}`);
