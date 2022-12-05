const DAY = 5;

const stacks = [
  ["V", "C", "W", "L", "R", "M", "F", "Q"].reverse(),
  ["L", "Q", "D"].reverse(),
  ["B", "N", "C", "W", "G", "R", "S", "P"].reverse(),
  ["G", "Q", "B", "H", "D", "C", "L"].reverse(),
  ["S", "Z", "F", "L", "G", "V"].reverse(),
  ["P", "N", "G", "D"].reverse(),
  ["W", "C", "F", "V", "P", "Z", "D"].reverse(),
  ["S", "M", "D", "P", "C"].reverse(),
  ["C", "P", "M", "V", "T", "W", "N", "Z"].reverse(),
];

const input = Deno.readTextFileSync(`./day${DAY}/input`)
  .split("\n")
  .slice(0, -1);

function solve(input: string[]) {
  for (let i = 0; i < input.length; i++) {
    const procedure = input[i].split(" ");
    const quantity = Number(procedure[1]);
    const from = Number(procedure[3]) - 1;
    const to = Number(procedure[5]) - 1;

    if (!stacks[from]) {
      console.log(from);
    }
    const crates = stacks[from].splice(-quantity);

    stacks[to].push(...crates);
  }

  return stacks.map((s) => s[s.length - 1]).join("");
}

const answer = solve(input);
console.log(`Answer: ${answer}`);
