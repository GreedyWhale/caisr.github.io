declare module '*.md' {
  export const Mode: ('html' | 'toc' | 'react' | 'vue')[];
  export const attributes: {
    [key: string]: string;
  };
  export const html: string;
  export const toc: { level: string; content: string }[]
  export const VueComponent: any;
  export const ReactComponent: any;
}
