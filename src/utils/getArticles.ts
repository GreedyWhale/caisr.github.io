/*
 * @Author: MADAO
 * @Date: 2020-09-03 11:34:49
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-08 11:45:46
 * @Description: 所有文章组件
 */
import * as Closure from '/@/articles/javascript/Closure.md'
import * as Currying from '/@/articles/javascript/Currying.md'
import * as DataType from '/@/articles/javascript/DataType.md'
import * as JSFunction from '/@/articles/javascript/Function.md'
import * as Hoisting from '/@/articles/javascript/Hoisting.md'
import * as JSObject from '/@/articles/javascript/Object.md'
import * as Prototype from '/@/articles/javascript/Prototype.md'
import * as Scope from '/@/articles/javascript/Scope.md'
import * as This from '/@/articles/javascript/This.md'
import * as ThisAndProto from '/@/articles/javascript/ThisAndProto.md'
import * as JSArray from '/@/articles/javascript/Array.md'

import * as CSSREMScope from '/@/articles/css/RemAndScope.md'

import * as MINAGulp from '/@/articles/miniprogram/Gulp.md'

import * as VueCli from '/@/articles/vue/VueCli.md'
import * as Nuxt from '/@/articles/vue/Nuxt.md'
import * as VueComponentTest from '/@/articles/vue/ComponentTest.md'

import * as Calendar from '/@/articles/gadgets/Calendar.md'

import * as PythonSetup from '/@/articles/python/Setup.md'

const formatTime = (timeStr: string): string => {
  const reg = /[年月日]+/g
  return timeStr.replace(reg, '-').slice(0, -1)
}

const articles = [
  Closure,
  Currying,
  DataType,
  JSFunction,
  Hoisting,
  JSObject,
  Prototype,
  Scope,
  This,
  ThisAndProto,
  JSArray,
  CSSREMScope,
  MINAGulp,
  Nuxt,
  VueCli,
  VueComponentTest,
  Calendar,
  PythonSetup
]

articles.sort((a, b) => {
  return new Date(formatTime(b.attributes.time)).getTime() - new Date(formatTime(a.attributes.time)).getTime()
})

export default articles
