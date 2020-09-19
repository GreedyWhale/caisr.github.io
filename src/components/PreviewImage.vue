<template>
  <div class="preview-image" @click="onClick">
    <img :src="path">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { EventBus } from '/@/utils/index'

export default defineComponent({
  name: 'PreviewImage',
  props: ['path'],
  setup () {
    const onClick = () => {
      EventBus.emit('on-click-preview-image')
    }

    return { onClick }
  }
})
</script>

<style lang="scss" scoped>
.preview-image {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  > img {
    max-width: 1200px;
  }
}
</style>
