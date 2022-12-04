const DAY = 4;

const input = Deno.readTextFileSync(`./day${DAY}/input`)
  .split("\n")
  .slice(0, -1);

function solve(input: string[]) {
  const matches: string[] = [];

  for (let i = 0; i < input.length; i++) {
    const line = input[i];

    const [firstElf, secondElf] = line.split(",");
    const sectionsOne = firstElf.split("-").map(Number);
    const sectionsTwo = secondElf.split("-").map(Number);

    if (sectionsOne[0] >= sectionsTwo[0] && sectionsOne[1] <= sectionsTwo[1]) {
      matches.push(line);
      continue;
    }
    if (sectionsTwo[0] >= sectionsOne[0] && sectionsTwo[1] <= sectionsOne[1]) {
      matches.push(line);
      continue;
    }
  }

  return matches.length;
}

const answer = solve(input);
console.log(`Answer: ${answer}`);
