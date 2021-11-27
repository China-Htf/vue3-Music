import { createStore } from 'vuex'
import type { IRootState } from './type'
import loginModule from './login/login'

export default createStore<IRootState>({
  state: () => {
    return {
      name: 'ceshi',
      age: 18
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    loginModule
  }
})
