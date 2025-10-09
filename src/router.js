import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/competitors',
      name: 'competitors',
      component: () => import('./games/competitors.vue')
    },
    {
      path: '/role-D100',
      name: 'role-D100',
      component: () => import('./games/roleD100.vue')
    },
        {
      path: '/stealOrDeal',
      name: 'stealOrDeal',
      component: () => import('./games/stealOrDeal.vue')
    },
  ],
})

export default router
