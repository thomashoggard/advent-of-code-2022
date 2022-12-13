export async function draw<T>(graph: T[][], coords: Coords[], current: Coords) {
  const m = graph.map((r) => [...r]);

  for (let i = 0; i < coords.length; i++) {
    let render = "";
    const [row, col] = coords[i];

    m[row][col] = `~`;

    m.forEach((r, ri) => {
      render +=
        r
          .map((c, ci) => {
            if (ri === current[0] && ci === current[1]) {
              return "#";
            }
            return c === "~"
              ? "~"
              : String.fromCharCode(c - CHART_LOWER_OFFSET);
          })
          .join("") + "\n";
    });
    console.clear();
    console.log(render);
  }
}
