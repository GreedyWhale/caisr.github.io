/*
 * @Author: MADAO
 * @Date: 2020-06-17 12:01:08
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-18 16:02:08
 * @Description: 滚动相关函数
 */

/**
 * @description linear缓动算法
 * @param {number} start 起始位置
 * @param {number} end 结束位置
 * @param {number} duration 持续时间，ms
 * @param {function} callback 回调函数，参数value: 当前位置
 * @returns {undefined} undefined
 */
const linear = (start: number, end = 0, duration = 300, callback: (value: number) => void) => {
  if (start === end || typeof start !== 'number') {
    return
  }
  const scale = duration / 10
  const difference = end - start
  let time = 0
  const step = function () {
    time += scale
    const currentValue = difference * (time / duration) + start

    if (time > duration) {
      callback(end)
      return
    }
    callback(currentValue)
    requestAnimationFrame(step)
  }
  step()
}

/**
 * @description 滚动到任意位置
 * @param {number} end 结束位置
 * @param {number} duration 持续时间，ms
 * @returns {undefined} undefined
 */
export const scrollTopTo = (end: number, duration: number, element?: HTMLElement) => {
  const doc = element || (document.body.scrollTop ? document.body : document.documentElement)
  linear(doc.scrollTop, end, duration, (value) => {
    doc.scrollTop = value
  })
}
