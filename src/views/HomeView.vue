
<template>
  <div class="container">
    <Header />
    <Main />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import Main from './components/Main.vue';

</script>

<style scoped lang="scss">
  .container {
    max-width: 100vw;
    width: 100vw;
    height: 100vh;
    position: relative;
    background-image: radial-gradient(circle, #51939e 0%, rgba(0, 0, 0, 0.65) 30%), url("@/assets/img/bg.jpg");
    background-position: center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
  }
</style>