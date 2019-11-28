const fs = require('fs-extra')
const stringify = require('json-stable-stringify')

// TODO 
// change to fs readSync
// extract common function

exports.formatFileJSON = (file, opt) => {
  const data = fs.readJSONSync(file)
  const space = +opt.indent

  process.stdout.write(
    opt.sort 
      ? stringify(data, { space })
      : JSON.stringify(data, null, space)
  )
}

exports.formatStdinJSON = opt => {
  const stream = process.stdin
  const space = +opt.indent

  let content = ''

  stream.on('readable', () => {
    let chunk = stream.read()

    if (chunk === null) {
      process.stdout.write(
        opt.sort 
          ? stringify(JSON.parse(content.trim()), { space })
          : JSON.stringify(JSON.parse(content.trim()), null, space)
      )
    } else {
      content += chunk
    }
  })
}