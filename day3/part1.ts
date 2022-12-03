const DAY = 3;

const input = Deno.readTextFileSync(`./day${DAY}/input`)
  .split("\n")
  .slice(0, -1);

const CHART_LOWER_OFFSET = -96;
const CHART_UPPER_OFFSET = -38;

function toPriority(s: string) {
  return (
    s.charCodeAt(0) +
    (/[a-z]/.test(s) ? CHART_LOWER_OFFSET : CHART_UPPER_OFFSET)
  );
}

function solve(input: string[]) {
  const matches: number[] = [];

  input.forEach((rucksack) => {
    const a = rucksack.slice(0, rucksack.length / 2).split("");
    const b = rucksack.slice(rucksack.length / 2).split("");

    let match = "";

    a.forEach((v) => {
      if (!match && b.includes(v)) {
        match = v;
      }
    });

    matches.push(toPriority(match));
  });

  return matches.reduce((acc, m) => acc + m, 0);
}

const answer = solve(input);
console.log(`Answer: ${answer}`);
