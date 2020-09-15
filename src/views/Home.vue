<template>
  <div class="home">
    <div class="home-pane">
    </div>
    <div class="article-list">
      <ul v-if="articlesAttributes.length" :data-has-remainder="articlesAttributes.length % 3 !== 0">
        <li v-for="item in articlesAttributes" :key="item.title" @click="toArticleDetail(item.name)">
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
import { defineComponent } from 'vue'
import { getArticlesAttributes } from '/@/composables/articleMethods'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Home',
  setup () {
    const router = useRouter()

    const articlesAttributes = getArticlesAttributes()
    const toArticleDetail = (name: string) => {
      router.push(`/article/${name}`)
    }
    return {
      articlesAttributes,
      toArticleDetail
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
  &-pane {
    width: 40%;
    min-width: 400px;
    height: 100%;
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
      $types: 'javascript', 'css', 'miniprogram', 'vue', 'gadgets', 'python', 'webgl', 'node', 'threejs', 'other', 'webpack', 'typescript', 'google';
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
