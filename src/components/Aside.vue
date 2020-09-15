<template>
  <div class="aside">
    <img src="../assets/images/avatar.jpg" alt="avatar">
    <button class="aside-menu"></button>
    <ul class="aside-concat__methods">
      <li
        v-for="item in navs"
        :key="item"
        :data-key="item"
        @click="navClickHandler(item)"
      ></li>
    </ul>
    <button class="aside-search__button"></button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Vuex } from '/@/types/vuex.d.ts'
import { NavItem } from '/@/types/aside.d.ts'

export default defineComponent({
  name: 'Aside',
  setup () {
    const navs = reactive(['home', 'github', 'switch'])
    const router = useRouter()
    const store = useStore<Vuex.State>()

    const navClickHandler = (type: NavItem) => {
      const handlerMap = {
        home: () => router.push('/'),
        github: () => window.open('https://github.com/GreedyWhale'),
        switch: () => {
          const { state: { mode } } = store
          const value = mode === 'blogs' ? 'notes' : 'blogs'
          store.commit('updateMode', value)
        }
      }

      handlerMap[type]()
    }

    return {
      navs,
      navClickHandler
    }
  }
})
</script>

<style lang="scss" scoped>
.aside {
  flex: none;
  width: 150px;
  height: 100%;
  background: rgb(22,22,22);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
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
      $navs: 'home', 'github', 'switch';
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
  &-search__button {
    width: 48px;
    height: 48px;
    background: url('../assets/images/search.png') no-repeat center / 100%;
  }
}
</style>
