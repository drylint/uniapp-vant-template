Component({
  data: {
    active: 0,
    list: [
      {
        icon: 'icon-wechat-fill',
        text: '首页',
        url: '/pages/home/index',
      },
      {
        icon: 'icon-alipay-circle-fill',
        text: '示例一',
        url: '/pages/demo01/index',
      },
      {
        icon: 'icon-weibo',
        text: '示例二',
        url: '/pages/demo02/index',
      },
      {
        icon: 'icon-taobao-circle-fill',
        text: '我',
        url: '/pages/me/index',
      },
    ],
  },
  ready () {
    // 只能在 ready 声明周期中调用
    this.init()
  },
  methods: {
    onChange (e) {
      const index = e.detail
      console.log(e)
      this.setData({
        active: index,
      })
      wx.switchTab({
        url: this.data.list[index].url,
      })
    },

    init () {
      // 只能在 ready 声明周期中调用
      const page = getCurrentPages().pop()
      this.setData({
        active: this.data.list.findIndex(item => item.url === `/${page.route}`),
      })
    },
  },
})
