const DAY = 4;

const input = Deno.readTextFileSync(`./day${DAY}/input`)
  .split("\n")
  .slice(0, -1);

function solve(input: string[]) {
  let matches = 0;

  for (let i = 0; i < input.length; i++) {
    const line = input[i];

    const [firstElf, secondElf] = line.split(",");
    const sectionsOne = firstElf.split("-").map(Number);
    const sectionsTwo = secondElf.split("-").map(Number);

    const a: number[] = [];
    for (let x = sectionsOne[0]; x <= sectionsOne[1]; x++) {
      if (!a[x]) a[x] = 0;
      a[x] += 1;
    }

    for (let x = sectionsTwo[0]; x <= sectionsTwo[1]; x++) {
      if (!a[x]) a[x] = 0;
      a[x] += 1;
    }
    const r = a.filter((v) => {
      return v > 1;
    });
    if (r.length > 0) {
      matches += 1;
    }
  }

  return matches;
}

const answer = solve(input);
console.log(`Answer: ${answer}`);
