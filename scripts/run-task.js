const path = require('path');

const taskNum = process.argv[2];

if (!taskNum || isNaN(Number(taskNum))) {
  console.error('Usage: npm run test-task <task number>');
  console.error('Example: npm run test-task 1');
  process.exit(1);
}

const taskFile = path.join(__dirname, '..', 'tasks', `task-${taskNum}.js`);

let meta, solution, tests;
try {
  ({ meta, solution, tests } = require(taskFile));
} catch (e) {
  if (e.code === 'MODULE_NOT_FOUND') {
    console.error(`Task file not found: tasks/task-${taskNum}.js`);
    process.exit(1);
  }
  throw e;
}

if (meta && meta.title) {
  console.log(`\n📋 Task #${taskNum}: ${meta.title} [${meta.difficulty}]`);
  console.log(`🔗 ${meta.link}\n`);
}

const cases = tests();
let passed = 0;

for (const [i, { input, expected }] of cases.entries()) {
  const start = performance.now();
  const result = solution(...input);
  const elapsed = (performance.now() - start).toFixed(3);

  const ok = JSON.stringify(result) === JSON.stringify(expected);
  console.log(`Test ${i + 1}: ${ok ? '✅ PASS' : '❌ FAIL'} (${elapsed}ms)`);
  if (!ok) {
    console.log(`  Input:    ${JSON.stringify(input)}`);
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(result)}`);
  } else {
    passed++;
  }
}

console.log(`\n${passed}/${cases.length} tests passed`);
