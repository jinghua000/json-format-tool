const fs = require('fs')
const stringify = require('json-stable-stringify')
const chalk = require('chalk')

function printError (content) {
  console.log(chalk.yellow(`ERROR: ${content}\n`))
}

function format (data, opt = {}) {
  try {
    const space = +opt.indent
    const content = JSON.parse(data.trim())

    return opt.sort 
      ? stringify(content, { space })
      : JSON.stringify(content, null, space)
  } catch (err) {
    printError('parse JSON failed, check your input!')
    console.log(err)
    process.exit(1)
  }
}

function formatFileJSON (file, opt = {}) {
  try {
    const data = format(
      fs.readFileSync(file, 'utf8').trim(),
      opt
    )

    if (opt.replace) {
      fs.writeFileSync(file, data, 'utf8')
    }

    process.stdout.write(data)
  } catch (err) {
    printError('format json-file error!')
    console.log(err)
    process.exit(1)
  }
}
  

function formatStdinJSON (opt = {}) {
  try {
    const stream = process.stdin

    let content = ''

    stream.on('readable', () => {
      let chunk = stream.read()

      if (chunk === null) {
        process.stdout.write(format(
          content,
          opt
        ))
      } else {
        content += chunk
      }
    })
  } catch (err) {
    printError('format stdin-json error!')
    console.log(err)
    process.exit(1)
  }
}

module.exports = {
  printError, 
  formatFileJSON,
  formatStdinJSON,
}