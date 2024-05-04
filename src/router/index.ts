import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {title: 'Home', index: 1},
      component: () => import('@/modules/home/views/home.vue')
    },
    {
      path: '/error/:code',
      props: true,
      name: 'error',
      meta: {title: 'Error', index: 0},
      component: () => import('@/modules/error/views/error.vue')
    },
    {
      path: '/products',
      children: [
        {
          path: '',
          name: 'products',
          meta: {title: 'Products', index: 10},
          component: () => import('@/modules/products/views/products.vue')
        },
        {
          path: ':productId',
          props: true,
          name: 'product',
          meta: {title: 'Product', index: 0},
          component: () => import('@/modules/products/views/product.vue'),
        }
      ]
    }
  ]
})

export default router
