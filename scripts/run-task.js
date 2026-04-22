const path = require('path');

const taskNum = process.argv[2];

if (!taskNum || isNaN(Number(taskNum))) {
  console.error('Usage: npm run test-task <task number>');
  console.error('Example: npm run test-task 1');
  process.exit(1);
}

const taskFile = path.join(__dirname, '..', 'tasks', `task-${taskNum}.js`);

let taskModule;
try {
  taskModule = require(taskFile);
} catch (e) {
  if (e.code === 'MODULE_NOT_FOUND') {
    console.error(`Task file not found: tasks/task-${taskNum}.js`);
    process.exit(1);
  }
  throw e;
}

const { meta, solution, Solution, tests } = taskModule;

if (meta && meta.title) {
  console.log(`\n📋 Task #${taskNum}: ${meta.title} [${meta.difficulty}]`);
  console.log(`🔗 ${meta.link}\n`);
}

const isClassMode = typeof Solution === 'function';
const suite = tests();
// support both old plain-array format and new { type, cases } format
const cases = Array.isArray(suite) ? suite : suite.cases;

let passed = 0;
let total = 0;

if (isClassMode) {
  for (const [caseIdx, ops] of cases.entries()) {
    const instance = new Solution();
    let casePassed = true;

    for (const [opIdx, { method, args, expected }] of ops.entries()) {
      const start = performance.now();
      const result = instance[method](...args);
      const elapsed = (performance.now() - start).toFixed(3);

      const ok = JSON.stringify(result) === JSON.stringify(expected);
      const label = `Case ${caseIdx + 1}, op ${opIdx + 1} [${method}]`;
      console.log(`${label}: ${ok ? '✅ PASS' : '❌ FAIL'} (${elapsed}ms)`);
      if (!ok) {
        console.log(`  Args:     ${JSON.stringify(args)}`);
        console.log(`  Expected: ${JSON.stringify(expected)}`);
        console.log(`  Got:      ${JSON.stringify(result)}`);
        casePassed = false;
      }
    }

    total++;
    if (casePassed) passed++;
  }
} else {
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
    total++;
  }
}

console.log(`\n${passed}/${total} tests passed`);
