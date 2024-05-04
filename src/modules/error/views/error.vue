<template>
  <div class="view__error">
    <el-empty :description="`Will be redirected to product list in ${timeLeft}`">
      <el-button type="primary" @click="returnHome">Return to home</el-button>
    </el-empty>
  </div>
</template>
<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, onUnmounted, ref} from "vue";

const router = useRouter()
const returnHome = () => router.push({name: 'home'})

const timer = ref()
const timeLeft = ref(3);
onMounted(() => {
  console.log('start timer')
  timer.value = setInterval(() => {
   if(!timeLeft.value) {
     router.push({name: 'products'})
   }
   timeLeft.value--;
  }, 1000)
})
onUnmounted(() => clearInterval(timer.value))
</script>