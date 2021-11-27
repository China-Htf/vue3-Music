// 引入axios
import axios from 'axios'
// axios 的类型注解
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
// 自己定义的构造器类型注解
import type { TFRequestInterceptors, TFRequestConfig } from './type'


class TFRequest {

  // 创建一个实例对象
  instance: AxiosInstance
  interceptors?: TFRequestInterceptors

  /**
   *  构造器：通过new关键字创建一个实例时，构造函数会被调用
   *  构造函数不需要返回任何值，默认返回当前创建出来的实例
   * config：调用请求时，传递过来的实例对象
   */
  constructor(config: TFRequestConfig) {

    // 将实例存储到 instance
    this.instance = axios.create(config)

    /**
     * new 实例之后，若是传来拦截器则进行保存
     */
    this.interceptors = config.interceptors

    /**
     * 若 interceptors 传了值 则开启实例拦截器
     * 请求拦截器-响应拦截器
     */
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

   /**
    * 所有实例的拦截器
    * 拦截成功-拦截失败-响应成功-响应失败
    */
    this.instance.interceptors.request.use ((config) => {
      console.log('所有请求成功拦截');
      return config
    },
    (err) => {
      console.log('所有请求拦截失败');
      return err
    })
    this.instance.interceptors.response.use((res) => {
      console.log('所有请求响应成功');
      return res.data
    },
    (err) => {
      console.log('所有请求响应失败');
      return err
    })
  }

  /**
   *  开始请求
   *  config: 传递过来的参数 例如URL
   */
  request<T>(config: TFRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单独网络请求的拦截器
      if(config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 单独响应的拦截器
      this.instance.request<any, T>(config).then(( res ) => {
        if(config.interceptors?.responseInterceptor) {
          res = config.interceptors.responseInterceptor(res)
        }
        resolve(res)
      })
      .catch(( err ) => {
        reject(err)
      })
    })
  }

  /**
   * 默认请求
   */
  get<T>(config: TFRequestConfig): Promise<T> {
    return this.request<T>({...config, method: 'GET'})
  }
  post<T>(config: TFRequestConfig): Promise<T> {
    return this.request<T>({...config, method: 'POST'})
  }
  delete<T>(config: TFRequestConfig): Promise<T> {
    return this.request<T>({...config, method: 'DELETE'})
  }
  patch<T>(config: TFRequestConfig): Promise<T> {
    return this.request<T>({...config, method: 'PATCH'})
  }
}

export default TFRequest