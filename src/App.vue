<template>
  <div class="app" v-loading="!!loading">
    <header>
      <el-menu
          mode="horizontal"
          router
      >
        <el-menu-item v-for="(item, key) in navigation" :key="key" :index="item.path">
          {{item.meta?.title}}
        </el-menu-item>
      </el-menu>
    </header>
    <Suspense>
      <router-view />
    </Suspense>
  </div>
</template>
<script setup lang="ts">
import {useStore} from "@/pinia/store";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";
import {computed} from "vue";

const store = useStore()
const {loading} = storeToRefs(store)
const router = useRouter()
const navigation = computed(() => router
    .getRoutes()
    .filter((route) => !!route.meta.index)
    .sort((a, b) => (a.meta?.index - b.meta?.index)))
</script>
<style lang="scss">
.app{
  padding: 16px;
  header{
    margin-bottom: 30px;
  }
}
</style>