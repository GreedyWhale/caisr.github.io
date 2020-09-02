/*
 * @Author: MADAO
 * @Date: 2020-09-01 10:04:59
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-02 18:01:36
 * @Description: 获取所有文章文件名
 */
const path = require('path')
const fs = require('fs')

const getEntries = () => {
  const entries = {}
  const rootPath = 'src/articles'
  fs.readdirSync(path.resolve(rootPath)).forEach(dir => {
    entries[dir] = fs.readdirSync(`${rootPath}/${dir}`)
  })
  return JSON.stringify(entries)
}

module.exports = {
  getEntries
}
