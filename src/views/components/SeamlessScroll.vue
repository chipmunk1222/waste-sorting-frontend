<template>
	<ul class="scroll-list">
		<!-- <li class="scroll-list-item">

    </li> -->
		<vue3ScrollSeamless
			class="scroll-wrap"
			:classOptions="classOptions"
			:dataList="listData"
		>
			<li
				class="scroll-list-item"
				v-for="(item, index) in listData"
				:key="index"
			>
				<div class="sort-time">{{ item.time }}</div>
				<div class="sort-type">{{ item.type }}</div>
				<div class="sort-img">{{ item.img }}</div>
			</li>
		</vue3ScrollSeamless>
	</ul>
</template>

<script setup lang="ts">
import { ref } from "vue";
interface ListItems {
	id: number;
	img?: string;
	time?: string;
	type?: string;
}

interface OptionItems {
	step?: number; //滚动速度
	limitMoveNum?: number; //限制无缝滚动数据量
	hoverStop?: boolean; //是否开启鼠标移入停止滚动
	direction?: number; //方向: 0 往下 1 往上 2 向左 3 向右。
	singleHeight?: number; //单步数据高度
	singleWidth?: number; //单步数据宽度
	waitTime?: number; //单步停顿时间
	isSinglepxUnit?: boolean; //是否开启px度量
}
const props = defineProps<{
	listData: any;
	classOptions: OptionItems;
}>();

// const classOptions = {
// 	limitMoveNum: 6,
// }
</script>

<style scoped lang="scss">
.scroll-list {
	width: 90%;
	height: 97%;
	list-style: none;
	margin: 0 auto;
	.scroll-wrap {
		width: 100%;
		height: 100%;
		overflow: hidden;
		.scroll-list-item {
			width: 100%;
			height: .5217rem;
			line-height: .5217rem;
			text-align: center;
			display: flex;
			justify-content: space-between;
			// border-bottom: solid .0174rem rgb(223, 223, 223);
			.sort-time,
			.sort-img,
			.sort-type {
				font-size: small;
				color: rgb(223, 223, 223);
			}
			.sort-type {
				color: rgb(237, 237, 237);
			}
			// .sort-time{
			//   width: 30%;
			// }
			// .sort-type{
			//   width: 25%;
			// }
			// .sort-img{
			//   width: 40%;
			// }
		}
	}
}
</style>
