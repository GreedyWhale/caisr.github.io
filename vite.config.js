/*
 * @Author: MADAO
 * @Date: 2020-08-31 14:35:32
 * @LastEditors: MADAO
 * @LastEditTime: 2020-08-31 15:48:04
 * @Description: vite 配置
 */
const Mode = require('frontmatter-markdown-loader/mode')

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('frontmatter-markdown-loader')
      .loader('frontmatter-markdown-loader')
      .tap(options => {
        console.log(options)
        return {
          mode: [Mode.VUE_COMPONENT]
        }
      })
  }
}
