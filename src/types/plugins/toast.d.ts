import { App } from 'vue'

interface Props extends Record<string, unknown> {
  theme: 'success' | 'warning' | 'error' | 'default';
  title?: string;
  message: string;
  delay?: number;
}

export interface ToastInstance {
  VM: App | null;
  wrap: HTMLDivElement | null;
  show: (props: Props) => void;
  hide: () => void;
}