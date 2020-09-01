<template>
  <div class="home">
    <div class="top-article">
      <template v-if="articleList.length">
        <img :src="articleList[0].bg" alt="background">
        <ul class="top-article__labels">
          <li v-for="item in articleList[0].tags" :key="item">
            {{ item }}
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import articlesTool from '/@/composables/home/articlesTool'

export default defineComponent({
  name: 'Home',
  setup () {
    const { articleList, getArticles } = articlesTool()
    // const { articles } = await getArticles()
    // console.log(articles)
    // console.log(1)
    // // data
    // const state = reactive({
    //   path: `../articles/javascript/${window.GLOBAL_ARTICLES.javascript[0]}`
    // })
    // // methods
    // const getComponent = computed(() => {
    //   const component = defineAsyncComponent(() => {
    //     // warn non-props https://v3.vuejs.org/guide/component-attrs.html#disabling-attribute-inheritance
    //     return import(state.path).then(res => res.VueComponent)
    //   })
    //   console.log(component)
    //   return component
    // })
    // onMounted(() => {
    //   getArticles().then(res => console.log(res))
    // })
    onMounted(() => {
      // console.log(articleList.value)
    })
    return {
      articleList,
      getArticles
    }
  }
})
</script>

<style lang="scss" scoped>
.home {
  flex: 1;
  height: 100%;
  overflow: hidden;
  .top-article {
    width: 50%;
    height: 100%;
  }
}
</style>
