#!/usr/bin/env node	

const version = require('../package').version
const program = require('commander')
const chalk = require('chalk')
const { formatFileJSON, formatStdinJSON, printError } = require('../lib')

const CLI_NAME = 'json-format-tool'
const exit = () => {
  program.outputHelp()
  process.exit(1)
}

program
  .version(version, '-v, --version')
  .name(CLI_NAME)
  .usage('[options] <json-file> ' + chalk.yellow('OR') + ` <output-json> | ${CLI_NAME}`)
  .option('-r, --replace', 'replace the file directly, only works in <json-file> mode')
  .option('-i, --indent <num>', 'indent for json', 2)
  .option('--no-sort', 'not need sort keys')
  .action((cmd, args = []) => {
    if (!args.length && process.stdin.isTTY) {
      console.log(chalk.cyan('Try format your JSON!\n'))
      exit()
    }

    if (args.length > 1) {
      printError('more than one file supplied!')
      exit()
    }

    process.stdin.isTTY 
      ? formatFileJSON(args[0], cmd)
      : formatStdinJSON(cmd)
  })
  
program.parse(process.argv)