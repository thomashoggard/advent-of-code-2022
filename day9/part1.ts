const DAY = 9;

const input = Deno.readTextFileSync(`./day${DAY}/input`)
  .split("\n")
  .slice(0, -1);

type Direction = "L" | "R" | "U" | "D";

function processPath(input: string[], tails = 1) {
  const head = [0, 0];
  const tailPositions = Array(tails)
    .fill([])
    .map(() => [[0, 0]]);

  for (let i = 0; i < input.length; i++) {
    const command = input[i].split(" ");
    const direction = command[0] as Direction;
    const distance = Number(command[1]);

    for (let d = 0; d < distance; d++) {
      switch (direction) {
        case "R": {
          head[1] += 1;
          break;
        }
        case "L": {
          head[1] -= 1;
          break;
        }
        case "U": {
          head[0] -= 1;
          break;
        }
        case "D": {
          head[0] += 1;
          break;
        }
      }

      for (let t = 0; t < tails; t++) {
        const tail = tailPositions[t][tailPositions[t].length - 1].slice();

        let following: number[];
        if (t === 0) {
          following = head;
        } else {
          following = tailPositions[t - 1][tailPositions[t - 1].length - 1];
        }

        const xDiff = following[0] - tail[0];
        const yDiff = following[1] - tail[1];

        if (xDiff === 0 && yDiff === 2) {
          // right
          tail[1] += 1;
        }
        if (xDiff === 0 && yDiff === -2) {
          // left
          tail[1] -= 1;
        }
        if (xDiff === 2 && yDiff === 0) {
          // up
          tail[0] += 1;
        }
        if (xDiff === -2 && yDiff === 0) {
          // down
          tail[0] -= 1;
        }

        if (
          (xDiff === -1 && yDiff === -2) ||
          (xDiff === -2 && yDiff === -2) ||
          (xDiff === -2 && yDiff === -1)
        ) {
          tail[0] -= 1;
          tail[1] -= 1;
        }

        if (
          (xDiff === -2 && yDiff === 1) ||
          (xDiff === -2 && yDiff === 2) ||
          (xDiff === -1 && yDiff === 2)
        ) {
          tail[0] -= 1;
          tail[1] += 1;
        }

        if (
          (xDiff === 1 && yDiff === 2) ||
          (xDiff === 2 && yDiff === 2) ||
          (xDiff === 2 && yDiff === 1)
        ) {
          tail[0] += 1;
          tail[1] += 1;
        }

        if (
          (xDiff === 2 && yDiff === -1) ||
          (xDiff === 2 && yDiff === -2) ||
          (xDiff === 1 && yDiff === -2)
        ) {
          tail[0] += 1;
          tail[1] -= 1;
        }

        tailPositions[t].push(tail);
      }
    }
  }

  const dedupe = tailPositions.map(
    (tail) =>
      tail.reduce<number[][]>((acc, v) => {
        if (acc.find((a) => a[0] === v[0] && a[1] === v[1])) {
          return acc;
        }
        return [...acc, v];
      }, []).length
  );

  return dedupe.map((t, i) => `${i + 1}:${t}`);
}

console.log("================================================================");
console.log(`Part 1: ${processPath(input, 1)}`);
console.log(`Part 2: ${processPath(input, 9)[8]}`);
