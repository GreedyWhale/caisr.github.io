<template>
  <transition name="slide" @after-leave="afterLeave">
    <div class="toast" :data-theme="theme" v-if="visible">
      <div class="theme-icon"></div>
      <div class="content">
        <h4 v-if="title">{{ title }}</h4>
        <p>{{ message }}</p>
      </div>
      <div class="close-button" v-if="delay === -1" @click="visible = false"></div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, toRefs, onMounted } from 'vue'
import useFeature from '/@/composables/useFeature'
import { EventBus } from '/@/utils/index'
import { EVENT_HIDE_TOAST } from '/@/utils/constant'

export default defineComponent({
  name: 'BaseToast',
  props: {
    theme: { type: String, default: 'success' },
    title: { type: String, default: '' },
    message: { type: String, default: '' },
    delay: { type: Number, default: 3000 }
  },
  setup (props) {
    const { theme, message, delay } = toRefs(props)
    const { visible } = useFeature({ visible: false })
    let timer: number = -1

    onMounted(() => {
      visible.value = true
      if (delay.value !== -1) {
        timer = window.setTimeout(() => {
          visible.value = false
        }, delay.value)
      }
    })
    const afterLeave = () => {
      EventBus.emit(EVENT_HIDE_TOAST)
      clearTimeout(timer)
    }
    return {
      delay,
      theme,
      message,
      visible,
      afterLeave
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/tool.scss';

@mixin setToastTheme {
  $themes: (
    'success': (
      'background-color': rgba(49, 218, 134, 0.35),
      'color': #24df78
    ),
    'warning': (
      'background-color': rgba(250, 201, 51, 0.35),
      'color': #fac933
    ),
    'error': (
      'background-color': rgba(253, 18, 84, 0.35),
      'color': #fc1153
    ),
    'default': (
      'background-color': rgba(26, 100, 238, 0.35),
      'color': #1a64ee
    )
  );
  @each $theme, $value in $themes {
    &[data-theme="#{$theme}"] {
      background:
        linear-gradient(to right, map-get($value, 'background-color'), #2a274d 45%),
        #2a274d;
      .theme-icon {
        background: url('../assets/images/#{$theme}.png') no-repeat center / 100%;
      }
      .content {
        > h4 {
          color: map-get($value, 'color');
        }
      }
    }
  }
}

.toast {
  position: fixed;
  right: 40px;
  top: 20px;
  @include zIndex(affix);
  width: 400px;
  min-height: 100px;
  padding: 20px 30px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  .theme-icon {
    width: 32px;
    height: 32px;
    margin-right: 30px;
    flex: none;
  }
  .content {
    > h4 {
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 10px;
    }
    > p {
      font-size: 16px;
      line-height: 1.5;
      color: #adaac9;
    }
  }
  .close-button {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    background: url('../assets/images/close.png') no-repeat center / 100%;
  }
  @include setToastTheme();
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(120%);
}
.slide-enter-active, .slide-leave-active {
  transition: transform ease 0.4s;
}
</style>
