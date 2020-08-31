<template>
  <div class="container">
    <Aside />
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Aside from './components/Aside.vue'

export default defineComponent({
  name: 'App',
  components: {
    Aside
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
