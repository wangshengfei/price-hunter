const chalk = require('chalk');

module.exports = {
  log(message) {
    console.log(chalk.green(message))
  }
}