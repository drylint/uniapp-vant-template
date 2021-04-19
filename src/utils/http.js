
import { showLoading, hideLoading, showToast } from './interactions'
import store from '@/store'
const { VUE_APP_baseURL } = process.env

// 请求进入失败回调的函数，比如：域名校验不通过
const reqError = (err, res, msg = '请求发生错误') => new Promise((resolve, reject) => {
  // console.log('请求错误拦截', err)
  if (err) {
    showToast(msg)
    reject(err)
    return
  }
  resolve(res)
})

// 请求发生错误的函数， 用于判断 statusCode 是否成功（2xx）
const resError = (res, msg = '响应发生错误') => new Promise((resolve, reject) => {
  const { statusCode, data } = res
  if (statusCode >= 200 && statusCode < 300) {
    resolve(data)
    return
  }

  // 请求响应 401 表示需要登录
  if (+res.statusCode === 401) {
    store.dispatch('actionLogin')
    return
  }

  showToast(`${statusCode}`)
  reject(new Error(statusCode))
})

// 响应拦截函数，接收响应对象为参数，用于根据响应结果做出相应操作
// 响应成功(status === 2xx)时会被调用
const resFn = res => new Promise((resolve, reject) => {
  const { code, msg, isShowMsg, data } = res
  const isSuccess = code >= 200 && code < 300
  if (isShowMsg || !isSuccess) {
    showToast(msg)
  }
  if (isSuccess) {
    resolve(data)
    return
  }
  reject(new Error(msg))
})

const REQ = async ({ url, data = {}, method = 'POST', baseURL = VUE_APP_baseURL, isShowLoading = true } = {}) => {
  // 获取 token
  let token = uni.getStorageSync('token')
  if (!token && url !== '/api/TokenAuth/LoginByWeChatMiniProgram') {
    await store.dispatch('actionLogin', true)
    token = uni.getStorageSync('token')
  }
  const Authorization = `Bearer ${token}`
  isShowLoading && showLoading()
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseURL + url,
      method,
      data,
      header: {
        Authorization,
      },
    }).then(([err, res]) => {
      reqError(err, res)
        .then(resError)
        .then(resFn)
        .then(resolve)
        .catch(reject)
    }).catch(err => {
      // console.log(err)
      reject(err)
    }).finally(() => {
      // console.log('请求结束，关闭转圈')
      isShowLoading && hideLoading()
    })
    // getInfo('userinfo').then((userInfo: any) => {
    //   // console.log(config)
    //   if (userInfo.token) {
    //     config.header.token = userInfo.token
    //   }
    //   Taro.request(config)
    // }).catch(err => {console.log(err)})
  })
}
// }

export default REQ
