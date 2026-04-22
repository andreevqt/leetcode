# LeetCode Solutions

Personal collection of LeetCode / NeetCode problem solutions written in JavaScript.
Each task lives in its own file under `tasks/` with a self-contained solution and test cases.

## About

- **Language:** JavaScript (Node.js)
- **Structure:** one file per task — `tasks/task-N.js`
- **Testing:** built-in test runner, no external dependencies
- **Workflow:** generate a task template → implement solution → fill in `tests()` → run tests

## Project Structure

```
leetcode/
├── tasks/
│   └── task-N.js       # one file per problem
├── scripts/
│   ├── generate-task.js
│   ├── run-task.js
│   └── test-all.js
└── package.json
```

## Task Types

The runner auto-detects the task type based on what the file exports:
- exports `solution` (function) → **function mode** 🔧
- exports `Solution` (class) → **class mode** 🏗️

### Function-based (classic LeetCode)

`tests()` returns an array of `{ input, expected }` objects:

```js
const meta = {
  title: 'Two Sum',
  link: 'https://leetcode.com/problems/two-sum/',
  difficulty: 'Easy',
  tags: ['Array', 'HashMap'],
};

function solution(nums, target) {
  // implement here
}

function tests() {
  return [
    { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
    { input: [[3, 2, 4], 6],      expected: [1, 2] },
  ];
}

module.exports = { meta, solution, tests };
```

### Class-based (design problems, e.g. NeetCode)

`tests()` returns an array of test cases, where each case is an array of operations
executed sequentially on a **fresh `Solution` instance**:

```js
const meta = {
  title: 'Design Singly Linked List',
  link: 'https://neetcode.io/problems/singlyLinkedList/question',
  difficulty: 'Easy',
  tags: ['LinkedList', 'Design'],
};

class Solution {
  constructor() {}

  insertHead(val) { /* ... */ }
  get(index)      { /* ... */ }
  remove(index)   { /* ... */ }
}

function tests() {
  return [
    // case 1 — fresh instance
    [
      { method: 'insertHead', args: [1], expected: undefined },
      { method: 'insertHead', args: [2], expected: undefined },
      { method: 'get',        args: [0], expected: 2 },
      { method: 'remove',     args: [1], expected: true },
    ],
    // case 2 — another fresh instance
    [
      { method: 'insertHead', args: [5], expected: undefined },
      { method: 'get',        args: [0], expected: 5 },
    ],
  ];
}

// Export Solution (capital S) — runner detects class mode automatically
module.exports = { meta, Solution, tests };
```

## Usage

```bash
# Generate a new task template
npm run generate-task

# Run tests for a specific task (with per-test timing)
npm run test-task <N>

# Run tests for all tasks and print a summary
npm run test-all

# Watch a task file and re-run tests on every save
npm run watch <N>
```
