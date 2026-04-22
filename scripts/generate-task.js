const fs = require('fs');
const path = require('path');

const tasksDir = path.join(__dirname, '..', 'tasks');

// Ensure tasks directory exists
if (!fs.existsSync(tasksDir)) {
  fs.mkdirSync(tasksDir, { recursive: true });
}

// Find the next task number
const existing = fs.readdirSync(tasksDir)
  .filter(f => /^task-\d+\.js$/.test(f))
  .map(f => parseInt(f.match(/^task-(\d+)\.js$/)[1], 10));

const nextNum = existing.length > 0 ? Math.max(...existing) + 1 : 1;
const fileName = `task-${nextNum}.js`;
const filePath = path.join(tasksDir, fileName);

const template = `const meta = {
  title: '',
  link: 'https://leetcode.com/problems/',
  difficulty: 'Easy', // Easy | Medium | Hard
  tags: [],
};

// ─── Option A: single function ────────────────────────────────────────────────

/**
 * @param {}
 * @return {}
 */
function solution() {
  // TODO: implement
}

// ─── Option B: design / class-based ──────────────────────────────────────────

// class Solution {
//   constructor() {}
//
//   method() {
//     // TODO: implement
//   }
// }

// ─── Tests ────────────────────────────────────────────────────────────────────

function tests() {
  // --- Option A: function-based ---
  return {
    type: 'function',
    cases: [
      { input: [], expected: null },
      // { input: [], expected: null },
    ],
  };

  // --- Option B: class-based ---
  // Each case is a sequence of operations on a fresh instance.
  // return {
  //   type: 'class',
  //   factory: () => new Solution(),
  //   cases: [
  //     [
  //       { method: 'someMethod', args: [1], expected: null },
  //       { method: 'someMethod', args: [2], expected: 3 },
  //     ],
  //   ],
  // };
}

module.exports = { meta, solution, tests };
`;

fs.writeFileSync(filePath, template, 'utf8');
console.log(`Created: tasks/${fileName}`);
