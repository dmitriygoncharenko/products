import {defineStore} from "pinia";
import {ref} from "vue";
import type {Product} from "@/api/api";
import {api} from "@/api";

export const useProductStore = defineStore('productStore', () => {
    const products = ref<Product[] | undefined>([])
    const product = ref<Product | undefined>()
    const pagination = ref({limit: 10, skip: 0, q: ''})
    const total = ref(0)
    const getProducts = async () => {
        const response = await api.products.searchList(pagination.value)
        products.value = response?.data.products
        response?.data.total && (total.value = response?.data.total)
    }
    const getProduct = async (id: number) => {
        const response = await api.products.productsDetail(id)
        product.value = response?.data
    }

    return {products, product, total, pagination, getProducts, getProduct}
})