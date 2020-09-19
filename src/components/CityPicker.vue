<template>
  <div class="city-picker">
    <div class="city-picker__mask"></div>
    <div class="city-picker__content">
      <div class="city-picker__search-bar">
        <input type="text" placeholder="请输入你所在的城市名" @input="onInput">
        <button>搜索</button>
      </div>
      <div class="city-picker__list">
        <ul v-if="displayList.length">
          <template v-for="(item, index) in displayList" :key="item.adcode">
            <li v-if="isDifferentLetter(index)" data-point="true">
              {{ item.initialLetter.toUpperCase() }}
            </li>
            <li @click="onClick(index)" :data-selected="data.cityCode === item.adcode">{{ item['中文名'] }}</li>
          </template>
        </ul>
        <img v-else class="city-picker__default-img" src="/@/assets/images/no_data.png">
      </div>
      <div class="city-picker__buttons">
        <button @click="$emit('on-cancel')">取消</button>
        <button @click="onConfirm">确认</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { Vuex } from '/@/types/vuex'
import cityCodeList from '/@/assets/json/citycode.ts'
import { cityCodesType } from '/@/types/cityCode'

export default defineComponent({
  name: 'CityPicker',
  setup (_props, context) {
    const store = useStore<Vuex.State>()
    const data = reactive<{
      cityCodeList: cityCodesType;
      searchResult: cityCodesType;
      searchKeyWords: string;
      cityCode: string;
    }>({
      cityCodeList,
      searchResult: [],
      searchKeyWords: '',
      cityCode: store.state.cityCode
    })
    const displayList = computed(() => {
      return data.searchKeyWords ? data.searchResult : data.cityCodeList
    })

    const isDifferentLetter = (index: number): boolean => {
      if (!index) {
        return true
      }
      return data.cityCodeList[index].initialLetter !== data.cityCodeList[index - 1].initialLetter
    }

    let inputTimer: number = -1
    const onInput = (event: InputEvent) => {
      clearTimeout(inputTimer)
      inputTimer = window.setTimeout(() => {
        const { value } = (event.target as HTMLInputElement)
        if (value) {
          data.searchResult = data.cityCodeList.filter(item => {
            if (/\p{Unified_Ideograph}/u.test(value)) {
              return item['中文名'].indexOf(value) !== -1
            }
            if (/[a-zA-z]/.test(value)) {
              const inputValue = value.toLowerCase()
              return item.pinyin.indexOf(inputValue) !== -1
            }
            return false
          })
        }
        data.searchKeyWords = value
      }, 60)
    }
    const onClick = (index: number) => {
      const city = displayList.value[index]
      if (city.adcode !== store.state.cityCode) {
        data.cityCode = city.adcode
      }
    }
    const onConfirm = () => {
      if (data.cityCode !== store.state.cityCode) {
        store.commit('updateCityCode', data.cityCode)
      }
      context.emit('on-confirm')
    }
    return {
      data,
      displayList,
      isDifferentLetter,
      onInput,
      onClick,
      onConfirm
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/tool.scss';

.city-picker {
  position: fixed;
  top: 0;
  left: 0;
  @include zIndex(modal);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @include zIndex(wallpaper);
    background: rgba(0,0,0,0.8);
  }
  &__content {
    background: rgb(94, 93, 111);
    height: 600px;
    width: 900px;
    border-radius: 8px;
    padding: 40px;
  }
  &__search-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    > input, > button {
      border-radius: 4px;
    }
    > input {
      height: 40px;
      line-height: 40px;
      margin-right: 40px;
      width: 300px;
      padding: 1em 0.5em;
      font-size: 16px;
      border: none;
    }
    > button {
      width: 100px;
      height: 40px;
      background: #f1908c;
      color: #fff;
    }
  }
  &__list {
    height: 400px;
    overflow-y: auto;
    @include scrollBar;
    margin-bottom: 2em;
    > ul {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      > li {
        border: 1px solid #E16B8C;
        padding: 0.5em 1em;
        margin-right: 2em;
        margin-bottom: 2em;
        color: #fff;
        width: 29%;
        text-align: center;
        line-height: 1.5;
        cursor: pointer;
        &[data-point="true"] {
          margin-right: 0;
          width: 100%;
          border: none;
          background: #E16B8C;
          text-align: left;
          cursor: auto;
        }
        &[data-selected="true"] {
          background: #E16B8C;
        }
      }
    }
  }
  &__default-img {
    width: 128px;
    display: block;
    margin: 50px auto;
  }
  &__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    > button {
      width: 150px;
      height: 40px;
      line-height: 40px;
      color: #fff;
      font-size: 16px;
      text-align: center;
      border-radius: 4px;
      &:nth-of-type(1) {
        border: 1px solid #f1908c;
        background: transparent;
        margin-right: 2em;
      }
      &:nth-of-type(2) {
        background: #f1908c;
      }
    }
  }
}
</style>
