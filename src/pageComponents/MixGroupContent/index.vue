<template>
  <view class="MixGroupContent">
    <view class="title">{{ title }}</view>
    <view class="content van-hairline--top van-hairline--bottom">
      <slot />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
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
.MixGroupContent {
  .title {
    color: #999;
    padding: 1.2em 1em 0.5em;
  }
  .content {
    background: #fff;
    padding: 1em;
  }
}
</style>
