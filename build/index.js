/*
 * @Author: MADAO
 * @Date: 2020-09-01 10:04:59
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-19 16:10:20
 * @Description: 获取所有文章文件名
 */
const path = require('path')
const fs = require('fs')

const getEntries = () => {
  const entries = {}
  const rootPath = 'src/articles'
  fs.readdirSync(path.resolve(rootPath)).forEach(firstDir => {
    const item = fs.readdirSync(path.resolve(`${rootPath}/${firstDir}`)).map(secondDir => ({
      secondDir,
      articleNumber: fs.readdirSync(path.resolve(`${rootPath}/${firstDir}/${secondDir}`)).length
    }))
    entries[firstDir] = []
    entries[firstDir].push(...item)
  })
  return JSON.stringify(entries)
}

module.exports = {
  getEntries
}
