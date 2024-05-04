<template>
  <div class="view__product">
    <div v-if="product?.images" class="product-image" :style="`background-image: url('${product.images[activeImage]}')`"/>
    <div class="product-content">
      <div class="product-title">
        {{product?.title}}
      </div>
      <div class="product-category">
        {{product?.category}}
      </div>
      <div class="product-price">
        ${{product?.price}}
      </div>
      <div class="product-tags">
        <el-tag type="success">Discount: {{product?.discountPercentage}}%</el-tag>
        <el-tag type="primary">Rating: {{product?.rating}}</el-tag>
      </div>

      <div class="product-images">
        <div
            class="product-image__thumbnail"
            :class="{active: activeImage === key}"
            v-for="(image, key) in product?.images"
            :key="key"
            :style="`background-image: url('${image}')`"
            @click="activeImage = key"
        />
      </div>
      <div class="product-description">
        {{product?.description}}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useProductStore} from "@/modules/products/store/product";
import {storeToRefs} from "pinia";
import {useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute()
const productStore = useProductStore();
const {product} = storeToRefs(productStore)
await productStore.getProduct(Number(route.params.productId))

const activeImage = ref(0)
</script>
<style lang="scss">
.product-image{
  width: 100%;
  height: 300px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 12px;
}
.view__product{
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 40px;
  @media(max-width: 768px){
    grid-template-columns: initial;
    grid-template-rows: auto auto;
  }
  .product-content{
    .product-title{
      font-size: 50px;
      text-transform: uppercase;
    }
    .product-category{
      text-transform: uppercase;
      color: gray;
      font-size: 14px;
      margin-bottom: 10px;
    }
    .product-price{
      font-size: 30px;
    }
    .product-tags{
      display: flex;
      gap: 10px;
      margin: 20px 0;
    }
    .product-description{
      margin-top: 10px;
      line-height: 25px;
    }
  }
  .product-images{
    display: flex;
    gap: 10px;
    .product-image__thumbnail{
      cursor: pointer;
      height: 40px;
      width: 40px;
      border-radius: 100%;
      border: 2px solid #eee;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      &.active{
        border-color: #00c582;
      }
    }
  }
}
</style>