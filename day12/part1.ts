const DAY = 12;

const input = Deno.readTextFileSync(`./day${DAY}/input`)
  .split("\n")
  .slice(0, -1);

const CHART_LOWER_OFFSET = -96;
const CURRENT_POSITION_MARKER = "S";
const BEST_SIGNAL_LOCATION_MARKER = "E";

function parseInput(input: string[]) {
  let startingPosition = [0, 0];
  let bestSignalLocation = [0, 0];

  const map = input.map((r, x) =>
    r.split("").map((c, y) => {
      if (c === CURRENT_POSITION_MARKER) {
        startingPosition = [x, y];
      }
      if (c === BEST_SIGNAL_LOCATION_MARKER) {
        bestSignalLocation = [x, y];
      }
      return c.charCodeAt(0) + CHART_LOWER_OFFSET;
    })
  );

  return {
    startingPosition,
    bestSignalLocation,
    map,
  };
}

const { startingPosition, bestSignalLocation, map } = parseInput(input);

console.log(startingPosition);
console.log(bestSignalLocation);
console.log(map.map((r) => r.join("")));
