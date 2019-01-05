const path = require('path');
const chalk = require('chalk');

const Logger = require('./Logger');

class Runner {

	constructor(args) {
		this.args = args;
		this.tasks = [];
	}

	loadConfig() {
		const { args } = this;
		const configPath = path.isAbsolute(args.config)
			? args.config
			: path.resolve(process.cwd(), args.config);

		try {
			const config = require(configPath);
			this.args = Object.assign({}, config, args);
		} catch (e) {
			process.stderr.write(chalk.red('Config file hasn\'t been found.\n'));
			process.exit(1);
		}
	}

	chain(tasks) {
		this.tasks = tasks;
	}

	execute() {
		this.log = new Logger(this.args.silent, this.args.verbose);
		this.tasks.reduce(this.executeTask.bind(this), {});
	}

	executeTask(artifacts, task) {
		task.setOptions(this.args);
		task.setLogger(this.log);
		task.setInputArtifacts(artifacts);

		task.run();
		
		return task.getOutputArtifacts();
	}

}

module.exports = Runner;