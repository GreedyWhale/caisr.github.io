/*
 * @Author: MADAO
 * @Date: 2020-09-03 11:34:49
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-09 15:56:53
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
import * as PythonStringAndNumber from '/@/articles/python/StringAndNumber.md'
import * as PythonList from '/@/articles/python/list.md'
import * as PythonIf from '/@/articles/python/If.md'
import * as PythonInputAndWhile from '/@/articles/python/InputAndWhile.md'
import * as PythonFunction from '/@/articles/python/Function.md'
import * as PythonClass from '/@/articles/python/Class.md'
import * as PythonFileAndError from '/@/articles/python/FileAndError.md'
import * as PythonDecodeAndEncode from '/@/articles/python/DecodeAndEncode.md'
import * as PythonDataStore from '/@/articles/python/DataStore.md'
import * as PythonTestCode from '/@/articles/python/TestCode.md'
import * as PythonPipenv from '/@/articles/python/Pipenv.md'
import * as PythonCrawler from '/@/articles/python/Crawler.md'
import * as PythonSendEmail from '/@/articles/python/SendEmail.md'
import * as PythonScope from '/@/articles/python/Scope.md'
import * as PythonLambda from '/@/articles/python/Lambda.md'
import * as PythonArrayMethods from '/@/articles/python/ArrayMethods.md'
import * as PythonClosure from '/@/articles/python/Closure.md'
import * as PythonDecorator from '/@/articles/python/Decorator.md'
import * as PythonThreading from '/@/articles/python/Threading.md'
import * as PythonQueue from '/@/articles/python/Queue.md'
import * as PythonRegexp from '/@/articles/python/Regexp.md'
import * as PythonTime from '/@/articles/python/Time.md'
import * as PythonDownloadImages from '/@/articles/python/DownloadImages.md'
import * as PythonMultiprocessing from '/@/articles/python/Multiprocessing.md'
import * as PythonAsyncio from '/@/articles/python/Asyncio.md'

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
  PythonStringAndNumber,
  PythonList,
  PythonIf,
  PythonInputAndWhile,
  PythonFunction,
  PythonClass,
  PythonFileAndError,
  PythonDecodeAndEncode,
  PythonDataStore,
  PythonTestCode,
  PythonPipenv,
  PythonCrawler,
  PythonSendEmail,
  PythonScope,
  PythonLambda,
  PythonArrayMethods,
  PythonClosure,
  PythonDecorator,
  PythonThreading,
  PythonQueue,
  PythonRegexp,
  PythonTime,
  PythonDownloadImages,
  PythonMultiprocessing,
  PythonAsyncio,
  JSArray
]

articles.sort((a, b) => {
  return new Date(formatTime(b.attributes.time)).getTime() - new Date(formatTime(a.attributes.time)).getTime()
})

export default articles
