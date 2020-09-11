<template>
  <div class="home">
    <div class="top-article" v-if="articlesAttributes[0]">
      <ul class="top-article__labels">
        <li v-for="item in articlesAttributes[0].tags" :key="item">
          {{ item }}
        </li>
      </ul>
      <div>
        <h1 class="top-article__title">{{ articlesAttributes[0].title }}</h1>
        <p class="top-article__desc">{{ articlesAttributes[0].description }}</p>
        <p>发布时间：{{ articlesAttributes[0].time }}</p>
        <p>作者：{{ articlesAttributes[0].author }}</p>
        <button @click="toArticleDetail(articlesAttributes[0].name)">查看详情</button>
      </div>
    </div>
    <div class="article-list">
      <ul v-if="articlesExceptFirst.length" :data-has-remainder="articlesExceptFirst.length % 3 !== 0">
        <li v-for="item in articlesExceptFirst" :key="item.title" @click="toArticleDetail(item.name)">
          <div>
            <div class="article-list__icon" :data-type="item.articleType"></div>
            <h2 class="article-list__title">{{ item.title }}</h2>
            <p class="article-list__desc">{{ item.description }}</p>
          </div>
          <div class="article-list__meta">
            <p>发布时间：{{ item.time }}</p>
            <p>作者：{{ item.author }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { getArticlesAttributes } from '/@/composables/articleMethods'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Home',
  setup () {
    const router = useRouter()

    const articlesAttributes = getArticlesAttributes()
    const articlesExceptFirst = computed(() => articlesAttributes.value.slice(1))

    const toArticleDetail = (name: string) => {
      router.push(`/article/${name}`)
    }
    return {
      articlesAttributes,
      toArticleDetail,
      articlesExceptFirst
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
        margin-bottom: 1em;
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
    button {
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
    @include scrollBar;
    > ul {
      padding: 20px 40px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      overflow: hidden;
      > li {
        flex: 0 0 32%;
        border: 2px solid rgb(40, 40, 40);
        border-radius: 8px;
        padding: 20px;
        color: #fff;
        cursor: pointer;
        margin-bottom: 25px;
        min-height: 280px;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &:hover {
          opacity: 0.8;
        }
      }
      &[data-has-remainder="true"] {
        &::after {
          content: '';
          flex: 0 0 32%;
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
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: center;
      $types: 'javascript', 'css', 'miniprogram', 'vue', 'gadgets', 'python', 'webgl', 'node', 'threejs', 'other';
      @each $type in $types {
        &[data-type="#{$type}"] {
          background-image: url('../assets/images/#{$type}.png');
        }
      }
    }
    &__meta > p {
      color: #909090;
      margin-bottom: 5px;
    }
  }
}
</style>
