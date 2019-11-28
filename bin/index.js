#!/usr/bin/env node	

const version = require('../package').version
const program = require('commander')
const chalk = require('chalk')
const { formatFileJSON, formatStdinJSON } = require('../lib')

const CLI_NAME = 'json-format-tool'

program
  .version(version, '-v, --version')
  .name(CLI_NAME)
  .usage('[options] <json-file> ' + chalk.yellow('OR') + ` <output-json> | ${CLI_NAME}`)
  .option('-n, --no-sort', 'not need sort keys')
  .option('-r, --replace', 'replace the file directly, only <json-file> mode')
  .option('-i, --indent <num>', 'indent for json', 2)
  .action((cmd, obj = []) => {
    if (!obj.length && process.stdin.isTTY) {
      console.log(chalk.cyan('Try format your JSON!\n'))
      program.outputHelp()
      process.exit(1)
    }

    if (obj.length > 1) {
      console.log(chalk.yellow('ERROR: More than one file supplied!\n'))
      program.outputHelp()
      process.exit(1)
    }

    process.stdin.isTTY 
      ? formatFileJSON(obj[0], cmd)
      : formatStdinJSON(cmd)
  })
  
program.parse(process.argv)