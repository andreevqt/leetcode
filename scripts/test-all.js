const fs = require('fs');
const path = require('path');

const tasksDir = path.join(__dirname, '..', 'tasks');

const taskFiles = fs.readdirSync(tasksDir)
  .filter(f => /^task-\d+\.js$/.test(f))
  .sort((a, b) => {
    const na = parseInt(a.match(/^task-(\d+)\.js$/)[1], 10);
    const nb = parseInt(b.match(/^task-(\d+)\.js$/)[1], 10);
    return na - nb;
  });

if (taskFiles.length === 0) {
  console.log('No task files found in tasks/');
  process.exit(0);
}

let totalPassed = 0;
let totalCases = 0;
let totalTasks = 0;
let failedTasks = 0;

for (const file of taskFiles) {
  const taskNum = file.match(/^task-(\d+)\.js$/)[1];
  const taskFile = path.join(tasksDir, file);

  let taskModule;
  try {
    taskModule = require(taskFile);
  } catch (e) {
    console.error(`❌ Error loading tasks/${file}: ${e.message}`);
    failedTasks++;
    continue;
  }

  const { meta, solution, Solution, tests } = taskModule;
  const title = meta && meta.title ? meta.title : '(untitled)';
  const difficulty = meta && meta.difficulty ? meta.difficulty : '?';

  const suite = tests();
  const cases = Array.isArray(suite) ? suite : suite.cases;
  const isClassMode = typeof Solution === 'function';

  let passed = 0;
  const caseCount = cases.length;

  if (isClassMode) {
    for (const ops of cases) {
      const instance = new Solution();
      const allOpsPass = ops.every(({ method, args, expected }) => {
        const result = instance[method](...args);
        return JSON.stringify(result) === JSON.stringify(expected);
      });
      if (allOpsPass) passed++;
    }
  } else {
    for (const { input, expected } of cases) {
      const result = solution(...input);
      if (JSON.stringify(result) === JSON.stringify(expected)) passed++;
    }
  }

  const allPass = passed === caseCount;
  const status = allPass ? '✅' : '❌';
  const typeLabel = isClassMode ? '🏗️' : '🔧';
  console.log(`${status} ${typeLabel} Task #${taskNum} [${difficulty}] ${title} — ${passed}/${caseCount} tests`);

  totalPassed += passed;
  totalCases += caseCount;
  totalTasks++;
  if (!allPass) failedTasks++;
}

console.log(`\n${'─'.repeat(50)}`);
console.log(`Tasks:  ${totalTasks - failedTasks}/${totalTasks} fully passing`);
console.log(`Tests:  ${totalPassed}/${totalCases} passed`);
