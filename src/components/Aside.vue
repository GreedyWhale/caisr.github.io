<template>
  <div class="aside">
    <img src="../assets/images/avatar.jpg" alt="avatar">
    <button class="aside-menu" @click.stop="state.visibleSubMenu = !state.visibleSubMenu"></button>
    <ul class="aside-concat__methods">
      <li
        v-for="item in state.navs"
        :key="item"
        :data-key="item"
        @click="navClickHandler(item)"
      ></li>
    </ul>
  </div>
  <div class="aside-sub__menu" :data-visible="state.visibleSubMenu">
    <ul>
      <template v-if="isArticlePage">
        <router-link
          custom
          v-for="item in state.articles"
          :key="item.name" :to="`/article/${item.name}`"
          v-slot="{ isActive, navigate }">
          <li
            @click="navigate"
            :data-active="isActive"
            :class="{ active: isActive }"
            data-is-article-list="true">
            {{ item.title }}
          </li>
        </router-link>
      </template>
      <template v-else>
        <li :data-active="articleType === 'all'" @click.stop="changeArticleType(state.articles.all.type)">
          <p>{{ state.articles.all.name }}</p>
          <p>{{ state.articles.all.counts }}</p>
        </li>
        <template v-for="value in state.articles" :key="value.name">
          <li
            v-if="value.type !== 'all'"
            :data-active="articleType === value.type"
            @click.stop="changeArticleType(value.type)">
            <p>{{ value.name }}</p>
            <p>{{ value.counts }}</p>
          </li>
        </template>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch, onMounted, ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { NavItem } from '/@/types/aside.d.ts'
import { EventBus } from '/@/utils/index'
import { EVENT_CLICK_ROOT_ELEMENT } from '/@/utils/constant'
import useArticle from '/@/composables/useArticle'

export default defineComponent({
  name: 'Aside',
  setup () {
    const state = reactive({
      navs: ['home', 'github', 'back'],
      visibleSubMenu: false,
      articles: {}
    })
    const { filterWithArticleType } = useArticle()
    const router = useRouter()
    const store = useStore<Vuex.State>()
    const articleType = computed(() => store.state.articleType)
    const isArticlePage = computed(() => router.currentRoute.value.name === 'Article')

    const navClickHandler = (type: NavItem) => {
      const handlerMap = {
        home: () => router.push('/'),
        github: () => window.open('https://github.com/GreedyWhale'),
        switch: () => { router.go(-1) }
      }

      handlerMap[type]()
    }
    const changeArticleType = (type: string) => {
      store.commit('updateArticleType', type)
    }

    watch(() => [isArticlePage], (value) => {
      if ((value[0] as ComputedRef<boolean>).value) {
        changeArticleType('all')
        const articles = filterWithArticleType()
        state.articles = articles.map(value => value.attributes)
        return
      }
      const articles = filterWithArticleType()
      const map: {[key: string]: {
        name: string;
        counts: number;
        type: string;
      }} = {}

      articles.forEach(value => {
        map[value.attributes.articleType]
          ? map[value.attributes.articleType].counts = map[value.attributes.articleType].counts + 1
          : (map[value.attributes.articleType] = {
            name: value.attributes.articleTypeZH,
            type: value.attributes.articleType,
            counts: 1
          })
      })
      map.all = {
        name: '全部',
        type: 'all',
        counts: articles.length
      }
      state.articles = map
    }, { immediate: true, deep: true })
    onMounted(() => {
      EventBus.on(EVENT_CLICK_ROOT_ELEMENT, () => {
        state.visibleSubMenu && (state.visibleSubMenu = false)
      })
    })

    return {
      state,
      articleType,
      isArticlePage,
      navClickHandler,
      changeArticleType
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/tool.scss';
@keyframes stretch {
  from { width: 0; }
  to { width: 100%; }
}
.aside {
  flex: none;
  width: 150px;
  height: 100%;
  background: #161616;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 50px;
  position: relative;
  @include zIndex(navigation);
  > img {
    display: block;
    width: 80%;
  }
  &-menu {
    height: 48px;
    width: 48px;
    background: url('../assets/images/menu.png') no-repeat center / 100%;
    display: block;
  }
  &-concat__methods {
    > li {
      width: 50px;
      height: 50px;
      background: rgb(38,38,38);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:not(:last-child) {
        margin-bottom: 15px;
      }
      $navs: 'home', 'github', 'back';
      @each $nav in $navs {
        &[data-key="#{$nav}"] {
          &::after {
            content: '';
            width: 20px;
            height: 20px;
            background: url('../assets/images/#{$nav}.png') no-repeat center / 100%;
          }
        }
      }
    }
  }
  &-sub__menu {
    position: fixed;
    @include zIndex(popover);
    left: -150px;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 300px;
    background: #1c2b2d;
    transition: transform 0.5s;
    color: #e6d5b8;
    padding: 20px 0;
    &[data-visible="true"] {
      transform: translateX(300px);
    }
    > ul {
      overflow-y: auto;
      height: 100%;
      > li {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 30px;
        font-size: 18px;
        cursor: pointer;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: #e6d5b8;
        }
        &[data-active="true"], &.active {
          &::after {
            width: 100%;
          }
        }
        &[data-active="false"] {
          &:hover {
            &::after {
              animation: stretch 0.3s linear forwards;
            }
          }
        }
        &[data-is-article-list="true"] {
          line-height: 1.5;
          font-size: 14px;
          margin-bottom: 0.5em;
        }
      }
    }
  }
}
</style>
