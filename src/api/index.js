import REQ from '@/utils/http.js'

// 保存进山记录
export const reqSaveFillRecord = data => REQ({
  url: '/api/FireproofingCode/SaveFillRecord',
  data,
})
// 获取进山事由
export const reqConfigType = data => REQ({
  url: '/api/FireproofingCode/GetConfigType',
  data,
})
// 获取场所码列表
export const reqGetPlaceCodeInfoList = data => REQ({
  url: '/api/FireproofingCode/GetPlaceCodeInfoList',
  data,
})
// 获取区域代码接口
export const reqAreaDtoAll = data => REQ({
  url: '/api/FireproofingCode/GetAreaDtoAll',
  data,
})
// 创建二维码
export const reqCreatePlaceCodeInfo = data => REQ({
  url: '/api/FireproofingCode/CreatePlaceCodeInfo',
  data,
})
// 获取默认图片
export const reqGetImgUrl = data => REQ({
  url: '/api/FireproofingCode/GetDefaultImgUrl',
  data,
})
// 获取当前用户创建的二维码
export const reqPlaceCodeInfoList = data => REQ({
  url: '/api/FireproofingCode/GetPlaceCodeInfoList',
  data,
})
