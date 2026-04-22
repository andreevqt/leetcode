# LeetCode Solutions

Personal collection of LeetCode problem solutions written in JavaScript.
Each task lives in its own file under `tasks/` with a self-contained solution and test cases.

## About

- **Language:** JavaScript (Node.js)
- **Structure:** one file per task — `tasks/task-N.js`
- **Testing:** built-in test runner, no external dependencies
- **Workflow:** generate a task template → implement `solution()` → fill in `tests()` → run tests

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

## Task Template

Each generated file exports:

```js
const meta = {
  title: 'Two Sum',
  link: 'https://leetcode.com/problems/two-sum/',
  difficulty: 'Easy', // Easy | Medium | Hard
  tags: ['Array', 'HashMap'],
};

function solution(nums, target) {
  // implement here
}

function tests() {
  return [
    { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
  ];
}

module.exports = { meta, solution, tests };
```

## Usage

```bash
# Generate a new task template
npm run generate-task

# Run tests for a specific task (with timing)
npm run test-task <N>

# Run tests for all tasks
npm run test-all

# Watch a task file and re-run tests on save
npm run watch <N>
```
