<template>
  <view class="page">
    <!--
      van-toast 组件节点，即使已经全局注册，但是由于微信小程序没有调用一次全局生效的写法（因为 App.vue 中不能写视图模板），
      所以，只要使用 vant 的 Toast 方法的页面就必须在页面内调用一次 van-toast 组件，并指定 id 为 van-toast
    -->
    <van-toast id="van-toast" />

    <view class="g-h3">图标使用</view>

    <MixGroupContent title="vant 自带图标">
      <van-icon name="chat-o" size="50rpx" />
      <van-icon name="chat-o" size="50rpx" dot />
      <van-icon name="chat-o" size="50rpx" info="10" />
      <van-icon name="chat-o" size="50rpx" info="10" color="#07c160" />
    </MixGroupContent>
    <MixGroupContent title="使用 <van-icon> 渲染 iconfont 图标">
      <van-icon custom-class="iconfont icon-google" size="50rpx" />
      <van-icon custom-class="iconfont icon-google" size="50rpx" dot />
      <van-icon custom-class="iconfont icon-google" size="50rpx" info="10" />
      <van-icon custom-class="iconfont icon-google" size="50rpx" info="10" color="#07c160" />
    </MixGroupContent>
    <MixGroupContent title="使用 <text> 渲染 iconfont 图标">
      <test class="iconfont icon-google" />
      <test class="iconfont icon-IE" />
      <test class="iconfont icon-taobao" />
    </MixGroupContent>

    <view class="g-h3">toast 使用</view>

    <MixGroupContent title="toast 组件">
      <van-button type="info" custom-class="button" @click="handleToast('text')">消息提示</van-button>
      <van-button type="default" custom-class="button" @click="handleToast('loading')">加载提示</van-button>
      <van-button type="primary" custom-class="button" @click="handleToast('success')">成功提示</van-button>
      <van-button type="danger" custom-class="button" @click="handleToast('fail')">失败提示</van-button>
    </MixGroupContent>
  </view>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  onLoad (query) {
    // ...
  },
  methods: {
    handleToast (type) {
      this.$Toast({
        type,
        message: `当前 type 值为 ${type}，\n消息可以通过 \\n 换行`,
        forbidClick: true,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  font-size: 28rpx;
  .g-h3 {
    padding-top: 2em;
    text-align: center;
  }
  /deep/ .van-icon {
    margin-right: 20rpx;
  }
  .iconfont {
    font-size: 50rpx;
    margin-right: 20rpx;
    color: #ff976a;
  }
  /deep/ .button {
    margin: 0 20rpx 10rpx 0;
  }
}
</style>
