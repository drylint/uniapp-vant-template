<template>
<uni-shadow-root class="vant-notice-bar-index"><view v-if="show" :class="'custom-class '+(utils.bem('notice-bar', { withicon: mode, wrapable }))" :style="computed.rootStyle({ color, backgroundColor, background })" @click="onClick">
  <van-icon v-if="leftIcon" size="16px" :name="leftIcon" class="van-notice-bar__left-icon"></van-icon>
  <slot v-else name="left-icon"></slot>

  <view class="van-notice-bar__wrap">
    <view :class="'van-notice-bar__content '+(!scrollable && !wrapable ? 'van-ellipsis' : '')" :animation="animationData">
      {{ text }}
      <slot v-if="(!text)"></slot>
    </view>
  </view>

  <van-icon v-if="mode === 'closeable'" class="van-notice-bar__right-icon" name="cross" @click.native.stop.prevent="onClickIcon"></van-icon>
  <navigator v-else-if="mode === 'link'" :url="url" :open-type="openType">
    <van-icon class="van-notice-bar__right-icon" name="arrow"></van-icon>
  </navigator>
  <slot v-else name="right-icon"></slot>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs><wxs src="./index.wxs" module="computed"></wxs>
<script>
import VanIcon from '../icon/index.vue'
global['__wxVueOptions'] = {components:{'van-icon': VanIcon}}

global['__wxRoute'] = 'vant/notice-bar/index'
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var component_1 = require('../common/component');
var utils_1 = require('../common/utils');
component_1.VantComponent({
  props: {
    text: {
      type: String,
      value: '',
      observer: 'init',
    },
    mode: {
      type: String,
      value: '',
    },
    url: {
      type: String,
      value: '',
    },
    openType: {
      type: String,
      value: 'navigate',
    },
    delay: {
      type: Number,
      value: 1,
    },
    speed: {
      type: Number,
      value: 50,
      observer: 'init',
    },
    scrollable: {
      type: Boolean,
      value: true,
    },
    leftIcon: {
      type: String,
      value: '',
    },
    color: String,
    backgroundColor: String,
    background: String,
    wrapable: Boolean,
  },
  data: {
    show: true,
  },
  created: function () {
    this.resetAnimation = wx.createAnimation({
      duration: 0,
      timingFunction: 'linear',
    });
  },
  destroyed: function () {
    this.timer && clearTimeout(this.timer);
  },
  mounted: function () {
    this.init();
  },
  methods: {
    init: function () {
      var _this = this;
      utils_1.requestAnimationFrame(function () {
        Promise.all([
          utils_1.getRect(_this, '.van-notice-bar__content'),
          utils_1.getRect(_this, '.van-notice-bar__wrap'),
        ]).then(function (rects) {
          var contentRect = rects[0],
            wrapRect = rects[1];
          if (
            contentRect == null ||
            wrapRect == null ||
            !contentRect.width ||
            !wrapRect.width
          ) {
            return;
          }
          var _a = _this.data,
            speed = _a.speed,
            scrollable = _a.scrollable,
            delay = _a.delay;
          if (scrollable || wrapRect.width < contentRect.width) {
            var duration = (contentRect.width / speed) * 1000;
            _this.wrapWidth = wrapRect.width;
            _this.contentWidth = contentRect.width;
            _this.duration = duration;
            _this.animation = wx.createAnimation({
              duration: duration,
              timingFunction: 'linear',
              delay: delay,
            });
            _this.scroll();
          }
        });
      });
    },
    scroll: function () {
      var _this = this;
      this.timer && clearTimeout(this.timer);
      this.timer = null;
      this.setData({
        animationData: this.resetAnimation
          .translateX(this.wrapWidth)
          .step()
          .export(),
      });
      utils_1.requestAnimationFrame(function () {
        _this.setData({
          animationData: _this.animation
            .translateX(-_this.contentWidth)
            .step()
            .export(),
        });
      });
      this.timer = setTimeout(function () {
        _this.scroll();
      }, this.duration);
    },
    onClickIcon: function (event) {
      if (this.data.mode === 'closeable') {
        this.timer && clearTimeout(this.timer);
        this.timer = null;
        this.setData({ show: false });
        this.$emit('close', event.detail);
      }
    },
    onClick: function (event) {
      this.$emit('click', event);
    },
  },
});
export default global['__wxComponents']['vant/notice-bar/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-notice-bar{display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;height:40px;height:var(--notice-bar-height,40px);padding:0 16px;padding:var(--notice-bar-padding,0 16px);font-size:14px;font-size:var(--notice-bar-font-size,14px);color:#ed6a0c;color:var(--notice-bar-text-color,#ed6a0c);line-height:24px;line-height:var(--notice-bar-line-height,24px);background-color:#fffbe8;background-color:var(--notice-bar-background-color,#fffbe8)}.van-notice-bar--withicon{position:relative;padding-right:40px}.van-notice-bar--wrapable{height:auto;padding:8px 16px;padding:var(--notice-bar-wrapable-padding,8px 16px)}.van-notice-bar--wrapable .van-notice-bar__wrap{height:auto}.van-notice-bar--wrapable .van-notice-bar__content{position:relative;white-space:normal}.van-notice-bar__left-icon{display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;margin-right:4px;vertical-align:middle}.van-notice-bar__left-icon,.van-notice-bar__right-icon{font-size:16px;font-size:var(--notice-bar-icon-size,16px);min-width:22px;min-width:var(--notice-bar-icon-min-width,22px)}.van-notice-bar__right-icon{position:absolute;top:10px;right:15px}.van-notice-bar__wrap{position:relative;-webkit-flex:1;flex:1;overflow:hidden;height:24px;height:var(--notice-bar-line-height,24px)}.van-notice-bar__content{position:absolute;white-space:nowrap}.van-notice-bar__content.van-ellipsis{max-width:100%}
</style>