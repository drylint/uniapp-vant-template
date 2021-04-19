import REQ from '@/utils/http'

// GET 请求
export const reqGet = data => REQ({
  method: 'GET',
  url: '/api/xxx',
  data,
})

// POST 请求
export const reqPost = data => REQ({
  url: '/api/xxx',
  data,
})

// 不需要显示 加载中 的接口
export const reqNoLoading = data => REQ({
  url: '/api/xxx',
  data,
  isShowLoading: false,
})

// 获取列表
export const reqSomeList = data => REQ({
  url: '/api/xxx/list',
  data,
  isShowLoading: false,
})
