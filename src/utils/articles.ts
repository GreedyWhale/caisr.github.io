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
import * as ThirdPartyComponents from '/@/articles/miniprogram/ThirdPartyComponents.md'

import * as VueCli from '/@/articles/vue/VueCli.md'
import * as VueNuxt from '/@/articles/vue/Nuxt.md'
import * as VueComponentTest from '/@/articles/vue/ComponentTest.md'
import * as VueAndTSOne from '/@/articles/vue/VueAndTSOne.md'
import * as VueAndTSTwo from '/@/articles/vue/VueAndTSTwo.md'
import * as Vuex from '/@/articles/vue/Vuex.md'
import * as VueTransitions from '/@/articles/vue/VueTransitions.md'

import * as Calendar from '/@/articles/gadgets/Calendar.md'
import * as WebServer from '/@/articles/gadgets/WebServer.md'
import * as CanvasMap from '/@/articles/gadgets/CanvasMap.md'

import * as WebGLTriangle from '/@/articles/webgl/Triangle.md'

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
import * as PythonAiohttp from '/@/articles/python/Aiohttp.md'

import * as NodeHttp from '/@/articles/node/Http.md'
import * as NodeExpress from '/@/articles/node/Express.md'

import * as ThreejsTriangle from '/@/articles/threejs/Triangle.md'
import * as ThreejsLightAndShadow from '/@/articles/threejs/LightAndShadow.md'

import * as OtherImplicitConversion from '/@/articles/other/ImplicitConversion.md'

import * as WebpackStaticAssets from '/@/articles/webpack/StaticAssets.md'
import * as WebpackES6 from '/@/articles/webpack/ES6.md'
import * as WebpackTreeShaking from '/@/articles/webpack/TreeShaking.md'
import * as WebpackCodeSplitting from '/@/articles/webpack/CodeSplitting.md'
import * as WebpackPreload from '/@/articles/webpack/Preload.md'

import * as TSType from '/@/articles/typescript/Type.md'
import * as TSInterface from '/@/articles/typescript/Interface.md'
import * as TSGeneric from '/@/articles/typescript/Generic.md'

import * as GoogleHelloExtensions from '/@/articles/google/HelloExtensions.md'
import * as GoogleGettingStartedExample from '/@/articles/google/GettingStartedExample.md'

import * as ReactFunctionalProgramming from '/@/articles/react/FunctionalProgramming.md'
import * as ReactUseState from '/@/articles/react/UseState.md'
import * as ReactHooks from '/@/articles/react/Hooks.md'

const cssArticles = [CSSREMScope]
const jsArticles = [
  JSScope,
  JSClosure,
  JSCurrying,
  JSDataType,
  JSFunction,
  JSHoisting,
  JSObject,
  JSPrototype,
  JSScope,
  JSThis,
  JSThisAndProto,
  JSArray
]
const miniprogramArticles = [MINAGulp, ThirdPartyComponents]
const vueArticles = [
  VueCli,
  VueComponentTest,
  VueNuxt,
  VueAndTSOne,
  VueAndTSTwo,
  Vuex,
  VueTransitions
]
const gadgetsArticles = [
  Calendar,
  WebServer,
  CanvasMap
]
const webglArticles = [WebGLTriangle]
const pythonArticles = [
  PythonAiohttp,
  PythonArrayMethods,
  PythonClass,
  PythonClosure,
  PythonCrawler,
  PythonDataStore,
  PythonDecodeAndEncode,
  PythonDecorator,
  PythonDownloadImages,
  PythonFileAndError,
  PythonFunction,
  PythonIf,
  PythonInputAndWhile,
  PythonLambda,
  PythonList,
  PythonMultiprocessing,
  PythonPipenv,
  PythonQueue,
  PythonRegexp,
  PythonScope,
  PythonSendEmail,
  PythonSetup,
  PythonStringAndNumber,
  PythonTestCode,
  PythonThreading,
  PythonTime,
  PythonVariable,
  PythonAsyncio
]
const nodeArticles = [
  NodeHttp,
  NodeExpress
]
const threejsArticles = [
  ThreejsTriangle,
  ThreejsLightAndShadow
]
const otherArticles = [OtherImplicitConversion]
const webpackArticles = [
  WebpackCodeSplitting,
  WebpackES6,
  WebpackPreload,
  WebpackStaticAssets,
  WebpackTreeShaking
]
const typescriptArticles = [
  TSType,
  TSGeneric,
  TSInterface
]
const googleArticles = [
  GoogleHelloExtensions,
  GoogleGettingStartedExample
]

const reactArticles = [
  ReactFunctionalProgramming,
  ReactUseState,
  ReactHooks
]

const articles = [
  ...cssArticles,
  ...jsArticles,
  ...miniprogramArticles,
  ...vueArticles,
  ...gadgetsArticles,
  ...webglArticles,
  ...pythonArticles,
  ...nodeArticles,
  ...nodeArticles,
  ...threejsArticles,
  ...otherArticles,
  ...webpackArticles,
  ...googleArticles,
  ...typescriptArticles,
  ...reactArticles
]
// https://github.com/vitejs/vite/issues/77
export default articles
