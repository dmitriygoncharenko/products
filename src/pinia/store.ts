import {defineStore} from "pinia";
import {ref} from "vue";

export const useStore = defineStore('store', () => {
  const loading = ref(0)
  return {loading}
})