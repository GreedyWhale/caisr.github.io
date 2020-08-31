/*
 * @Author: MADAO
 * @Date: 2020-08-31 14:35:32
 * @LastEditors: MADAO
 * @LastEditTime: 2020-08-31 16:35:50
 * @Description: vite 配置
 */
const mdPlugin = require('vite-plugin-markdown')

module.exports = {
  plugins: [mdPlugin({
    mode: ['vue']
  })]
}
