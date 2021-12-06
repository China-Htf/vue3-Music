import TFRequest from './request'
import localCache from '@/utils/cache'
import { getTimeStamp } from '@/utils/auth'
import store from '@/store'
// import Cookies from 'js-cookie'

const TimeOuts = 300000
// const cookie = Cookies.get('music')

const tfRequest = new TFRequest({
  /**
   * 环境变量中设置
   * process.env.VUE_APP_BASE_URL：请求前缀路径
   * process.env.VUE_APP_TIME_OUT:请求超时时间
   */
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000,
  // withCredentials: true,
  interceptors: {
    requestInterceptor: (config) => {
      // const cookie = localCache.get('cookie')
      // if(cookie) {
      //   config.headers!.Authorization = `${cookie}`
      // }
      // 若是有token的情况下
      if(store.state.loginModule.token) {
        // 判断设置的时间戳是否过期
        if(IsCheckTimeOut()) {
          store.dispatch('loginModule/phoneLoginOut')
          alert('登录已过期')
        }
        // const token = localCache.get('token')
        // config.headers!.Authorization = `${token}`
        // config.headers!['Set-Cookie'] = `SameSite=None`
      }
      console.log('实例请求成功的拦截');
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('实例请求失败的拦截');
      return err
    },
    responseInterceptor: (config) => {
      console.log('实例响应成功的拦截');
      return config
    },
    responseInterceptorCatch: (err) => {
      console.log('实例响应失败的拦截');
      return err
    }
  }
})

// 查询时间戳是否过期
function IsCheckTimeOut() {
  const currentTime = Date.now();
  const timeStamp:any = getTimeStamp() 
  return (currentTime - timeStamp) / 1000 > TimeOuts
}

export default tfRequest