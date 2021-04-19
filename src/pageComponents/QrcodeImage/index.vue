<template>
  <view class="qrcode-image">
    <canvas
      id="canvas"
      canvas-id="canvas"
      class="canvas"
      type="2d"
      @error="canvasIdErrorCallback"
    />
  </view>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      canvas: null,
      size: 300, // px
    }
  },
  computed: {
    // 仅设置 canvas 外表看起来的宽高，真正的宽高在 js 中设置
    canvasStyle ({ size }) {
      const style = `width: ${size}px; height: ${size}px;`
      return style
    },
  },
  onReady (e) {
    this.handleCanvas()
  },
  methods: {
    canvasIdErrorCallback (e) {
      console.error(e.detail.errMsg)
    },
    handleCanvas () {
      const query = this.createSelectorQuery()
      query.select('#canvas')
        .fields({ node: true, size: true })
        .exec(res => {
          const nodeRef = res[0] // 节点引用
          const canvas = nodeRef.node // 获取 canvas 节点
          this.canvas = canvas
          console.log('nodeRef.width', nodeRef.width) // 通过样式设置的宽度
          console.log('nodeRef.height', nodeRef.height) // 通过样式设置的高度
          console.log('canvas.width', canvas.width) // canvas 真实宽度
          console.log('canvas.height', canvas.height) // canvas 真实高度
          const c = canvas.getContext('2d')
          const systemInfo = uni.getSystemInfoSync()
          const dpr = systemInfo.pixelRatio
          console.log('dpr', dpr)
          canvas.width = nodeRef.width * dpr
          canvas.height = nodeRef.width * dpr
          c.scale(dpr, dpr)
          this.handleDrawImage(c, canvas, nodeRef)
        })
    },
    async handleDrawImage (c, canvas, nodeRef) {
      const { src, text } = this
      const { width: nw, height: nh } = nodeRef
      console.log('画布宽高', nw, nh)
      console.log('画布容器宽高', nw, nh)
      // height, width, orientation, path, type
      const imageInfo = await this.handleGetImageInfo(src) // 图片信息
      console.log('图片信息', imageInfo)
      const { path, height: ih, width: iw } = imageInfo
      const imageRatio = ih / iw // 图片高宽比
      console.log('图片高宽比', imageRatio)
      const paddingX = nw / 6 // 横向单边内边距
      const paddingY = nw / 12 // 纵向单边内边距
      const imageDrawWidth = nw - (paddingX * 2) // 绘图宽度
      const imageDrawHeight = imageDrawWidth // 绘图高度
      const imageX = (nw - imageDrawWidth) / 2 // 绘图起点 x 坐标
      const imageY = paddingY // 绘图起点 y 坐标
      const fontSize = parseInt(nw / 15) // 绘制字体大小
      const textX = nw / 2 // 图片起点 x 坐标
      const textY = imageY + imageDrawHeight + paddingY
      c.fillStyle = '#ffffff'
      c.fillRect(0, 0, nw, nh)
      const image = canvas.createImage()
      image.src = path
      image.onload = () => {
        c.drawImage(image, imageX, imageY, imageDrawWidth, imageDrawHeight)
        c.font = `bold ${fontSize}px 微软雅黑, sans-serif`
        c.textAlign = 'center'
        c.textBaseline = 'top'
        c.fillStyle = '#111111'
        c.fillText(text, textX, textY)
        this.handleCreateImage(canvas)
      }
    },
    async handleGetImageInfo (src) {
      // imageInfo: height, width, orientation, path, type
      const [, imageInfo] = await uni.getImageInfo({ src })
      return imageInfo
    },
    handleCreateImage (canvas) {
      uni.canvasToTempFilePath({
        canvas,
        fileType: 'jpg',
        success: res => {
          const { tempFilePath } = res
          this.$emit('created', tempFilePath)
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.qrcode-image {
  font-size: 28rpx;
  width: 100%;
  height: 100%;
  .canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
