import { createGrid } from "../create-grid.ts";
const DAY = 10;

const input = Deno.readTextFileSync(`./day${DAY}/input`)
  .split("\n")
  .slice(0, -1);

type Instruction = ["noop"] | ["addx", number];

function parseInstruction(line: string) {
  const instruction = line.split(" ");

  return instruction as Instruction;
}

function solve(input: string[]) {
  const crt = createGrid([6, 40], " ");
  let x = 1;

  const instructions: Instruction[] = input.map(parseInstruction);

  let executingInstruction: [Instruction | null, number] = [null, 0];
  let cycle = 0;
  const signals: number[] = [];
  do {
    cycle += 1;
    // console.log(`Cycle: ${cycle}`, { x });

    if (cycle === 20 || (cycle + 20) % 40 === 0) {
      signals.push(cycle * x);
    }

    if (executingInstruction[0]) {
      if (executingInstruction[1] === cycle) {
        // execute
        const [instruction, value] = executingInstruction[0];
        // console.log("Execute:", executingInstruction[0]);

        switch (instruction) {
          case "addx":
            x += Number(value);
            break;
        }
        executingInstruction[0] = null;
        const row = Math.floor((cycle - 1) / 40);
        const pixel = cycle - row * 40;
        if (pixel === x || pixel - 1 === x || pixel + 1 === x) {
          crt[row][pixel] = "▓";
        }
      }
      continue;
    }

    const instruction = instructions.shift();
    // console.log("Starting to execute:", instruction);
    if (instruction) {
      switch (instruction[0]) {
        case "noop": {
          break;
        }
        case "addx": {
          executingInstruction = [instruction, cycle + 1];
          break;
        }
      }
    }
    const row = Math.floor((cycle - 1) / 40);
    const pixel = cycle - row * 40;
    if (pixel === x || pixel - 1 === x || pixel + 1 === x) {
      crt[row][pixel] = "▓";
    }
  } while (instructions.length > 0 || cycle < executingInstruction[1]);

  crt.forEach((r) => {
    console.log(r.join(""));
  });

  return signals.reduce((sum, v) => sum + v, 0);
}

const answer = solve(input);
console.log(`Part 1: ${answer}`);
