import REQ from '@/utils/http.js'

/**
 * 使用小程序登录接口
 * @param { { code: string } } data 参数对象
 */
export const reqLogin = data => REQ({
  url: '/api/TokenAuth/LoginByWeChatMiniProgram',
  data,
})

/**
 * 绑定手机号
 * @param { {} } data 参数对象
 */
export const reqBindPhone = data => REQ({
  url: '/api/TokenAuth/UpdateWxminiPhone',
  data,
})

/**
 * 完善用户信息，
 * @param { {} } data 参数对象， `wx.getUserInfo()` 返回的用户信息对象
 */
export const reqCompleteUserInfo = data => REQ({
  url: '/api/TokenAuth/CompleteUserInfo',
  data,
})

/**
 * 获取用户信息
 * @param { {} | undefined } data 参数对象
 */
export const reqUserInfo = data => REQ({
  url: '/api/TokenAuth/GetUserInfo',
  data,
})

/**
 * 个人信息编辑，
 * @param { {} } data 参数对象
 */
export const reqEditUserInfo = data => REQ({
  url: '/api/User/CompleteUserInfo',
  data,
})

/**
 * 用户头像修改，
 * @param { {} } data 参数对象
 */
export const reqUploadHeadImg = data => REQ({
  url: '/api/User/UploadHeadImg',
  data,
})
