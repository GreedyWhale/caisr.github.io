const path = require('path')
const fs = require('fs')

const getEntries = () => {
  const entries = {}
  const rootPath = 'src/articles'
  fs.readdirSync(path.resolve(rootPath)).forEach(dir => {
    entries[dir] = fs.readdirSync(`${rootPath}/${dir}`)
  })
  return entries
}

module.exports = {
  getEntries
}
