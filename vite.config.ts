/*
 * @Author: MADAO
 * @Date: 2020-08-31 14:35:32
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-17 15:03:29
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
    format: 'file',
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
  })],
  proxy: {
    '/caisr.github.io': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/caisr.github.io/, '')
    }
  }
}
