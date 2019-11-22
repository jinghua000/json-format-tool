#!/usr/bin/env node	

console.log('hello')

const version = require('../package').version
const program = require('commander')

program
  .version(version, '-v, --version')

program
  .command('create')
  .action(console.log)

program.parse(process.argv)
