<template>
  <div class="type-chart-wrapper" ref="chartRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts";

const chartRef = ref();

interface DataItem {
  id?: number;
  name: string;
  value: number;
}

interface DataList extends Array<DataItem> {}

const props = defineProps<{ data: DataList }>();

let myChart: any;

const initChart = () => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value);
    myChart.setOption({
      tooltip: {
        trigger: "item",
      },
      legend: {
        left: "center",
        itemWidth: 18, // 图例标记的宽度
        itemHeight: 12, // 图例标记的高度
        textStyle: {
          fontSize: 14, // 图例文字大小
          color: "#fff", // 图例文字颜色
        },
      },
      series: [
        {
          name: "垃圾类型",
          type: "pie",
          radius: ["30%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
            length: 15,
            length2: 10,
            smooth: true,
          },
          data: props.data,
        },
      ],
    });

    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
};

onMounted(() => {
  initChart();
});

watch(
  () => props.data,
  (newData) => {
    if (myChart) {
      myChart.setOption({
        series: [
          {
            data: newData,
          },
        ],
      });
    }
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
.type-chart-wrapper {
  width: 100%;
  height: 100%;
}
</style>
