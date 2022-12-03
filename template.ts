const DAY = 3;

const input = Deno.readTextFileSync(`./day${DAY}/input`)
  .split("\n")
  .slice(0, -1);

function solve(input: string[]) {
  const result = null;

  input.forEach((line) => {
    // draw owl
    console.log(line);
  });

  return result;
}

const test = solve([]);
console.log(`Test: ${test}`);

const answer = solve(input);
console.log(`Answer: ${answer}`);
