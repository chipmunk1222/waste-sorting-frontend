<template>
	<div class="container">
		<div class="page-change" @click="changepage('/')">
			返回可视化大屏 <Icon class="page-change-icon" :name="'push'" />
		</div>
		<div class="frame"></div>
		<div class="shell">
			<div class="content">
				<div
					class="item"
					v-for="(item, index) in items"
					:key="index"
					@click="openGallery(item.type)"
				></div>
			</div>
		</div>
	</div>
	<GalleryView ref="galleryRef" :sortedImageData="imageData" />
</template>
<script setup lang="ts">
import GalleryView from "./GalleryView.vue";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import Icon from "@/components/Icon.vue";
import { getWasteType } from "@/api/test";
const garbage = ref([]);
const imageData = ref([]);
const galleryRef = ref();
const items = ref([
	{ id: 1, type: "可回收垃圾" },
	{ id: 2, type: "有害垃圾" },
	{ id: 3, type: "厨余垃圾" },
	{ id: 4, type: "其他垃圾" },
]);
const imageFilter = () => {
	return garbage.value.map((item: any) => {
		return {
			id: item.id,
			time: item.time,
			caption: item.garbage_type,
			url: item.image_base64,
		};
	});
};
onMounted(async () => {
	garbage.value = await getWasteType();
});
watch(
	garbage,
	(newVal) => {
		if (newVal && newVal.length > 0) {
			imageData.value = imageFilter();
			console.log(imageData.value);
		}
	},
	{ immediate: true }
);
const router = useRouter();
const changepage = (path: string) => {
	router.push({ path });
};
const openGallery = (type: string) => {
	galleryRef.value.open(type);
};
</script>

<style lang="scss" scoped>
.container {
	max-width: 100vw;
	width: 100vw;
	height: 100vh;
	position: relative;
	background-image: radial-gradient(
			circle,
			rgba(135, 254, 88, 0.65) 0%,
			rgba(203, 255, 182, 0.65) 30%
		),
		url("@/assets/img/bg.jpg");
	background-position: center center;
	background-size: cover;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	.frame {
		position: absolute;
		width: 100vw;
		height: 100vh;
		transform: translateY(-0.8696rem) translateZ(-25vw);
		// max-width: 6.6087rem;
		// max-height: 4.3478rem;
		background-image: url("@/assets/img/garbage/green.png");
		background-size: contain;
		background-position: center center;
		background-repeat: no-repeat;
		// border: .0348rem solid red; /* 设置框的样式 */
		// z-index: 1; /* 确保框在前面 */
		pointer-events: none;
	}
	.shell {
		position: relative;
		width: 60vw;
		height: 40vh;
		max-width: 6.6087rem;
		max-height: 4.3478rem;
		margin: 0;
		color: white;
		perspective: 13.913rem;
		transform-origin: center;

		.content {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			width: 100%;
			height: 100%;
			transform-origin: center;
			transform-style: preserve-3d;
			transform: translateZ(-30vw) rotateY(0);
			animation: carousel 20s infinite cubic-bezier(0.77, 0, 0.175, 1) forwards;
			/* 动画：名称为carousel，持续时间9秒，无限循环，缓动函数为cubic-bezier(0.77, 0, 0.175, 1)，动画结束后保持最后状态 */

			.item {
				position: absolute;
				width: 40vw;
				height: 50vh;
				// max-width: 6.6087rem;
				// max-height: 4.3478rem;
				box-shadow: 0 0.087rem 0.3478rem rgba(0, 0, 0, 0.3);
				border-radius: 0.2783rem;
				background-size: contain;
				background-position: center center;
				background-repeat: no-repeat;
				-webkit-box-reflect: below 0.4348rem -webkit-linear-gradient(transparent
							50%, rgba(255, 255, 255, 0.3));
				&:hover {
					filter: drop-shadow(0rem 0rem 0.3478rem #f6fe91);

					cursor: pointer;
				}
			}
			.item:nth-child(1) {
				background-image: url("@/assets/img/garbage/type1.png");
				transform: rotateY(0) translateZ(35vw);
			}

			/* 第二个项目样式 */
			.item:nth-child(2) {
				background-image: url("@/assets/img/garbage/type2.png");
				transform: rotateY(90deg) translateZ(35vw);
			}

			/* 第三个项目样式 */
			.item:nth-child(3) {
				background-image: url("@/assets/img/garbage/type3.png");
				transform: rotateY(180deg) translateZ(35vw);
			}

			.item:nth-child(4) {
				background-image: url("@/assets/img/garbage/type4.png");
				transform: rotateY(270deg) translateZ(35vw);
			}
		}
	}
}
@keyframes carousel {
	0%,
	16% {
		transform: translateZ(-35vw) rotateY(0);
		/* 变换：沿z轴平移-35vw，绕y轴旋转0度 */
	}

	25%,
	41% {
		transform: translateZ(-35vw) rotateY(-90deg);
		/* 变换：沿z轴平移-35vw，绕y轴旋转-120度 */
	}

	50%,
	66% {
		transform: translateZ(-35vw) rotateY(-180deg);
		/* 变换：沿z轴平移-35vw，绕y轴旋转-240度 */
	}

	75%,
	91% {
		transform: translateZ(-35vw) rotateY(-270deg);
		/* 变换：沿z轴平移-35vw，绕y轴旋转-360度 */
	}

	100% {
		transform: translateZ(-35vw) rotateY(-360deg);
		/* 变换：沿z轴平移-35vw，绕y轴旋转-360度 */
	}
}

// @keyframes carousel {
//   0%,
//   17.5% {
//       transform: translateZ(-35vw) rotateY(0);
//       /* 变换：沿z轴平移-35vw，绕y轴旋转0度 */
//   }

//   27.5%,
//   45% {
//       transform: translateZ(-35vw) rotateY(-120deg);
//       /* 变换：沿z轴平移-35vw，绕y轴旋转-120度 */
//   }

//   55%,
//   72.5% {
//       transform: translateZ(-35vw) rotateY(-240deg);
//       /* 变换：沿z轴平移-35vw，绕y轴旋转-240度 */
//   }

//   82.5%,
//   100% {
//       transform: translateZ(-35vw) rotateY(-360deg);
//       /* 变换：沿z轴平移-35vw，绕y轴旋转-360度 */
//   }

// }
.page-change {
	position: absolute;
	top: 0;
	right: 1.7391rem;
	font-size: 20px;
	font-weight: bold;

	line-height: 1.0435rem;
	color: #367455c0;
	cursor: pointer;
	mix-blend-mode: difference;
	&:hover {
		color: #6fbcc9bd;
	}
	&-icon {
		transform: scaleX(-1);
	}
}
</style>
