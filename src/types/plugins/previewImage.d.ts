import { App } from 'vue'

export interface PreviewImageInstance {
  VM: null | App,
  wrap: null | HTMLDivElement,
  show: (path: string) => void,
  hide: () => void;
}