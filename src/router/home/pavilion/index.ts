export const pavilionChildren = [
  {
    path: 'pavilionhome',
    name: 'PavilionHome',
    component: () => import('@/views/pavilionhome/pavilionhome.vue'),
    meta: {title: '首页'}
  },
  {
    path: 'singer_list',
    name: 'singerList',
    component: () => import('@/views/singer_list/singer_list.vue'),
    meta: {title: '歌手'}
  },
  {
    path: 'album',
    name: 'Album',
    component: () => import('@/views/album/album.vue'),
    meta: {title: '新碟'}
  },
  {
    path: 'toplist',
    name: 'TopList',
    component: () => import('@/views/toplist/toplist.vue'),
    meta: {title: '排行榜'}
  },
  {
    path: 'category',
    name: 'Category',
    component: () => import('@/views/category/category.vue'),
    meta: {title: '分类菜单'}
  },
  {
    path: 'radio',
    name: 'Radio',
    component: () => import('@/views/radio/radio.vue'),
    meta: {title: '电台'}
  },
  {
    path: 'mvlist',
    name: 'MVList',
    component: () => import('@/views/mvlist/mvlist.vue'),
    meta: {title: 'MV'}
  },
  {
    path: 'album_mall',
    name: 'AlbumMall',
    component: () => import('@/views/album_mall/album_mall.vue'),
    meta: {title: '数字专辑'}
  },
  {
    path: 'piao_wu',
    name: 'PiaoWu',
    component: () => import('@/views/piao_wu/piao_wu.vue'),
    meta: {title: '票务'}
  },
]