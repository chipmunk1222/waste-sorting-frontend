/// <reference types="vite/client" />

declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}

declare module 'vue3-seamless-scroll' {
  import { Plugin } from 'vue';
  const Vue3SeamlessScroll: Plugin;
  export default Vue3SeamlessScroll;
}

declare module 'vue3-seamless-scroll';

declare module 'vue3-scroll-seamless';