/*
 * @Author: MADAO
 * @Date: 2020-08-31 14:35:32
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-17 12:44:06
 * @Description: vite 配置
 */
const mdPlugin = require('vite-plugin-markdown')
const path = require('path')
const { getEntries } = require('./build')

module.exports = {
  base: '/caisr.github.io/',
  assetsDir: 'assets',
  alias: {
    '/@/': path.resolve(__dirname, 'src')
  },
  define: {
    GLOBAL_ARTICLES: getEntries()
  },
  rollupOutputOptions: {
    manualChunks: (id) => {
      switch (true) {
      case id.includes('.md'):
        return 'article_vendor'
      case id.includes('highlight.js'):
        return 'highlight'
      default:
        break
      }
    }
  },
  plugins: [mdPlugin({
    mode: ['vue']
  })]
}
