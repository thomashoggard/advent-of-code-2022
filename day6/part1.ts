const DAY = 6;

const input = Deno.readTextFileSync(`./day${DAY}/input`);

const BUFFER_MARKER = 4;
const MESSAGE_MARKER = 14;

function solve(input: string, seqCount: number) {
  const signal = input.split("");
  const history = signal.slice(0, seqCount);
  let bufferStart = 0;

  for (let i = 0; i < signal.length; i++) {
    if ([...new Set(history)].length === seqCount) {
      bufferStart = i;
      break;
    }

    history.splice(0, 1);
    history.push(input[i]);
  }
  return bufferStart;
}

console.log(`Part 1: ${solve(input, BUFFER_MARKER)}`);
console.log(`Part 2: ${solve(input, MESSAGE_MARKER)}`);
