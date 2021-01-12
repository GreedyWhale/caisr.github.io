/*
 * @Author: MADAO
 * @Date: 2020-08-31 14:35:32
 * @LastEditors: MADAO
 * @LastEditTime: 2021-01-12 14:23:10
 * @Description: vite 配置
 */
import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  alias: {
    '/@': path.resolve(__dirname, 'src')
  },
  define: {
    ENV: process.env.NODE_ENV
  },
  build: {
    base: '/madao.github.io/',
    assetsDir: 'assets',
    rollupOptions: {
      manualChunks: (id) => {
        switch (true) {
        case id.includes('highlight.js'):
          return 'highlight'
        default:
          break
        }
      }
    }
  },
  server: {
    proxy: {
      '/madao.github.io': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/madao.github.io/, '')
      }
    }
  }
})
