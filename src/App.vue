<script setup>
import { ref } from 'vue'
import Svg from '@/components/Svg.vue'
import './assets/css/layout.css'
console.log(1224)
const msg = ref('Hello World!')
</script>

<template id="app">
  <h1>{{ msg }}</h1>
  <input v-model="msg">
  <img src="@/assets/微信截图_20220501025847.png" alt="456">
  <Svg style="width: 20px;height: 20px; color: red;"></Svg>
</template>

<style lang="scss">
#app {
  img {
    width: 60px;
    height: 80px;
  }
}
</style>