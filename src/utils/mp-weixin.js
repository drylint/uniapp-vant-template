
/**
 * 微信登录
 * @param { (code: string) => Promise<object> } reqLogin 请求服务端登录接口的函数
 * @returns { Promise<object> }
 */
export const uniLogin = reqLogin => new Promise((resolve, reject) => {
  uni.login().then(([err, res]) => {
    if (err) {
      reject(err)
      return
    }
    const { code } = res
    if (typeof reqLogin === 'function') {
      reqLogin({
        code,
      }).then(res => {
        resolve(res)
      }).catch(reject)
    } else {
      resolve(code)
    }
  })
})

export const getPageFullPath = (index = -1) => {
  const pages = getCurrentPages()
  const { length } = pages
  return pages[index > 0 ? index : length + index].$page.fullPath
}

// 检查用户是否授权某项权限
export const checkAuthSetting = async auth => {
  const [, res] = await uni.getSetting()
  const isAuth = res.authSetting[auth]
  if (!isAuth) {
    uni.showModal({
      title: '未授权',
      content: '是否打开授权页面？',
      success (res) {
        if (res.confirm) {
          uni.openSetting()
        }
      },
    })
  }
}
