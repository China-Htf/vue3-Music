import { Module } from 'vuex'
import localCache from '@/utils/cache'

import type { ILoginState } from './type'
import type { IRootState } from '../type'
import { loginPhone, requestAccountInfo } from '@/api/home/login/login'
import type { IPhone } from '@/api/home/login/type'
import Cookies from 'js-cookie'
import { setTimeStamp } from '@/utils/auth'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      token: localCache.get('token') ?? '',
      userInfo: localCache.get('userInfo') ?? ''
    }
  },
  getters: {},
  mutations: {
    changeCookie(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: string) {
      state.userInfo = userInfo
    },
    changeLoginOut(state) {
      state.token = '',
      state.userInfo = ''
    }
  },
  actions: {
    async phoneLoginActions({commit}, payload: IPhone) {
      // 登录
      const loginResult: any = await loginPhone(payload)
      // 存取token
      const tokens = loginResult.token
      localCache.setCache('token', tokens)
      setTimeStamp()
      commit('changeCookie', tokens)

      // 用户总信息
      commit('changeUserInfo', loginResult)
      localCache.setCache('userInfo', loginResult)

      // 存取cookie
      const cookie = loginResult.cookie
      Cookies.set('music',cookie )

      // const aa = await requestAccountInfo()
      // console.log(aa);
      
      
    },
    phoneLoginOut({commit}) {
      localCache.clearCache();
      Cookies.remove('music')
      Cookies.remove('music-timestamp-key') 
      commit('changeLoginOut')
    }
  },

}

export default loginModule