import Vue from 'vue'
import Vuex from 'vuex'
import { getType } from '@/utils'
// import { reqLogin, reqUserInfo, reqCompleteUserInfo, reqBindPhone } from '@/api/user'
import { reqLogin, reqBindPhone } from '@/api/user'
import { uniLogin } from '@/utils/mp-weixin'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    qrcodeDetails: uni.getStorageSync('qrcodeDetails') || {},
    userInfo: uni.getStorageSync('userInfo') || {},
    token: uni.getStorageSync('token') || '',
  },
  mutations: {
    /**
     * 改变 state 中存储的数据的方法
     *
     * @param { object } payload 要改变的 state 中的属性（key）和值(value)组成的对象，或对象数组
     */
    handleChangeStore (state, payload) {
      const payloadType = getType(payload)
      if (payloadType !== 'Object') {
        return
      }
      Object.entries(payload).forEach(([key, value]) => {
        state[key] = value
        uni.setStorageSync(key, value)
      })
    },
  },
  actions: {
    actionLogin ({ commit, state }, isRefresh = false) {
      return new Promise((resolve, reject) => {
        const { userInfo } = state
        const token = uni.getStorageSync('token')
        // 已登录
        if (token && !isRefresh) {
          resolve(userInfo)
          return
        }
        // 未登录，先清空用户信息和 token，然后进行登录
        commit('handleChangeStore', { token: '', userInfo: {} })
        uniLogin(reqLogin).then(res => {
          const { userInfo, token } = res
          commit('handleChangeStore', { token, userInfo })
          resolve(userInfo)
        })
      })
    },
    // // 获取用户信息
    // actionGetUserInfo ({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     reqUserInfo().then(userInfo => {
    //       commit('handleChangeStore', { userInfo })
    //       resolve(userInfo)
    //     })
    //   })
    // },
    // // 完善用户信息
    // actionCompleteUserInfo ({ dispatch }, userInfo) {
    //   return new Promise((resolve, reject) => {
    //     reqCompleteUserInfo(userInfo).then(userInfo => {
    //       dispatch('actionGetUserInfo')
    //     })
    //   })
    // },

    // 绑定手机号
    actionBindPhone ({ commit }, reqData) {
      return new Promise((resolve, reject) => {
        reqBindPhone(reqData).then(userInfo => {
          commit('handleChangeStore', { userInfo })
        })
      })
    },
  },
})

// store.dispatch('actionLogin')

export default store
