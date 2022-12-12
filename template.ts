const DAY = 12;

const input = Deno.readTextFileSync(`./day${DAY}/input`)
  .split("\n")
  .slice(0, -1);

function parseInput(input: string[]) {
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    console.log(line);
  }
}

const parsedInput = parseInput(input);
console.log(parsedInput);
