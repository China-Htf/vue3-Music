import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// 首页一级导航菜单
import { homeChildren } from './home/home'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home/pavilion/pavilionhome'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/Home.vue'),
    meta: {title: 'ceshi'},
    children: homeChildren
  },
  {
    path: '/player',
    name: 'Player',
    component: () => import('@/views/player/player.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
