import { reactive, toRefs } from 'vue'

export default function useFeature (data: {[key: string]: any}) {
  const state = reactive(data)
  return toRefs(state)
}
