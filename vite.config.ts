/*
 * @Author: MADAO
 * @Date: 2020-08-31 14:35:32
 * @LastEditors: MADAO
 * @LastEditTime: 2021-01-25 17:05:41
 * @Description: vite 配置
 */
import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/madao.github.io/' : '/',
  alias: {
    '/@': path.resolve(__dirname, 'src')
  },
  define: {
    ENV: process.env.NODE_ENV
  },
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      manualChunks: (id: string) => {
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
        rewrite: (path: string) => path.replace(/^\/madao.github.io/, '')
      }
    }
  }
})
