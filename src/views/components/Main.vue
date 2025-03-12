<template>
	<div class="main">
		<div class="left">
			<div class="left-top-panel box">
				<h2 class="title">垃圾处理现状</h2>
				<div class="left-top-panel-content box-content">
					<div class="dashboard"></div>
					<div class="harmful-waste">
						<div
							class="harmful-waste-item"
							v-for="(item, index) in harmfulWaste"
							:key="index"
						>
							<div class="harmful-waste-item-title text-decoration-sm-2">
								{{ item.title }}
							</div>
							<div
								class="harmful-waste-item-value"
								:class="`number-decoration-lg-${index + 1}`"
							>
								{{ item.value }}
							</div>
						</div>
					</div>
					<div class="waste-handle">
						<div
							class="waste-handle-item"
							v-for="(item, index) in wasteHandle"
							:key="index"
						>
							<div class="waste-handle-item-title text-decoration-sm-1">
								{{ item.title }}
							</div>
							<div
								class="waste-handle-item-value"
								:class="`number-decoration-lg-${index * 2 + 1}`"
							>
								{{ item.value }}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="left-bottom-panel box">
				<h2 class="title">可回收垃圾前十类别</h2>
				<div class="left-bottom-panel-contant box-content">
					<div class="waste-category-icon">
						<div
							class="waste-category-icon-item"
							v-for="(item, index) in cycleRankIcon"
							:key="index"
						>
							<Icon :name="item.name" />
						</div>
					</div>
					<div class="waste-category">
						<div class="waste-category-item text-decoration-sm-1">
							<div class="waste-category-item-name">类别</div>
							<div class="waste-category-item-number number-decoration-lg-1">
								数量
							</div>
							<div class="waste-category-item-price number-decoration-lg-1">
								价格/亿元
							</div>
						</div>
						<div
							class="waste-category-item text-decoration-sm-1"
							v-for="(item, index) in cycleRank"
							:key="index"
						>
							<div class="waste-category-item-name">{{ item.name }}</div>
							<div
								class="waste-category-item-number"
								:class="`number-decoration-lg-${Math.floor(index / 2) + 1}`"
							>
								{{ item.number }}{{ item.unit }}
							</div>
							<div
								class="waste-category-item-price"
								:class="`number-decoration-lg-${Math.floor(index / 2) + 1}`"
							>
								{{ item.price }}
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- <div class="left-top-panel box coner-box">
				<h2 class="title">电影评分分布</h2>
				<div id="score" class="chart"></div>
			</div>
			<div class="left-bottom-panel box coner-box">
				<h2 class="title">电影评分-评价人数关系</h2>
				<div id="number" class="chart"></div>
			</div> -->
		</div>

		<div class="middle">
			<div class="data-card">
				<div class="card-item" v-for="(item, index) in centerCard" :key="index">
					<HeadCard :item="item" />
				</div>
				<!-- <div
					class="card-item"
					v-for="(item, index) in centerCard"
					:key="item.id"
				>
					<div class="card-item-title">{{ item.title }}</div>
					<div class="card-item-value">{{ item.value }}</div>
				</div> -->
			</div>

			<div id="middle" class="middle-panel box">
				<h2 class="title">全国各地垃圾清运量</h2>
				<div class="middle-panel-content">
					<ChinaChart :data="areaCleanup" />
				</div>
				<!-- <div id="area" class="chart"></div> -->
			</div>
		</div>

		<div class="right">
			<div class="right-top-panel box">
				<h2 class="title">垃圾数据检测滚屏</h2>
				<div class="right-top-panel-content box-content">
					<SeamlessScroll
						:listData="listDataRef"
						:classOptions="classOptions"
					></SeamlessScroll>
					<!-- <seamless-scroll>
						<ul>
							<li v-for="(item, index) in listData" :key="index">{{ item.title }}</li>
						</ul>
					</seamless-scroll> -->
				</div>
			</div>
			<div class="right-bottom-panel box">
				<h2 class="title">检测垃圾类型占比</h2>
				<div class="right-bottom-panel-content box-content">
					<HotType :data="typeData" />
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
import Icon from "@/components/Icon.vue";
import HeadCard from "./HeadCard.vue";
import ChinaChart from "./ChinaChart.vue";
import SeamlessScroll from "./SeamlessScroll.vue";
import { getWasteType, getTest } from "@/api/test";
import HotType from "./HotType.vue";
import { INITIAL_GARBAGE_DATA } from "@/constants";
// import SeamlessScroll from 'vue-seamless-scroll';


const garbage = ref(INITIAL_GARBAGE_DATA);

onMounted(async () => {
	// console.log("1:",garbage.value);
	try {	
		const getValueFromInterface = await getWasteType();
		if (getValueFromInterface) {
			garbage.value = getValueFromInterface;
		}
		
	} catch (error) {
		console.log(error);	
	}

	// console.log("2",garbage.value);
	// const test = await getWasteType();
	// console.log(garbage.value)
	typeCalculate();
	listDataRef.value = listData();
	console.log(listDataRef);
	// const test = await getTest();
	// console.log(test);
});

const centerCard = ref([
	{ id: 1, title: "每年垃圾投放量", value: "2.15T", icon: "sum" },
	{ id: 2, title: "可回收垃圾占比", value: "16.16%", icon: "percent" },
	{ id: 3, title: "回收垃圾利用率", value: ">90%", icon: "useful" },
]);

const harmfulWaste = ref([
	{ id: 1, title: "有害垃圾占比", value: "16.16%" },
	{ id: 2, title: "有害垃圾收集率", value: "<0.01%" },
]);

const wasteHandle = ref([
	{ id: 1, title: "垃圾分类率", value: "92.6%" },
	{ id: 2, title: "平均垃圾处理成本", value: "985元/吨" },
	{ id: 3, title: "平均垃圾回收价值", value: "2000-5000元/吨" },
]);

const cycleRankIcon = ref([
	{ id: 1, name: "factory" },
	{ id: 2, name: "electron" },
	{ id: 3, name: "live" },
]);

const cycleRank = ref([
	// {id:0,name:"类别",number:}
	{ id: 1, name: "钢铁", number: 24081, unit: "万吨", price: 6664.0 }, // 亿元
	{ id: 2, name: "有色金属", number: 1375, unit: "万吨", price: 2968.4 },
	{ id: 3, name: "塑料", number: 1800, unit: "万吨", price: 1030.0 },
	{ id: 4, name: "纸", number: 6585, unit: "万吨", price: 1347.4 },
	{ id: 5, name: "轮胎", number: 675, unit: "万吨", price: 120.0 },
	{ id: 6, name: "报废家电", number: 18800, unit: "万台", price: 231.0 },
	{ id: 7, name: "报废机动车", number: 399, unit: "万辆", price: 413.4 },
	{ id: 8, name: "废旧纺织品", number: 415, unit: "万吨", price: 19.2 },
	{ id: 9, name: "废旧玻璃", number: 850, unit: "万吨", price: 49.0 },
	{ id: 10, name: "废电池", number: 74, unit: "万吨", price: 146.4 },
]);

const areaCleanup = ref([
	{ id: 1, name: "广东省", number: 3103, unit: "万吨" },
	{ id: 2, name: "江苏省", number: 1871, unit: "万吨" },
	{ id: 3, name: "山东省", number: 1674, unit: "万吨" },
	{ id: 4, name: "浙江省", number: 1445, unit: "万吨" },
	{ id: 5, name: "四川省", number: 1137, unit: "万吨" },
	{ id: 6, name: "河南省", number: 1130, unit: "万吨" },
	{ id: 7, name: "辽宁省", number: 993, unit: "万吨" },
	{ id: 8, name: "湖北省", number: 987, unit: "万吨" },
	{ id: 9, name: "福建省", number: 879, unit: "万吨" },
	{ id: 10, name: "上海市", number: 868, unit: "万吨" },
	{ id: 11, name: "北京市", number: 798, unit: "万吨" },
	{ id: 12, name: "湖南省", number: 797, unit: "万吨" },
	{ id: 13, name: "河北省", number: 786, unit: "万吨" },
	{ id: 14, name: "安徽省", number: 661, unit: "万吨" },
	{ id: 15, name: "重庆市", number: 628, unit: "万吨" },
	{ id: 16, name: "陕西省", number: 550, unit: "万吨" },
	{ id: 17, name: "江西省", number: 528, unit: "万吨" },
	{ id: 18, name: "广西壮族自治区", number: 520, unit: "万吨" },
	{ id: 19, name: "黑龙江省", number: 497, unit: "万吨" },
	{ id: 20, name: "云南省", number: 488, unit: "万吨" },
	{ id: 21, name: "吉林省", number: 464, unit: "万吨" },
	{ id: 22, name: "山西省", number: 461, unit: "万吨" },
	{ id: 23, name: "内蒙古自治区", number: 388, unit: "万吨" },
	{ id: 24, name: "新疆维吾尔自治区", number: 364, unit: "万吨" },
	{ id: 25, name: "贵州省", number: 353, unit: "万吨" },
	{ id: 26, name: "天津市", number: 307, unit: "万吨" },
	{ id: 27, name: "甘肃省", number: 273, unit: "万吨" },
	{ id: 28, name: "海南省", number: 254, unit: "万吨" },
	{ id: 29, name: "宁夏回族自治区", number: 127, unit: "万吨" },
	{ id: 30, name: "青海省", number: 110, unit: "万吨" },
	{ id: 31, name: "西藏自治区", number: 61, unit: "万吨" },
	{ id: 32, name: "台湾省", number: 1123, unit: "万吨" },
	{ id: 33, name: "香港特别行政区", number: 110, unit: "万吨" },
	{ id: 34, name: "澳门特别行政区", number: 21, unit: "万吨" },
]);

const listData = () => {
	// console.log(garbage.value);
	return garbage.value.map((item: any) => {
		const filterTime = item.time.split("T")[0];
		return {
			id: item.id,
			time: filterTime,
			type: item.garbage_type,
			img: "garbage_" + item.id + ".jpg",
		};
	});
};

let listDataRef = ref(); // listDataRef 包含处理后的数据

//滚动栏数据
// const listDataRef = ref([
// 	{ id: 0, time: "2024-12-10", type: "可回收垃圾", img: "garbage_1.jpg" },
// 	{ id: 1, time: "2024-12-10", type: "可回收垃圾", img: "garbage_2.jpg" },
// 	{ id: 2, time: "2024-12-10", type: "可回收垃圾", img: "garbage_3.jpg" },
// 	{ id: 3, time: "2024-12-10", type: "可回收垃圾", img: "garbage_4.jpg" },
// 	{ id: 4, time: "2024-12-10", type: "可回收垃圾", img: "garbage_5.jpg" },
// 	{ id: 5, time: "2024-12-10", type: "可回收垃圾", img: "garbage_6.jpg" },
// 	{ id: 6, time: "2024-12-10", type: "可回收垃圾", img: "garbage_7.jpg" },
// 	{ id: 7, time: "2024-12-10", type: "可回收垃圾", img: "garbage_8.jpg" },
// 	{ id: 8, time: "2024-12-10", type: "可回收垃圾", img: "garbage_9.jpg" },
// 	{ id: 9, time: "2024-12-10", type: "可回收垃圾", img: "garbage_10.jpg" },
// 	{ id: 10, time: "2024-12-10", type: "可回收垃圾", img: "garbage_11.jpg" },
// 	{ id: 11, time: "2024-12-10", type: "可回收垃圾", img: "garbage_12.jpg" },
// ]);

const typeData = ref([
	{ id: 1, name: "可回收垃圾", value: 0 },
	{ id: 3, name: "厨余垃圾", value: 0 },
	{ id: 4, name: "其他垃圾", value: 0 },
	{ id: 2, name: "有害垃圾", value: 0 },
]);

const typeCalculate = () => {
	garbage.value.forEach((item: any) => {
		if (item && item.garbage_type) {
			switch (item.garbage_type) {
				case "可回收垃圾":
					typeData.value[0].value++;
					break;
				case "厨余垃圾":
					typeData.value[1].value++;
					break;
				case "其他垃圾":
					typeData.value[2].value++;
					break;
				case "有害垃圾":
					typeData.value[3].value++;
					break;
				default:
					break;
			}
			// console.log(typeData.value);
		}
	});
};

//类型占比栏数据
// const typePercentRef = ref([
// 	{id:1,name:"可回收垃圾",value:33},
// 	{id:3,name:"厨余垃圾",value:31},
// 	{id:4,name:"其他垃圾",value:22},
// 	{id:2,name:"有害垃圾",value:14},
// ]);

const classOptions = {
	limitMoveNum: 6,
	step: 0.3,
};

watch(
	garbage,
	(newVal) => {
		if (newVal) {
			listDataRef.value = listData();
		}
	},
	{ deep: true }
);
</script>
<style lang="scss" scoped>
// @import "@/assets/variable.scss";
.main {
	width: 100%;
	height: calc(100% - 1.3913rem);
	position: relative;
	top: 1.3913rem;
	left: 0;
	display: flex;
	justify-content: space-around;
}

.left,
.right {
	width: 5rem;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}

.left-top-panel {
	width: 100%;
	height: 40%;
}
.left-bottom-panel {
	width: 100%;
	height: 50%;
}

.left-top-panel-content {
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	.dashboard {
		width: 1.7391rem;
		height: 1.7391rem;
		// border: solid 2.001px #ffffff;
		margin: 0.1739rem 0.1739rem 0.0348rem 0.087rem;
		background-image: url("@/assets/img/dashboard4.webp");
		// background-size: 100% 100%;
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
		// transform: scale(1.1);
		animation: rotate 8s linear infinite;
	}
	.harmful-waste {
		// margin: .1739rem;
		.harmful-waste-item {
			margin: 0.0696rem 0 0.0348rem 0.2609rem;
			&-title {
				font-size: 0.2783rem;
			}
			// &-value{

			// }
		}
	}
	.waste-handle {
		width: 100%;
		font-size: 15.313rem;
		.waste-handle-item {
			// margin: 0 auto;
			// padding: 3.0015px;
			padding: 0 0 0.0174rem 0.1739rem;
			width: 100%;
			display: flex;
			justify-content: space-between;
			// border: solid 1.0005px #fff;
			background: radial-gradient(
				farthest-corner at 60% 160%,
				rgba(68, 153, 223, 0.3) 0%,
				rgba(37, 56, 66, 0.3) 70%
			);
			// mix-blend-mode: exclusion;
			&-title {
				width: 50%;
			}
			&-value {
				width: 50%;
				font-size: 0.313rem;
			}
		}
	}
}

.left-bottom-panel-contant {
	width: 100%;
	height: calc(100% - 0.5217rem);
	display: flex;
	position: relative;
	// flex-direction: column;
	// justify-content: space-around;
	.waste-category-icon {
		width: 30%;
		// height: 100%;
		// height: 79.173.8783rem;
		// border: solid .0174rem #fff;
		&-item {
			// height: calc(100% / 3);
			height: 1.3913rem;
			// border: solid .0174rem #fff;
			background: url("@/assets/img/icon_border2.png");
			background-size: cover;
			background-position: center center;
			// transform: scale(.9);
			display: flex;
			justify-content: center;
			align-items: center;
			color: #73e8fc;
			font-size: 0.4522rem;
			// place-content: center;
		}
	}
	.waste-category {
		width: 70%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 0.0348rem 0 0 0.0696rem;
		.waste-category-item {
			width: 100%;
			display: flex;
			justify-content: space-between;
			font-size: 0.1913rem;
			&-name {
				width: 35%;
			}
			&-number {
				font-size: 0.2261rem;
				width: 40%;
				text-align: center;
			}
			&-price {
				font-size: 0.2261rem;
				width: 35%;
				text-align: center;
			}
		}
	}
}

.coner-box {
	width: 100%;
	height: 48%;
}

.middle {
	width: 13rem;
	height: 100%;
	display: flex;
	flex-direction: column;
	// justify-content: center;
	justify-content: space-between;
	align-items: center;
	.data-card {
		width: 100%;
		height: 20%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.card-item {
			width: 30%;
			height: 1.7391rem;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			// border: #00b9d8 solid .0174rem;
			// .card-item-title {
			// 	width: 100%;
			// 	height: .6957rem;
			// 	text-align: center;
			// 	font-size: .2783rem;
			// 	line-height: .6957rem;
			// 	color: #eee;
			// 	font-weight: bold;
			// 	font-family: "electronic";
			// }
			// .card-item-value {
			// 	font-family: "electronic";
			// 	width: 100%;
			// 	height: .8696rem;
			// 	font-size: .8696rem;
			// 	font-weight: bold;
			// 	text-align: center;
			// 	line-height: .8696rem;
			// 	color: #73e8fc;
			// }
		}
	}
	.middle-panel {
		width: 100%;
		height: 77%;
		// overflow: visible;
		.middle-panel-content {
			width: 100%;
			height: calc(100% - 0.5217rem);
			overflow: visible;
			// height: 100%;
		}
	}
}

.right-top-panel,
.right-bottom-panel {
	width: 100%;
	// height: 45%;
}
.right-top-panel {
	height: 45%;
}
.right-bottom-panel {
	height: 50%;
}

.right-top-panel-content {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: calc(100% - 0.6217rem);
	// .scroll-wrap {
	// 	height: 5.2174rem;
	// 	width: 100%;
	// 	overflow: hidden;
	// 	.scroll-list{
	// 		list-style:none;
	// 		padding: 0;
	// 		margin: 0 auto;
	// 		&-item{
	// 			display: flex;
	// 			align-items: center;
	// 			width: 100%;
	// 			text-align: center;
	// 		}
	// 	}
	// }
}
.right-bottom-panel-content {
	width: 100%;
	height: 4.3478rem;
	display: flex;
	justify-content: center;
	align-items: center;
}

.box {
	background-image: linear-gradient(
			rgba($color: #ddeaea, $alpha: 0.05) 0%,
			rgba($color: #22143e, $alpha: 0.8) 100%
		),
		url("@/assets/img/new_border.png");
	// background: rgba($color: #fff, $alpha: .1);
	border-radius: 0.087rem;
	// border: solid .0348rem #73e8fc;
	background-size: 100% 110%;
	background-position: center center;
	background-repeat: no-repeat;
	// filter: blur(.0348rem);
	position: relative;
	// &::before{
	// 	position: absolute;
	// 	width: 100%;
	// 	height: 100%;
	// 	content: "";
	// 	left: 0;
	// 	top: 0;
	// 	// background: rgba($color: #deefff, $alpha: 0.1);
	// 	// background-image: url("@/assets/img/new_border2.png");
	// 	background-size: 100% 100%;
	// 	background-position: center center;
	// 	background-repeat: no-repeat;
	// }
	h2 {
		// background-image: url("@/assets/img/nav.webp");
		// border: solid .0348rem #9de1ed;
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;

		font-size: 0.2783rem;
		line-height: 0.5217rem;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		width: 100%;
		height: 0.5217rem;
		white-space: nowrap;
	}
	.box-contet {
		width: 100%;
		height: calc(100% - 0.5217rem);
		position: relative;
	}
	// .chart {
	// 	width: 90%;
	// 	height: calc(100% - .5217rem);
	// 	position: relative;
	// 	left: 7%;
	// }
}

@keyframes rotate {
	0% {
		// transform: scale(1.1);
		rotate: 0deg;
		opacity: 1;
	}
	20% {
		opacity: 0.6;
	}
	40% {
		opacity: 1;
	}
	60% {
		opacity: 0.4;
	}
	80% {
		opacity: 0.8;
	}
	100% {
		// transform: scale(1.1);
		rotate: 360deg;
		opacity: 1;
	}
}
</style>
