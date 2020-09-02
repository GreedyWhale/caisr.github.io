<template>
  <div class="home">
    <div class="top-article" v-if="articleList[0]">
      <ul class="top-article__labels">
        <li v-for="item in articleList[0].tags" :key="item">
          {{ item }}
        </li>
      </ul>
      <div>
        <h1 class="top-article__title">{{ articleList[0].title }}</h1>
        <p class="top-article__desc">{{ articleList[0].description }}</p>
        <p>发布时间：{{ articleList[0].time }}</p>
        <p>作者：{{ articleList[0].author }}</p>
        <router-link :to="`/article/${articleList[0].componentName}`">查看详情</router-link>
      </div>
    </div>
    <div class="article-list">
      <ul v-if="articlesExceptFirst.length">
        <router-link
          custom
          v-slot="{ navigate, isActive, isExactActive }"
          v-for="item in articlesExceptFirst"
          :key="item.title"
          :to="`/article/${item.componentName}`">
          <li role="link" @click="navigate" :class="{ active: isActive, 'exact-active': isExactActive }">
            <div>
              <div class="article-list__icon" :data-type="articleType"></div>
              <h2 class="article-list__title">{{ item.title }}</h2>
              <p class="article-list__desc">{{ item.description }}</p>
            </div>
            <div class="article-list__meta">
              <p>发布时间：{{ item.time }}</p>
              <p>作者：{{ item.author }}</p>
            </div>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import articlesTool from '/@/composables/home/articleListMethods'

export default defineComponent({
  name: 'Home',
  setup () {
    const { state: { articleType } } = useStore()
    const { articleList, getArticles } = articlesTool()
    const articlesExceptFirst = computed(() => articleList.value.slice(1))
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
    onMounted(() => {
      // console.log(articlesExceptFirst)
    })
    return {
      articleList,
      getArticles,
      articlesExceptFirst,
      articleType
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/tool.scss';

.home {
  flex: 1;
  height: 100%;
  overflow: hidden;
  background: rgb(26,26,28);
  display: flex;
  align-items: flex-start;
  .top-article {
    width: 40%;
    min-width: 400px;
    height: 100%;
    background: url('../assets/images/bg.jpg') no-repeat center / cover;
    padding: 40px 40px 80px;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #fff;
    &::after {
      content: '';
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.4);
    }
    &__labels {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      font-size: 16px;
      > li {
        padding: 10px 1em;
        margin-right: 1em;
        border-radius: 8px;
        @for $i from 1 through 8 {
          &:nth-child(n + #{$i}) {
            @include randomColor;
          }
        }
      }
    }
    &__title {
      font-size: 32px;
      font-weight: 500;
      line-height: 1.5;
      @include multipleEllipsis(2);
      margin-bottom: 20px;
    }
    p {
      font-size: 14px;
      opacity: 0.8;
      margin-bottom: 15px;
      &:not(:first-of-type) {
        color: #909090;
      }
    }
    &__desc {
      line-height: 1.5;
      @include multipleEllipsis(2);
    }
    $router-color: rgb(195, 8, 63);
    a {
      display: block;
      width: 150px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      background: $router-color;
      color: #fff;
      text-align: center;
      text-decoration: none;
      margin-top: 80px;
      &:hover {
        background: lighten($router-color, 10%);
      }
    }
  }
  .article-list {
    overflow-y: auto;
    min-width: 580px;
    height: 100%;
    flex: 1;
    /* width */
    &::-webkit-scrollbar {
      width: 10px;
    }
    /* Track */
    &::-webkit-scrollbar-track {
      background: rgb(26,26,28);
    }
    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: rgb(195, 8, 63);
    }
    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: lighten($color: rgb(195, 8, 63), $amount: 10%);
    }
    > ul {
      padding: 20px 40px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      overflow: hidden;
      > li {
        flex: 0 0 32%;
        min-width: 120px;
        border: 2px solid rgb(40, 40, 40);
        border-radius: 8px;
        padding: 20px;
        color: #fff;
        cursor: pointer;
        margin-bottom: 25px;
        height: 280px;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &:hover {
          opacity: 0.8;
        }
      }
    }
    &__title {
      font-size: 18px;
      margin-bottom: 20px;
      font-weight: 600;
      line-height: 1.5;
    }
    &__desc {
      @include multipleEllipsis(2);
      height: auto;
      margin-bottom: 30px;
      opacity: 0.8;
      line-height: 1.5;
    }
    &__icon {
      width: 48px;
      height: 48px;
      margin-bottom: 10px;
      &[data-type="javascript"] {
        background: url('../assets/images/JavaScript.png') no-repeat center / 100%;
      }
    }
    &__meta > p {
      color: #909090;
      margin-bottom: 5px;
    }
  }
}
</style>
