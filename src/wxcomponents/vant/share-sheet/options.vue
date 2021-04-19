<template>
<uni-shadow-root class="vant-share-sheet-options"><view :class="utils.bem('share-sheet__options', { border: showBorder })">
  <view v-for="(item,index) in (options)" :key="item.index" class="van-share-sheet__option" :data-index="index" @click="onSelect">
    <button class="van-share-sheet__button" :open-type="item.openType">
      <image :src="computed.getIconURL(item.icon)" class="van-share-sheet__icon"></image>
    </button>
    <view v-if="item.name" class="van-share-sheet__name">{{ item.name }}</view>
    <view v-if="item.description" class="van-share-sheet__option-description">
      {{ item.description }}
    </view>
  </view>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs><wxs src="./options.wxs" module="computed"></wxs>
<script>

global['__wxRoute'] = 'vant/share-sheet/options'
'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, '__esModule', { value: true });
var component_1 = require('../common/component');
component_1.VantComponent({
  props: {
    options: Array,
    showBorder: Boolean,
  },
  methods: {
    onSelect: function (event) {
      var index = event.currentTarget.dataset.index;
      var option = this.data.options[index];
      this.$emit('select', __assign(__assign({}, option), { index: index }));
    },
  },
});
export default global['__wxComponents']['vant/share-sheet/options']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-share-sheet__options{position:relative;display:-webkit-flex;display:flex;padding:16px 0 16px 8px;overflow-x:auto;overflow-y:visible;-webkit-overflow-scrolling:touch}.van-share-sheet__options--border:before{position:absolute;box-sizing:border-box;-webkit-transform-origin:center;transform-origin:center;content:" ";pointer-events:none;top:0;right:0;left:16px;border-top:1px solid #ebedf0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.van-share-sheet__options::-webkit-scrollbar{height:0}.van-share-sheet__option{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-align-items:center;align-items:center;-webkit-user-select:none;user-select:none}.van-share-sheet__option:active{opacity:.7}.van-share-sheet__button{height:auto;padding:0;line-height:inherit;background-color:initial;border:0}.van-share-sheet__button:after{border:0}.van-share-sheet__icon{width:48px;height:48px;margin:0 16px}.van-share-sheet__name{margin-top:8px;padding:0 4px;color:#646566;font-size:12px}.van-share-sheet__option-description{padding:0 4px;color:#c8c9cc;font-size:12px}
</style>