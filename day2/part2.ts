// If you read this, bring tissue paper, it will make you cry.
const data = Deno.readTextFileSync("./day3/input").trim().split("\n");

// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors

// 1 for Rock, 2 for Paper, and 3 for Scissors
// plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).

// X means you need to lose,
// Y means you need to end the round in a draw, and
// Z means you need to win. Good luck!"

function solve(data: string[]) {
  let sum = 0;

  for (const d of data) {
    const [opponent, me] = d.split(" ");

    switch (opponent) {
      case "A": {
        if (me === "Z") {
          // win
          sum += 2;
          sum += 6;
        } else if (me === "X") {
          // lose
          sum += 3;
        } else {
          // draw
          sum += 1;
          sum += 3;
        }
        // lose
        break;
      }
      case "B": {
        if (me === "Z") {
          // win
          sum += 3;
          sum += 6;
        } else if (me === "X") {
          sum += 1;
        } else {
          sum += 2;
          sum += 3;
        }
        // lose
        break;
      }
      case "C": {
        if (me === "Z") {
          // win
          sum += 1;
          sum += 6;
        } else if (me === "X") {
          sum += 2;
        } else {
          sum += 3;
          sum += 3;
        }
        break;
      }
    }
  }

  return sum;
}

const answer = solve(data);
// const answer = solve(["A Y", "B X", "C Z"]);
console.log(answer);
