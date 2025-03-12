# 项目简介
智能垃圾分类系统可视化大屏，使用Vue框架+Echarts库开发，后端使用智能垃圾检测机器学习大数据模型，通过硬件摄像头设备读取垃圾并实时分析垃圾类型，帮助垃圾分类决策。

本项目为该系统前端大屏可视化部分

# 功能简介
- 通过硬件摄像头实时捕获垃圾图像，通过axios接口实时获取垃圾数据并展示
- 使用饼状图获取垃圾类别信息，使用列表呈现数据
- 使用geo3d插件引入3d地图增加用户体验，使用动态滚屏展现实时性效果
- 实现类别历史检测功能查询，在gallery中保存相应类别历史记录
- 使用flexible.js+rem布局实现分辨率自适应

# 技术栈
Vue+Echarts+axios+typescript+scss+geo3d+vue3-seamless-scroll+flexible.js

# 相关项目
[豆瓣top100电影可视化大屏](https://github.com/chipmunk1222/douban-top100-screen)

# 技术支持

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
