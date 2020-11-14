/*
 * @Author: MADAO
 * @Date: 2020-08-31 16:14:44
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-18 10:54:02
 * @Description: eslint config
 */
module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  globals: {
    ENV: 'readonly'
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'vue/valid-template-root': 'off',
    'import/no-absolute-path': 'off',
    indent: ['error', 2],
    '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'no-unused-vars': 'off',
    'prefer-promise-reject-errors': 'off',
    'vue/no-template-key': 'off',
    'vue/require-v-for-key': 'off'
  }
}
