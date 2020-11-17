import { App, createApp, inject } from 'vue'
import BaseToast from '/@/components/BaseToast.vue'
import { ToastInstance } from '/@/types/plugins/toast'
import { EventBus } from '/@/utils/index'
import { EVENT_HIDE_TOAST } from '/@/utils/constant'

const key = Symbol('BaseToast')

export const useToast = () => {
  return inject<ToastInstance>(key)
}

export default {
  install: (app: App) => {
    const toast: ToastInstance = {
      VM: null,
      wrap: null,
      show (props) {
        if (this.VM) {
          if (props.delay === -1) { return }
          EventBus.emit(EVENT_HIDE_TOAST)
        }
        this.VM = createApp(BaseToast, props)
        this.wrap = document.createElement('div')
        this.wrap.id = 'plugin-toast'
        document.body.appendChild(this.wrap)
        this.VM.mount(this.wrap)
      },
      hide () {
        if (this.VM && this.wrap) {
          this.VM.unmount(this.wrap)
          this.VM = null
          document.body.removeChild(this.wrap)
          this.wrap = null
        }
      }
    }
    EventBus.on(EVENT_HIDE_TOAST, () => {
      toast.hide()
    })
    app.provide(key, toast)
  }
}
