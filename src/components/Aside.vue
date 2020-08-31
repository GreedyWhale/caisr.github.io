<template>
  <div class="aside">
    <img src="../assets/images/avatar.jpg" alt="avatar">
    <button class="aside-menu"></button>
    <ul class="aside-concat__methods">
      <li v-for="i in 4" :key="i"></li>
    </ul>
    <button class="aside-search__button"></button>
  </div>
</template>

<script lang="ts"></script>

<style lang="scss" scoped>
.aside {
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
      &:not(:last-child) {
        margin-bottom: 15px;
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
