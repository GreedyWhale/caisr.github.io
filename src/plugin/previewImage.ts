/*
 * @Author: MADAO
 * @Date: 2020-09-18 16:32:47
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-19 15:37:47
 * @Description: 预览图片插件
 */

import { App, createApp, inject } from 'vue'
import PreviewImage from '/@/components/PreviewImage.vue'
import { EventBus } from '/@/utils/index'

const key = Symbol('PreviewImageKey')
/* eslint-disable */
export const usePreviewImage = () => {
  return inject<{
    VM: App;
    show:(path: string) => void;
    hide: () => void;
    warp: Element | null;
  }>(key)
}
/* eslint-enable */

export default {
  install: (app: App) => {
    const previewImage = {
      VM: null,
      wrap: null,
      show (path: string) {
        if (this.VM) {
          return
        }
        this.VM = createApp(PreviewImage, { path: path })
        this.wrap = document.createElement('div')
        this.wrap.id = 'plugin-preview-image'
        document.body.appendChild(this.wrap)
        this.VM.mount('#plugin-preview-image')
      },
      hide () {
        if (this.VM) {
          this.VM.unmount('#plugin-preview-image')
          this.VM = null
          document.body.removeChild(this.wrap)
          this.wrap = null
        }
      }
    }
    EventBus.on('on-click-preview-image', () => {
      previewImage.hide()
    })
    app.provide(key, previewImage)
  }
}
