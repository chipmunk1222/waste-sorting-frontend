<template>
  <div class="head-card">
    <Icon class="head-card-icon" :name="item.icon" />
    <div class="head-card-content">
      <div class="head-card-title text-decoration-sm-1">{{ item.title }}</div>
      <div class="head-card-value">{{ item.value }}</div>
    </div>

  </div>
</template>

<script setup lang="ts">    
// import { defineProps } from 'vue';
import Icon from '@/components/Icon.vue';

defineProps({
  item: {
    type: Object,
    required: true
  }
})

</script>

<style scoped lang="scss">
.head-card{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: rgba($color: #4aaac7, $alpha: .1);
  border-radius: .087rem;
  // filter:drop-shadow(0rem 0rem .1739rem #73e8fc) ;
  box-shadow: 
    .0174rem .0174rem .0348rem #9abffc,
    .0174rem .0174rem .087rem #aab3f9;
  // filter: blur(.0348rem);
  .head-card-icon{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.0435rem;
    height: 1.0435rem;
    font-size: .6957rem;
    background: url("@/assets/img/icon_border4.png");
    background-size: cover;
    background-position: center center;
    color: #73e8fc;
    // color: #fff;
  }
  .head-card-content{
    width: calc(100% - 1.7391rem);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .head-card-title{
      font-size: .2783rem;
      font-weight: bold;
      font-family: 'electronic';
    }
    .head-card-value{
      // font-size: .3478rem;
      font-size: .6957rem;
      font-weight: bold;
      // color: #73e8fc;
      color: #73e8fc;
      letter-spacing: .087rem;
      font-family: 'electronic';
      text-shadow: 
        0 0 .0348rem #fff,
        0 0 .0696rem #000,
    }
  }
}
</style>