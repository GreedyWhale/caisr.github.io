<template>
  <div class="article" ref="rootElement" @scroll="onScroll" @click="onClick">
    <article v-if="articleMarkDownRef.html">
      <h1 class="article-title">
        <img src="../assets/images/back.png" alt="go-back" @click.stop="goBack">
        {{ articleMarkDownRef.articleAttributes.title }}
      </h1>
      <div v-html="articleMarkDownRef.html"></div>
    </article>
    <div class="article-loading" v-else>
      <BaseLoading/>
    </div>
    <img
      src="/@/assets/images/go_top.png"
      alt="go-top"
      :class="['article-go__top', visibleGoTop ? 'active' : '']"
      @click.stop="goTop"
    >
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUpdated,
  ref,
  defineAsyncComponent
} from 'vue'
import { useRouter } from 'vue-router'
import { scrollTopTo } from '/@/utils/index'
import hljs from 'highlight.js'
import 'highlight.js/styles/shades-of-purple.css'
import { usePreviewImage } from '/@/plugin/index'
import useArticle from '/@/composables/useArticle'
import useFeature from '/@/composables/useFeature'

export default defineComponent({
  name: 'Article',
  components: {
    BaseLoading: defineAsyncComponent(() => import('/@/components/BaseLoading.vue'))
  },
  setup () {
    const router = useRouter()
    const { articleMarkDownRef } = useArticle()
    const previewImage = usePreviewImage()

    const { visibleGoTop } = useFeature({
      visibleGoTop: false
    })

    // 初始化hljs
    const rootElement = ref(null)
    const initHighLight = () => {
      const elements = (rootElement.value as unknown as HTMLElement).querySelectorAll('pre code')
      Array.from(elements).forEach((el) => {
        hljs.highlightBlock((el as HTMLElement))
      })
    }
    let scrollTimer = -1
    const onScroll = (event: Event) => {
      clearTimeout(scrollTimer)
      scrollTimer = window.setTimeout(() => {
        const { scrollTop } = (event.target as HTMLElement)
        if (scrollTop > 300 && !visibleGoTop.value) {
          visibleGoTop.value = true
        } else if (visibleGoTop && scrollTop < 300) {
          visibleGoTop.value = false
        }
      })
    }

    const goTop = () => {
      scrollTopTo(0, 100, (rootElement.value as unknown as HTMLElement))
    }

    const onClick = (event: Event) => {
      const { tagName } = (event.target as HTMLElement)
      if (tagName.toUpperCase() === 'IMG') {
        const url = (event.target as HTMLElement).getAttribute('src')
        url && previewImage!.show(url)
      }
    }
    const goBack = () => router.go(-1)

    onMounted(() => { initHighLight() })
    onUpdated(() => { initHighLight() })

    return {
      rootElement,
      articleMarkDownRef,
      onScroll,
      goTop,
      visibleGoTop,
      onClick,
      goBack
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
  background: #0d1117;
  font-size: 16px;
  padding: 3em;
  color: #bfbfbf;
  flex: 1;
  > article {
    width: 50em;
    margin: 0 auto;
  }
  &-title {
    font-size: 32px;
    padding-bottom: 20px;
    border-bottom: 1px solid #bfbfbf;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    > img {
      width: 48px;
      margin: 0 20px 0 0 !important;
      cursor: pointer;
    }
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
  &-loading {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  @include markdown;
}
</style>
<style lang="scss">
code {
  color: #ff502c;
  background: #0b3144;
}
</style>
