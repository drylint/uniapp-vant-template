<template>
  <van-image
    class="base-image"
    :src="realSrc"
    :fit="mode"
    width="100%"
    height="100%"
    :radius="radius"
    :fade-show="fadeShow"
    @error="handleError"
    @load="handleLoad"
    @click="handleClick"
  />
</template>
<script>
export default {
  props: {
    src: {
      type: [String, Array],
      default: '',
    },
    mode: {
      type: String,
      default: 'aspectFill',
      validator (v) {
        if (v) {
          return ['scaleToFill', 'aspectFit', 'aspectFill', 'widthFix', 'heightFix'].indexOf !== -1
        }
        return true
      },
    },
    // 图片显示动画效果
    fadeShow: {
      type: Boolean,
      default: true,
    },
    // 是否开启点击预览
    hasPreview: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      baseURL: process.env.VUE_APP_baseURL,
    }
  },
  computed: {
    realSrc ({ src, baseURL }) {
      if (src.indexOf('/') === 0) {
        return baseURL + src
      }
      return src
    },
  },
  methods: {
    handleError (e) {
      this.$emit('error', e)
    },
    handleLoad (e) {
      this.$emit('load', e)
    },
    handleClick (e) {
      this.$emit('click', e)
      if (this.hasPreview) {
        const { realSrc } = this
        uni.previewImage({
          current: 0,
          urls: [realSrc],
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.base-image {
  width: 100%;
  height: 100%;
}
</style>
