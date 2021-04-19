<template>
  <view class="page">
    <view class="intro">
      <view class="title">uniapp-vant-template</view>
      <view class="desc">基于 uni-app 和 vant-weapp 的微信小程序项目开发模板。</view>
      <view class="desc">示例代码仅列出部分使用方式有变化的组件，未列出的组件正常使用 vue 语法调用即可。</view>
    </view>
    <view class="nav-list">
      <InnerNav :list="list" />
    </view>
  </view>
</template>

<script>
import InnerNav from './InnerNav'
export default {
  components: {
    InnerNav,
  },
  data () {
    return {
      list: [
        {
          groupName: '基础组件',
          list: [
            { path: '/pages/home/basicComponents/index', title: '图标 / Toast' },
          ],
        },
        {
          groupName: '表单组件',
          list: [
            { path: '/pages/home/form/index', title: '表单组件' },
          ],
        },
      ],
    }
  },
  onLoad (query) {
    // ...
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.page {
  font-size: 28rpx;
  .intro {
    padding: 0 1em 1em;
    .title {
      font-size: 1.5em;
      font-weight: bold;
    }
    .desc {
      margin-top: 0.5em;
      font-size: 24rpx;
      color: #999;
    }
  }
}
</style>
