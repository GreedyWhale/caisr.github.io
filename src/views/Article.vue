<template>
  <div class="article" ref="rootElement">
    <article>
      <h1 class="article-title">{{ articleAttributes.title }}</h1>
      <component :is="articleComponent"></component>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getCurrentArticle } from '/@/composables/articleMethods'
import hljs from 'highlight.js'
import 'highlight.js/styles/shades-of-purple.css'

export default defineComponent({
  name: 'Article',
  setup () {
    // 获取文章组件
    const { params: { name } } = useRoute()
    const {
      VueComponent: articleComponent,
      attributes: articleAttributes
    } = getCurrentArticle((name as string))
    // 初始化hljs
    const rootElement = ref(null)
    const initHighLight = () => {
      const elements = (rootElement.value as unknown as HTMLElement).querySelectorAll('pre code')
      Array.from(elements).forEach((el: HTMLElement) => {
        hljs.highlightBlock(el)
      })
    }

    onMounted(() => {
      initHighLight()
    })
    return {
      rootElement,
      articleComponent,
      articleAttributes
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/tool.scss';
@import '../assets/scss/markdown.scss';

.article {
  overflow-y: auto;
  height: 100vh;
  @include scrollBar;
  background: #F6F5F0;
  font-size: 16px;
  padding: 3em;
  color: #555;
  flex: 1;
  > article {
    width: 50em;
    margin: 0 auto;
  }
  &-title {
    font-size: 32px;
    margin-bottom: 20px;
  }
  @include markdown;
}
</style>
<style lang="scss">
code {
  color: #ff502c;
  background: #fff5f5;
}
</style>
