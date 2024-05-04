<template>
  <div class="view__products">
    <el-table :data="products">
      <el-table-column label="Image" width="70px" align="center">
        <template #default="scope">
          <div :style="`background-image: url('${scope.row.thumbnail}');`" class="product-image"/>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Title"/>
      <el-table-column align="right">
        <template #header>
          <el-input
              v-model="search"
              @keydown.enter="handleSearch"
              placeholder="Enter query and press Enter to search"
              clearable
              @clear="handleClear"
          />
        </template>
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleOpen(scope.row.id)">
            Open
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-pagination
          background
          layout="sizes, prev, pager, next"
          :total="total"
          v-model:page-size="pagination.limit"
          :page-sizes="[10, 25, 50, 100]"
          v-model:current-page="currentPage"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import {useProductStore} from "@/modules/products/store/product";
import {computed, watch, ref} from "vue";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";

const search = ref('')
const productStore = useProductStore()
await productStore.getProducts();
const { products, total, pagination } = storeToRefs(productStore)
const router = useRouter()

const handleSearch = () => pagination.value.q = search.value
const handleClear = () => pagination.value.q = ''
const handleOpen = (productId: number) => router.push({name: 'product', params: {productId}})

const currentPage = computed({
  get: () => {
    const step = Math.round(pagination.value.skip/pagination.value.limit)
    if(step === 0) return 1
    return step + 1
  },
  set: async (value) => {
    if(value === 1) {
      pagination.value.skip = 0
    }else{
      pagination.value.skip = value * pagination.value.limit - pagination.value.limit
    }
  }
})
watch(() => pagination.value, async () => {
  await productStore.getProducts()
}, {deep: true})

</script>
<style lang="scss">
.view__products{
  .product-image{
    width: 40px;
    height: 40px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 6px;
  }
  .footer{
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>