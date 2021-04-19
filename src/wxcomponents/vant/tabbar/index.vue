<template>
<uni-shadow-root class="vant-tabbar-index"><view :class="(border ? 'van-hairline--top-bottom' : '')+' '+(utils.bem('tabbar', { fixed, safe: safeAreaInsetBottom }))+' custom-class'" :style="zIndex ? 'z-index: ' + zIndex : ''">
  <slot></slot>
</view>

<view v-if="fixed && placeholder" :style="'height: '+(height)+'px;'"></view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>

global['__wxRoute'] = 'vant/tabbar/index'
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var component_1 = require('../common/component');
var relation_1 = require('../common/relation');
var utils_1 = require('../common/utils');
component_1.VantComponent({
  relation: relation_1.useChildren('tabbar-item', function () {
    this.updateChildren();
  }),
  props: {
    active: {
      type: null,
      observer: 'updateChildren',
    },
    activeColor: {
      type: String,
      observer: 'updateChildren',
    },
    inactiveColor: {
      type: String,
      observer: 'updateChildren',
    },
    fixed: {
      type: Boolean,
      value: true,
      observer: 'setHeight',
    },
    placeholder: {
      type: Boolean,
      observer: 'setHeight',
    },
    border: {
      type: Boolean,
      value: true,
    },
    zIndex: {
      type: Number,
      value: 1,
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    height: 50,
  },
  methods: {
    updateChildren: function () {
      var children = this.children;
      if (!Array.isArray(children) || !children.length) {
        return;
      }
      children.forEach(function (child) {
        return child.updateFromParent();
      });
    },
    setHeight: function () {
      var _this = this;
      if (!this.data.fixed || !this.data.placeholder) {
        return;
      }
      wx.nextTick(function () {
        utils_1.getRect(_this, '.van-tabbar').then(function (res) {
          _this.setData({ height: res.height });
        });
      });
    },
  },
});
export default global['__wxComponents']['vant/tabbar/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-tabbar{display:-webkit-flex;display:flex;box-sizing:initial;width:100%;height:50px;height:var(--tabbar-height,50px);background-color:#fff;background-color:var(--tabbar-background-color,#fff)}.van-tabbar--fixed{position:fixed;bottom:0;left:0}.van-tabbar--safe{padding-bottom:env(safe-area-inset-bottom)}
</style>