const { memoryUsage } = require('process');
const profiler = require('gc-profiler');
const fs = require('fs');

profiler.on('gc', function(info) {
  // console.log(info);
});

function toMb(num) {
  return Math.round((num / 1024 / 1024) * 100) / 100;
}

function memSnapshot() {
  const mu = memoryUsage();

  return {
    date: +(new Date()),
    used: toMb(mu.heapUsed),
    total: toMb(mu.heapTotal)
  };
}

const CSV_HEADER = 'used, total, date';

function executor(exec, runs, interval) {
  new Promise(s => s(memSnapshot('all'))).then(
    (bf) => new Promise(s => {
      let record = [];
      for (let y = 0; y < 8; y++) {
	let i = setInterval(() => {
	  const before = memSnapshot();
	  const iterations = Math.round(Math.random() * 1e6);

	  for (let x = 0; x < iterations; x++) {
	    exec();
	  }

	  const after = memSnapshot();

	  record.push({ before, after });

	  if (record.length === runs) {
	    s([bf, record]);
	  }
	}, Math.round(Math.random() * interval));
      }
    })
  ).then(data => {
    const [before, records] = data;

    const after = memSnapshot('all');

    let content = CSV_HEADER;

    function write(acc, { used, total, date }) {
      return `${acc}
${used},${total},${date}`;
    }

    content = write(content, before);

    content = records.reduce((acc, { before, after }) => {
      return write(write(acc, before), after);
    }, content);

    content = write(content, after);

    fs.writeFile(`${exec.name}-${interval}.csv`, content, function() {
      console.log(content);
      process.exit(0);
    });
  });
}

module.exports = executor;
