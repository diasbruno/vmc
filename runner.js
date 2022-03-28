const vmc = require('./vmc.js');

function rawIf() {
  const word = 'ok';
  if (word === 'fail' || word === '' || word === 'ok');
}

function arrayInclude() {
  const word = 'ok';
  if (['fail', '', 'a', 'b', 'c', 'ok'].includes(word));
}

const aio = ['a', 'b', 'c', 'd', 'ok'];

function arrayIncludeOptimized() {
  const word = 'ok';
  if (aio.includes(word));
}

function destructuring() {
  ({ a: 1, ...(true && { b: 2 }) });
}

const objectInject = { b: 2 };

function destructuringOptimized() {
  ({ a: 1, ...(true && objectInject) });
}

function assign() {
  let o = { a: 1 };
  true && (o['b'] = 2);
}

const [program, script, target, runs, interval, ...rest] = process.argv

const targets = [
  rawIf,
  arrayInclude,
  arrayIncludeOptimized,
  destructuring,
  destructuringOptimized,
  assign,
];

if (target === "help") {
  console.log("node runner.js [target] [runs] [interval]\n");
  console.log("targets:");
  targets.forEach((target, index) => console.log(index.toString(), target.name));
  process.exit(0);
}

const run = targets[target];

console.log("Running:", runs, interval);
console.log(run.toString());

vmc(run, parseInt(runs), parseInt(interval));
