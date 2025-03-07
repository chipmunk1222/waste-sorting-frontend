<template>
  <div class="seamless-scroll">
    <div class="seamless-scroll__wrapper">
      <div class="seamless-scroll__box">
        <div class="seamless-scroll__box-top">
          <slot></slot>
        </div>
        <div class="seamless-scroll__box-bottom">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  //两次滚动所需时长
  delay:{
    type: Number,
    default: 1
  },
  //滚动单位距离的时间
  during:{
    type: Number,
    default: 2
  }
})
</script>
<style scoped lang="scss">
  .seamless-scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .seamless-scroll__wrapper {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      .seamless-scroll__box {
        width: 100%;
        height: 100%;
        .seamless-scroll__box-top {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .seamless-scroll__box-bottom {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      }
    }
  }
</style>