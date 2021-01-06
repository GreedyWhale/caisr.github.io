/*
 * @Author: MADAO
 * @Date: 2020-08-31 14:35:32
 * @LastEditors: MADAO
 * @LastEditTime: 2021-01-06 17:38:22
 * @Description: vite 配置
 */
import path from 'path'

export default {
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
