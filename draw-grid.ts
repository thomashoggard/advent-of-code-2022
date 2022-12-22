export function drawGrid(
  map: number[][],
  cell: (x: number, y: number) => unknown
) {
  let printedMap = "";
  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[r].length; c++) {
      printedMap += map[r][c];
    }
    printedMap += "\n";
  }
  console.log(printedMap);
}
