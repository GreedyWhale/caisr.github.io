/*
 * @Author: MADAO
 * @Date: 2020-08-31 14:35:32
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-17 15:03:29
 * @Description: vite 配置
 */
const path = require('path')

module.exports = {
  base: '/madao.github.io/',
  assetsDir: 'assets',
  alias: {
    '/@/': path.resolve(__dirname, 'src')
  },
  define: {
    ENV: process.env.NODE_ENV
  },
  rollupOutputOptions: {
    manualChunks: (id) => {
      switch (true) {
      case id.includes('highlight.js'):
        return 'highlight'
      default:
        break
      }
    }
  },
  proxy: {
    '/madao.github.io': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/madao.github.io/, '')
    }
  }
}
