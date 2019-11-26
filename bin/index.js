#!/usr/bin/env node	

const version = require('../package').version
const program = require('commander')

program
  .version(version, '-v, --version')
  .usage('[options]')
  .option('-n, --no-sort', 'not need sort')
  .option('-i, --indent <num>', 'indent for json', 2)

program
  .arguments('<command>')
  .action((cmd) => {
    // console.log(cmd)
    program.outputHelp()
  })

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

program.parse(process.argv)

// console.log(program.indent)
// console.log(program.sort)

if (program.sort === false) {

}