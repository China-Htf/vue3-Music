import { createApp } from 'vue'
import 'normalize.css'
import '@element-plus/icons'
import tfRequest from '@/axios'

import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

// tfRequest.get({
//   url: '/personalized',
//   interceptors: {
//     requestInterceptor: (config) =>{
//       console.log('单独请求拦截器');
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独响应拦截');
//       return res
//     }
//   }
// })
// .then((res) => {
//   console.log(res);
// })
