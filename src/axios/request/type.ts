import type { AxiosRequestConfig, AxiosResponse } from 'axios'


// 定义请求拦截器与相应拦截器的TS类型注解
export interface TFRequestInterceptors  {
  // 请求拦截器成功
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  // 请求拦截器失败
  requestInterceptorCatch?: (error: any) => any
  // 请求响应器成功
  responseInterceptor?: (res: any) => any
  // 请求响应器失败
  responseInterceptorCatch?: (error: any) => any
}

/**
* TFRequestConfig 继承 AxiosRequestConfig 的类型
* TFRequestInterceptors 定义的类型赋值进去
*/
export interface TFRequestConfig extends AxiosRequestConfig {
  interceptors?: TFRequestInterceptors
}