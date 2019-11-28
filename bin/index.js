#!/usr/bin/env node	

const version = require('../package').version
const program = require('commander')
const chalk = require('chalk')
const log = console.log.bind(console)
const helper = program.outputHelp.bind(program)

const CLI_NAME = 'json-format-tool'

program
  .version(version, '-v, --version')
  .name(CLI_NAME)
  .usage('[options] <json-file> ' + chalk.yellow('OR') + ` <output-some-json> | ${CLI_NAME}`)
  .option('-n, --no-sort', 'not need sort keys')
  .option('-i, --indent <num>', 'indent for json', 2)
  .action((cmd, obj = []) => {
    if (!obj.length && process.stdin.isTTY) {
      log(chalk.cyan('Try format your JSON!\n'))
      helper()
    }

    if (obj.length > 1) {
      log(chalk.yellow('ERROR: More than one file supplied!\n'))
      helper()
      process.exit(1)
    }

    // process.stdin.isTTY ? 
  })
  
program.parse(process.argv)