const text = Deno.readTextFileSync("./day1/input");

const data = text.split("\n");

const elfs: number[] = [0];

for (let i = 0, x = 0; i < data.length; i++) {
  const calories = data[i];
  if (calories === "") {
    x += 1;
    elfs[x] = 0;
    continue;
  }

  elfs[x] += Number(calories);
}

const sortedElfs = elfs.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
});

console.log("Part 1:", sortedElfs[0]);
console.log("Part 2:", sortedElfs[0] + sortedElfs[1] + sortedElfs[2]);
