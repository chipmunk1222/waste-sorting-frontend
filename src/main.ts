import './assets/main.css';
import './utils/flexible.js';
import './assets/var.css';
// import '//at.alicdn.com/t/c/font_4781691_b7gm2f8wfdj.css';
// import './assets/variable.scss';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import scroll from 'vue-seamless-scroll'
// import SeamlessScroll from 'vue-seamless-scroll';
import {vue3ScrollSeamless} from "vue3-scroll-seamless";
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

const app = createApp(App)

app.use(router)
app.component('vue3ScrollSeamless',vue3ScrollSeamless)

app.use(VueViewer)

app.mount('#app')
