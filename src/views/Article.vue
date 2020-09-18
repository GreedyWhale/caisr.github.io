<template>
  <div class="article" ref="rootElement" @scroll="onScroll">
    <article>
      <h1 class="article-title">{{ article.articleAttributes.title }}</h1>
      <component :is="article.articleComponent"></component>
    </article>
    <img
      src="/@/assets/images/go_top.png"
      alt="go-top"
      :class="['article-go__top', data.visibleGoTop ? 'active' : '']"
      @click="goTop"
    >
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUpdated,
  ref,
  computed,
  reactive
} from 'vue'
import { useRoute } from 'vue-router'
import { getCurrentArticle } from '/@/composables/articleMethods'
import { scrollTopTo } from '/@/utils/index'
import hljs from 'highlight.js'
import 'highlight.js/styles/shades-of-purple.css'

export default defineComponent({
  name: 'Article',
  setup () {
    const data = reactive({
      visibleGoTop: false
    })

    const article = computed(() => {
      // 获取文章组件
      const { params: { name } } = useRoute()
      const {
        VueComponent: articleComponent,
        attributes: articleAttributes
      } = getCurrentArticle((name as string))

      return { articleComponent, articleAttributes }
    })

    // 初始化hljs
    const rootElement = ref(null)
    const initHighLight = () => {
      const elements = (rootElement.value as unknown as HTMLElement).querySelectorAll('pre code')
      Array.from(elements).forEach((el: HTMLElement) => {
        hljs.highlightBlock(el)
      })
    }
    let scrollTimer = -1
    const onScroll = (event: Event) => {
      clearTimeout(scrollTimer)
      scrollTimer = window.setTimeout(() => {
        const { scrollTop } = (event.target as HTMLElement)
        if (scrollTop > 300 && !data.visibleGoTop) {
          data.visibleGoTop = true
        } else if (data.visibleGoTop && scrollTop < 300) {
          data.visibleGoTop = false
        }
      })
    }

    const goTop = () => {
      scrollTopTo(0, 100, (rootElement.value as unknown as HTMLElement))
    }
    onMounted(() => {
      initHighLight()
    })
    onUpdated(() => {
      initHighLight()
    })

    return {
      rootElement,
      article,
      onScroll,
      goTop,
      data
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
  &-go__top {
    position: fixed;
    bottom: 50px;
    right: 0;
    width: 48px;
    cursor: pointer;
    transition: transform 0.3s;
    transform: translateX(100%);
    &.active {
      transform: translateX(-20px);
    }
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
