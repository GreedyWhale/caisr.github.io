<template>
  <div class="container" @click="onClick">
    <Aside />
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { EventBus } from '/@/utils/index'
import { EVENT_CLICK_ROOT_ELEMENT } from '/@/utils/constant'
import Aside from './components/Aside.vue'

export default defineComponent({
  name: 'App',
  components: {
    Aside
  },
  setup () {
    const onClick = () => EventBus.emit(EVENT_CLICK_ROOT_ELEMENT)

    return { onClick }
  }
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: flex-start;
  height: 100vh;
}
</style>
