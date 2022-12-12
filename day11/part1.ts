const DAY = 11;

const input = Deno.readTextFileSync(`./day${DAY}/input`)
  .split("\n")
  .slice(0, -1);

type MonkeyId = number;
type Operation = {
  operator: "+" | "*";
  operand: "old" | number;
};

type Monkey = {
  id: MonkeyId;
  inspected: number;
  startingItems: number[];
  operation: Operation;
  test: {
    divisibleBy: number;
    // Index 0: True, Index 1: False
    throwTo: [MonkeyId, MonkeyId];
  };
};

function parseInput(input: string[]) {
  const instructions = [];
  do {
    const instruction = input.splice(0, 7);

    instructions.push(instruction);
  } while (input.length > 0);

  const monkeys: Monkey[] = [];
  instructions.forEach((instruction) => {
    const id = instruction.shift()!.match(/\d/)!.map(Number)[0];
    const startingItems = instruction
      .shift()!
      .match(/Starting items: (.+)/)![1]
      .split(", ")
      .map(Number);

    const operation = instruction
      .shift()!
      .match(/\w+ = \w+ ([\*,\+]) ([\w,\d]+)/)!
      .slice(1)
      .reduce<Operation>((r, v, i) => {
        if (i === 0) {
          return { ...r, operator: v as Operation["operator"] };
        }
        if (i === 1) {
          return { ...r, operand: v === "old" ? "old" : Number(v) };
        }
        throw new Error("Unexpected index on operation parsing");
      }, {} as Operation);

    const divisibleBy = instruction.shift()!.match(/\d+/)!.map(Number)[0];

    const throwToIfTrue = instruction.shift()!.match(/\d+/)!.map(Number)[0];
    const throwToIfFalse = instruction.shift()!.match(/\d+/)!.map(Number)[0];

    monkeys.push({
      id,
      inspected: 0,
      startingItems,
      operation,
      test: {
        divisibleBy,
        throwTo: [throwToIfTrue, throwToIfFalse],
      },
    });
  });

  return monkeys;
}

function executeRound(monkeys: Monkey[], rounds: number, bored: boolean) {
  let mod = monkeys[0].test.divisibleBy;
  for (let i = 1; i < monkeys.length; i++) {
    mod *= monkeys[i].test.divisibleBy;
  }

  for (let r = 0; r < rounds; r++) {
    for (let i = 0; i < monkeys.length; i++) {
      const monkey = monkeys[i];

      const startingItems = monkey.startingItems;
      monkey.startingItems = [];

      // Adjust worry levels
      for (let j = 0; j < startingItems.length; j++) {
        monkey.inspected++;
        let worryLevel = startingItems[j];

        const operand =
          monkey.operation.operand === "old"
            ? worryLevel
            : monkey.operation.operand;

        switch (monkey.operation.operator) {
          case "+": {
            worryLevel = worryLevel + operand;
            break;
          }
          case "*": {
            worryLevel = worryLevel * operand;
            break;
          }
        }

        if (bored) {
          worryLevel = Math.floor(worryLevel / 3);
        } else {
          worryLevel = worryLevel % mod;
        }

        if (worryLevel % monkey.test.divisibleBy) {
          monkeys[monkey.test.throwTo[1]].startingItems.push(worryLevel);
        } else {
          monkeys[monkey.test.throwTo[0]].startingItems.push(worryLevel);
        }
      }
    }
  }
}

const monkeys = parseInput(input);

executeRound(monkeys, 10000, false);
// executeRound(monkeys, 20, true);

console.log(monkeys);
const inspected = monkeys
  .map((m) => m.inspected)
  .sort((a, b) => {
    if (a > b) return -1;
    if (a > b) return 1;
    return 0;
  });

console.log("Part 1:", inspected[0] * inspected[1]);
