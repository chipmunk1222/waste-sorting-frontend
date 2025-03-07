<template>
	<div class="header">
    垃圾分类可视化大屏
    <div class="page-change" @click="changepage('/sort')">
      进入分类详情页
      <Icon class="page-change-icon" :name="'push'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const changepage = (name:string) => {
  router.push({ path: name});
}
</script>
<style lang="scss">
.header {
	width: 100%;
	height: 1.3913rem;
	position: absolute;
	top: 0;
	left: 0;
	margin-bottom: 0.25rem;
	background-image: url("@/assets/img/nav2.png");
	text-align: center;
	line-height: 1.0435rem;
	color: #73e8fc;
	background-position: center center;
	background-size: 100% 400%;
	background-repeat: no-repeat;
}
.page-change{
  position: absolute;
  top: 0;
  right: 1.7391rem;
  font-size: .2783rem;
  line-height: 1.0435rem;
  color: #73dafcba;
  cursor: pointer;
  &:hover{
    color: #73e8fc;
  }
}
</style>
