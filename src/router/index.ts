import { createRouter, createWebHashHistory  } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoveTime from '@/views/LoveTime.vue'

const router = createRouter({
  history: createWebHashHistory (import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/loveTime',
      name: 'loveTime',
      component: LoveTime
    }
  ]
})

export default router
