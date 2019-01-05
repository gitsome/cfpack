const Runner = require('../src/Runner');
const BuildTask = require('../src/tasks/Build');

module.exports = function(args) {
	const runner = new Runner(args);
	const build = new BuildTask();
	
	runner.loadConfig();
	runner.chain([build]);
	runner.execute();
};