<template>
  <div class="article">
    <component :is="articleComponent"></component>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import getArticleDetail from '/@/composables/article/getArticleDetail'

export default defineComponent({
  name: 'Article',
  setup () {
    const articleComponent = computed(() => getArticleDetail())
    return {
      articleComponent
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
