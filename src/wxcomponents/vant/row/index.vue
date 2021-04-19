<template>
<uni-shadow-root class="vant-row-index"><view class="van-row custom-class" :style="computed.rootStyle({ gutter })">
  <slot></slot>
</view></uni-shadow-root>
</template>
<wxs src="./index.wxs" module="computed"></wxs>
<script>

global['__wxRoute'] = 'vant/row/index'
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var component_1 = require('../common/component');
var relation_1 = require('../common/relation');
component_1.VantComponent({
  relation: relation_1.useChildren('col', function (target) {
    var gutter = this.data.gutter;
    if (gutter) {
      target.setData({ gutter: gutter });
    }
  }),
  props: {
    gutter: {
      type: Number,
      observer: 'setGutter',
    },
  },
  methods: {
    setGutter: function () {
      var _this = this;
      this.children.forEach(function (col) {
        col.setData(_this.data);
      });
    },
  },
});
export default global['__wxComponents']['vant/row/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-row:after{display:table;clear:both;content:""}
</style>