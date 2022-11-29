const text = Deno.readTextFileSync("./test/input");
console.log(text);

type Test = {
  hi: string;
};

function a(a: Test) {
  console.log(a);
}

a(1);
