<template>
  <div class="article">
    <article>
      <h1 class="article-title">{{ articleAttributes.title }}</h1>
      <component :is="articleComponent"></component>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { getCurrentArticle } from '/@/composables/articleMethods'

export default defineComponent({
  name: 'Article',
  setup () {
    const { params: { name } } = useRoute()
    const {
      VueComponent: articleComponent,
      attributes: articleAttributes
    } = getCurrentArticle((name as string))
    return {
      articleComponent,
      articleAttributes
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/tool.scss';

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
  }
  &-title {
    font-size: 32px;
    margin-bottom: 20px;
  }
  &::v-deep ul {
    padding-left: 2em;
    > li {
        list-style: circle;
    }
  }
  &::v-deep h3 {
    margin-bottom: 15px;
  }
  &::v-deep p {
    margin-bottom: 10px;
  }
  &::v-deep p,
  &::v-deep li {
    line-height: 1.5;
  }
}
</style>
