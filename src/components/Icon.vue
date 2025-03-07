<template>
  <i class="iconfont icon-container" :class="`icon-${name}`"></i>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="scss">
.icon-container {
  font-size: inherit;
}
</style>