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

const tree = buildTree(input);

let sum = 0;

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

function findDirToDelete(tree: MyNode) {
  if (tree.dirsize >= 8381165) {
    console.log(tree.dir, tree.dirsize);
  }

  tree.children.forEach((n) => {
    findDirToDelete(n);
  });
}

function parseTree(tree: MyNode, depth = 0) {
  console.log(Array(depth).join(" ") + "- " + tree.dir + " (dir)");
  tree.files.forEach((f) => {
    console.log(
      Array(depth).join(" ") + `- ${f.filename} (file, size=${f.size})`
    );
  });

  tree.children.forEach((n) => {
    parseTree(n, (depth += 1));
  });
}

indexTree(tree);

// console.log(sum);
console.log(findDirToDelete(tree));
