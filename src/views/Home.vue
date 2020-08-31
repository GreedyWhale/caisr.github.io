<template>
  <div class="home">
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'Home',
  setup () {
    const data = reactive({
      name: 'fuck'
    })
    return {
      data
    }
  }
})
</script>

<style lang="scss" scoped>
.home {
  background: rgb(249, 186, 146);
  flex: 1;
  height: 100%;
}
</style>
