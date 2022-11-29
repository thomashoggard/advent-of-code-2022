import * as path from "https://deno.land/std/path/mod.ts";

export function readFile(fileName: string) {
  return Deno.readTextFileSync(
    path.join(path.dirname(path.fromFileUrl(import.meta.url)), fileName)
  );
}
