const DAY = 7;

const input = Deno.readTextFileSync(`./day${DAY}/input`)
  .split("\n")
  .slice(0, -1);

type File = {
  size: number;
  filename: string;
};

class MyNode {
  parent?: MyNode;
  children: MyNode[] = [];
  dir: string;
  files: File[] = [];
  dirsize = 0;

  constructor(dir: string, parent?: MyNode) {
    this.dir = dir;
    this.parent = parent;
  }
}

function buildTree(input: string[]) {
  const root = new MyNode("/");
  let cwd = root;

  for (let i = 0; i < input.length; i++) {
    const line = input[i];

    if (line.includes("$")) {
      const [_, command, arg] = line.split(" ");

      switch (command) {
        case "cd": {
          switch (arg) {
            case "/": {
              cwd = root;
              break;
            }
            case "..": {
              if (!cwd.parent) {
                throw new Error(`Child dir ${arg} doesn't have a parent`);
              }
              cwd = cwd.parent;
              break;
            }
            default: {
              const dirNode = cwd.children.find((n) => n.dir === arg);
              if (!dirNode) {
                throw new Error(`Node doesn't exist for directory ${arg}`);
              }
              cwd = dirNode;
            }
          }
          break;
        }
        case "ls": {
          do {
            i++;
            if (input[i].includes("dir")) {
              const [_, dirname] = input[i].split(" ");
              cwd.children.push(new MyNode(dirname, cwd));
            } else {
              const [size, filename] = input[i].split(" ");
              cwd.files.push({ size: Number(size), filename });
            }
          } while (i + 1 < input.length && !input[i + 1].includes("$"));
          break;
        }
      }
    }
  }

  return root;
}

function indexTree(tree: MyNode) {
  let totalsize = 0;

  const filesizesum = tree.files.reduce((size, f) => size + f.size, 0);
  totalsize += filesizesum;

  tree.children.forEach((n) => {
    const dirsize = indexTree(n);
    totalsize += dirsize;
  });

  tree.dirsize = totalsize;

  return totalsize;
}

function searchTree(tree: MyNode, matcher: (node: MyNode) => boolean) {
  const files: MyNode[] = [];

  if (matcher(tree)) {
    files.push(tree);
  }

  tree.children.forEach((n) => {
    files.push(...searchTree(n, matcher));
  });

  return files;
}

function parseTree(tree: MyNode, depth = 0) {
  console.log(
    `${Array(depth).join(" ")} - ${tree.dir} (dir, size=${tree.dirsize})`
  );
  tree.children.forEach((n) => {
    parseTree(n, depth + 1);
  });
  tree.files.forEach((f) => {
    console.log(
      Array(depth + 1).join(" ") + ` - ${f.filename} (file, size=${f.size})`
    );
  });
}

const tree = buildTree(input);
indexTree(tree);
// parseTree(tree);

// Part 1
console.log(
  "Part 1:",
  searchTree(tree, (node) => node.dirsize <= 100000)
    .map((n) => n.dirsize)
    .reduce((sum, size) => sum + size, 0)
);

// Part 2
const FILE_SYSTEM_SIZE = 70000000;
const UPDATE_SIZE = 30000000;
const freeSpace = FILE_SYSTEM_SIZE - tree.dirsize;
const increaseSize = UPDATE_SIZE - freeSpace;

console.log(
  "Part 2:",
  Math.min(
    ...searchTree(tree, (node) => node.dirsize >= increaseSize).map(
      (n) => n.dirsize
    )
  )
);
