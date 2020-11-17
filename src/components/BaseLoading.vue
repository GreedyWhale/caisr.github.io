<template>
  <div class="loading">
    <div class="pl pl-fade"></div>
    <div class="pl-name">Loading...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseLoading'
})
</script>

<style lang="scss" scoped>
.pl, .pl:before, .pl:after {
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.pl {
  margin: 0 auto 1.5em auto;
  position: relative;
  width: 3em;
  height: 3em;
}
.pl:before, .pl:after {
  background: rgb(218, 225, 231);
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  transform-origin: 50% 100%;
  clip-path: polygon(0 0,100% 0,50% 100%);
  -webkit-clip-path: polygon(0 0,100% 0,50% 100%);
}
.pl-name {
  text-align: center;
  color: rgb(218, 225, 231);
}

/* Fade */
.pl-fade:before {
  animation-name: fadeA;
}
.pl-fade:after {
  animation-name: fadeB;
}
@keyframes fadeA {
  from, to { opacity: 1; transform: rotate(0deg) }
  25%, 75.1% { opacity: 0; transform: rotate(0deg) }
  25.1%, 75% { opacity: 0; transform: rotate(180deg) }
  50% { opacity: 1; transform: rotate(180deg) }
}
@keyframes fadeB {
  from, 50% { opacity: 0; transform: rotate(90deg) }
  25% { opacity: 1; transform: rotate(90deg) }
  50.1%, to { opacity: 0; transform: rotate(270deg) }
  75% { opacity: 1; transform: rotate(270deg) }
}
</style>
