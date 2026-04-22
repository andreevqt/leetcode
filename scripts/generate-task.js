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

/**
 * @param {}
 * @return {}
 */
function solution() {
  // TODO: implement
}

function tests() {
  return [
    { input: [], expected: null },
    // { input: [], expected: null },
  ];
}

module.exports = { meta, solution, tests };
`;

fs.writeFileSync(filePath, template, 'utf8');
console.log(`Created: tasks/${fileName}`);
