/*
 * @Author: MADAO
 * @Date: 2020-09-03 11:34:49
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-08 14:32:17
 * @Description: 所有文章组件
 */
import * as JSClosure from '/@/articles/javascript/Closure.md'
import * as JSCurrying from '/@/articles/javascript/Currying.md'
import * as JSDataType from '/@/articles/javascript/DataType.md'
import * as JSFunction from '/@/articles/javascript/Function.md'
import * as JSHoisting from '/@/articles/javascript/Hoisting.md'
import * as JSObject from '/@/articles/javascript/Object.md'
import * as JSPrototype from '/@/articles/javascript/Prototype.md'
import * as JSScope from '/@/articles/javascript/Scope.md'
import * as JSThis from '/@/articles/javascript/This.md'
import * as JSThisAndProto from '/@/articles/javascript/ThisAndProto.md'
import * as JSArray from '/@/articles/javascript/Array.md'

import * as CSSREMScope from '/@/articles/css/RemAndScope.md'

import * as MINAGulp from '/@/articles/miniprogram/Gulp.md'

import * as VueCli from '/@/articles/vue/VueCli.md'
import * as Nuxt from '/@/articles/vue/Nuxt.md'
import * as VueComponentTest from '/@/articles/vue/ComponentTest.md'

import * as Calendar from '/@/articles/gadgets/Calendar.md'

import * as PythonSetup from '/@/articles/python/Setup.md'
import * as PythonVariable from '/@/articles/python/Variable.md'

const formatTime = (timeStr: string): string => {
  const reg = /[年月日]+/g
  const date = timeStr.split(' ')
  return `${date[0].replace(reg, '-').slice(0, -1)} ${date[1]}`
}

const articles = [
  CSSREMScope,
  JSScope,
  VueCli,
  VueComponentTest,
  JSHoisting,
  JSClosure,
  JSThis,
  JSObject,
  JSPrototype,
  JSDataType,
  JSFunction,
  JSCurrying,
  JSThisAndProto,
  MINAGulp,
  Nuxt,
  Calendar,
  PythonSetup,
  PythonVariable,
  JSArray
]

articles.sort((a, b) => {
  return new Date(formatTime(b.attributes.time)).getTime() - new Date(formatTime(a.attributes.time)).getTime()
})

export default articles
