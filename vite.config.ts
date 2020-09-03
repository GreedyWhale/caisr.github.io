/*
 * @Author: MADAO
 * @Date: 2020-08-31 14:35:32
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-03 10:46:33
 * @Description: vite 配置
 */
const mdPlugin = require('vite-plugin-markdown')
const path = require('path')
const { getEntries } = require('./build')

module.exports = {
  alias: {
    '/@/': path.resolve(__dirname, 'src')
  },
  define: {
    GLOBAL_ARTICLES: getEntries()
  },
  plugins: [mdPlugin({
    mode: ['vue']
  })]
}
