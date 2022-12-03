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

  for (let i = 0; i < input.length; i += 3) {
    const a = new Set(input[i].split(""));
    const b = new Set(input[i + 1].split(""));
    const c = new Set(input[i + 2].split(""));

    const map: Record<string, number> = {};

    [a, b, c].forEach((sack) =>
      sack.forEach((v) => {
        if (!map[v]) map[v] = 0;
        map[v] += 1;
      })
    );
    const badges = Object.entries(map)
      .filter(([_k, v]) => v === 3)
      .map(([k]) => k);

    badges.map((b) => matches.push(toPriority(b)));
  }

  return matches.reduce((acc, m) => acc + m, 0);
}

const answer = solve(input);
console.log(`Answer: ${answer}`);
