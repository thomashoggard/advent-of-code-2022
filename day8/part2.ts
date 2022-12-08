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

function calculateScenicScores(trees: number[][]) {
  const scenicScores: number[][] = Array(trees.length)
    .fill(0)
    .map(() => Array(trees.length).fill(0));

  for (let x = 0; x < trees.length; x++) {
    for (let y = 0; y < trees.length; y++) {
      const tree = trees[x][y];

      // top
      let top = 0;
      for (let t = x - 1; t >= 0; t--) {
        top += 1;
        if (tree <= trees[t][y]) {
          break;
        }
      }

      // bottom
      let bottom = 0;
      for (let b = x + 1; b < trees.length; b++) {
        bottom += 1;
        if (tree <= trees[b][y]) {
          break;
        }
      }

      // left
      let left = 0;
      for (let l = y - 1; l >= 0; l--) {
        left += 1;
        if (tree <= trees[x][l]) {
          break;
        }
      }

      // right
      let right = 0;
      for (let r = y + 1; r < trees.length; r++) {
        right += 1;
        if (tree <= trees[x][r]) {
          break;
        }
      }

      scenicScores[x][y] = top * bottom * left * right;
    }
  }

  return scenicScores;
}

function sort(a: number[]) {
  return a.sort((a, b) => {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
  });
}

const trees = parseInput(input);
const scenicScore = calculateScenicScores(trees);
const answer = Math.max(...scenicScore.map(sort).map((v) => v[0]));
console.log(`Answer: ${answer}`);
