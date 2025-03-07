<template>
	<div class="china-chart" ref="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import "echarts-gl";
import china from "@/assets/map/China.json"; // 确保你的项目中有这个文件
import { quantity } from "echarts/types/src/util/number.js";

const chart = ref(null);

interface areaItem {
	id: number;
	name: string;
	number: number;
	unit: string;
}

const props = defineProps<{ data: areaItem[] }>();

onMounted(() => {
	const myChart = echarts.init(chart.value);
	echarts.registerMap("china", china);

	const visualMap = {
		show: true,
		min: 100,
		max: 3100,
		left: "left",
		bottom: "bottom",
		text: ["高", "低"],
		inRange: {
			color: ["#e0ffff", "#0057ae"],
		},
		calculable: true,
	};

	const options = {
		name: "中国地图",
		tooltip: {
			trigger: "item",
		},
		// label: {
		// 	show: true,
		// },
		visualMap: visualMap,
		geo3D: {
			type: "map3D",
			map: "china",
			roam: true,
			regionHeight: 0,
			shading: "realistic",
			height: 1000,
			top: -230,
			itemStyle: {
				color: "#00a6ce",
				borderColor: "#008fd6",
				borderWidth: 1,
				opacity: 0.3,
			},
			label: {
				show: true, // Enable labels by default
				textStyle: {
					color: "#fff",
					fontSize: 16,
					opacity: 1,
					backgroundColor: "#000",
				},
			},
			viewControl: {
				distance: 200,
				alpha: 70,
				beta: 0,
			},
		},

		series: [
			{
				name: "垃圾清运量/亿吨",
				type: "map3D",
				map: "china",
				roam: true,
				regionHeight: 5,
				shading: "realistic",
				height: 1000,
				top: -230,
				itemStyle: {
					borderColor: "#B1E9E9",
					borderWidth: 1,
					opacity: 0.8,
				},
				viewControl: {
					distance: 200,
					alpha: 70,
					beta: 0,
				},
				label: {
					show: true, // Enable labels by default
					textStyle: {
						color: "#fff",
						fontSize: 16,
						opacity: 1,
						backgroundColor: "#000",
					},
				},
				regions:[{
					label:{
						show: true
					}
				}],
				emphasis: {
					itemStyle: {
						areaColor: "#61A4E4",
						borderColor: "#5392d7",
						borderWidth: 2,
						opacity: 1,
						fontWidth: 'bold'
					},
					// label: {
					// 	show: true,
					// 	textStyle: {
					// 		color: "#fff",
					// 		backgroundColor: "#000",
					// 		fontSize: 12,
					// 		fontWeight: "bold",
					// 	},
					// },
				},
				data: props.data.map((item) => ({
					name: item.name,
					value: item.number,
				})),
			},
		],
	};

	myChart.setOption(options);

	window.addEventListener("resize", function () {
    myChart.resize();
  });
});
</script>

<style scoped>
.china-chart {
	width: 100%;
	height: 100%;
	overflow: visible;
}
</style>
