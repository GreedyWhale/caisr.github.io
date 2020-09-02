<template>
  <div class="article">
    <component :is="articleComponent"></component>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import getArticleDetail from '/@/composables/article/getArticleDetail'

export default defineComponent({
  name: 'Article',
  setup () {
    const { params: { id } } = useRoute()
    const articleComponent = computed(() => getArticleDetail((id as string)))
    return {
      articleComponent
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
