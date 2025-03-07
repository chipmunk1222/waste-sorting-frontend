<template>
  <div class="gallery-container" v-if="formVisible">
    <div class="gallery-content-wrapper">
      <div class="gallery-content-title">{{ dataTitle }}</div>
      <div class="gallery-content-scroll">
        <div class="gallery-content">
          <div class="gallery-item" v-for="image in imageData" :key="image.id">
            <div class="gallery-item-img">
              <img :src="getImageSrc(image.url)" alt="Image" />
            </div>
            <div class="gallery-item-time">{{ image.time }}</div>
            <div class="gallery-item-caption">{{ image.caption }}</div>
          </div>
        </div>
      </div>
      <div class="close-button">
        <Icon class="close-icon" name="close" @click="formVisible = false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineExpose, watch } from "vue";
import Icon from "@/components/Icon.vue";

// 定义 props 的类型
interface ImageDataItem {
  id: number;
  url: string;
  time: string;
  caption: string;
}

const props = defineProps<{
  sortedImageData: ImageDataItem[];
}>();

const imageData = ref<ImageDataItem[]>([]); // 初始化为空数组

const dataTitle = ref<string>("可回收垃圾");
const formVisible = ref<boolean>(false);

const resetForm = () => {
  imageData.value = [];
};

const getImageSrc = (base64String: string) => {
  return `data:image/png;base64,${base64String}`;
};

const open = async (type: string) => {
  switch (type) {
    case "可回收垃圾":
      dataTitle.value = "可回收垃圾";
      break;
    case "有害垃圾":
      dataTitle.value = "有害垃圾";
      break;
    case "其他垃圾":
      dataTitle.value = "其他垃圾";
      break;
    case "厨余垃圾":
      dataTitle.value = "厨余垃圾";
      break;
    default:
      alert("error");
      break;
  }

  // 过滤数据并赋值给 imageData
  imageData.value = props.sortedImageData.filter((item) => item.caption === type);

  formVisible.value = true;
};

defineExpose({ open });

// 监听 props.sortedImageData 的变化
watch(
  () => props.sortedImageData,
  (newData) => {
    if (newData) {
      imageData.value = newData;
      console.log(imageData.value);
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.gallery-container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.gallery-content-wrapper {
  position: relative;
  width: 90%;
  height: 90%;
  background-image: url("@/assets/img/border.txt");
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  .gallery-content-title {
    position: absolute;
    top: 0.3478rem;
    font-size: 0.6957rem;
    font-weight: bold;
    letter-spacing: 0.0522rem;
    color: rgb(226, 251, 243);
  }
  .gallery-content-scroll {
    position: absolute;
    width: 85%;
    height: 75%;
    top: 1.7391rem;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    justify-content: center;
  }
  .gallery-content {
    width: 95%;
    position: relative;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto;
    grid-gap: 0.6957rem;
    justify-items: center;
    align-items: center;
    .gallery-item {
      border: solid 0.0348rem #f8cca4;
      border-radius: 0.1739rem;
      width: 2.9565rem;
      color: #484848;
      &:hover {
        cursor: pointer;
        img {
          transform: scale(1.2);
          transition: transform 0.3s ease;
        }
      }
      &-img {
        border-top-left-radius: 0.1739rem;
        border-top-right-radius: 0.1739rem;
        width: 100%;
        height: 2.087rem;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &-time {
        font-size: 0.2783rem;
        padding: 0.087rem 0 0.0696rem 0.1043rem;
      }
      &-caption {
        font-size: 0.4174rem;
        font-weight: bold;
        padding: 0.0696rem;
      }
    }
  }
  .close-button {
    position: absolute;
    top: 0.9565rem;
    right: 0.9565rem;
    width: 0.6957rem;
    height: 0.6957rem;
    .close-icon {
      font-size: 0.4348rem;
      color: #48484882;
      &:hover {
        cursor: pointer;
        color: darken(#48484882, 80%);
      }
    }
  }
}
</style>
