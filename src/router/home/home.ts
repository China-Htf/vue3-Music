// 音乐馆二级菜单
import { pavilionChildren } from './pavilion'

export const  homeChildren = [
  {
    path: 'pavilion',
    name: 'Pavilion',
    component: () => import('@/views/pavilion/pavilion.vue'),
    meta: {title: '音乐馆'},
    children: pavilionChildren
  },
  {
    path: 'profile',
    name: 'Profile',
    component: () => import('@/views/profile/profile.vue'),
    meta: {title: '我的音乐'}
  },
  {
    path: 'download',
    name: 'Download',
    component: () => import('@/views/download/download.vue'),
    meta: {title: '客户端'}
  },
  {
    path: 'artists',
    name: 'Artists',
    component: () => import('@/views/artists/artists.vue'),
    meta: {title: '开放平台'}
  },
  {
    path: 'vip',
    name: 'VIP',
    component: () => import('@/views/vip/vip.vue'),
    meta: {title: 'vip'}
  }
]