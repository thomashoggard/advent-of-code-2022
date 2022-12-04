const DAY = 4;

const input = Deno.readTextFileSync(`./day${DAY}/input`)
  .split("\n")
  .slice(0, -1);

function mergeArrays(length: number, ...arrays: Array<number[]>) {
  const mergedArray = Array(length).fill(0);

  for (let i = 0; i < mergedArray.length; i++) {
    arrays.forEach((a) => {
      if (a[i]) {
        mergedArray[i] += 1;
      }
    });
  }
  return mergedArray;
}

const ARRAY_LENGTH = 100;

function solve(input: string[]) {
  let matches = 0;

  for (let i = 0; i < input.length; i++) {
    const line = input[i];

    const [firstElf, secondElf] = line.split(",");
    const sectionsOne = firstElf.split("-").map(Number);
    const sectionsTwo = secondElf.split("-").map(Number);

    const a = Array(ARRAY_LENGTH).fill(1, sectionsOne[0], sectionsOne[1] + 1);
    const b = Array(ARRAY_LENGTH).fill(1, sectionsTwo[0], sectionsTwo[1] + 1);
    const c = mergeArrays(ARRAY_LENGTH, a, b);

    const overlap = c.filter((v) => v > 1);

    if (overlap.length > 0) {
      matches += 1;
    }
  }

  return matches;
}

const answer = solve(input); // 928
console.log(`Answer: ${answer}`);
