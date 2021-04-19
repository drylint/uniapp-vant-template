<template>
<uni-shadow-root class="vant-sidebar-index"><view class="van-sidebar custom-class">
  <slot></slot>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'vant/sidebar/index'
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var component_1 = require('../common/component');
var relation_1 = require('../common/relation');
component_1.VantComponent({
  relation: relation_1.useChildren('sidebar-item', function () {
    this.setActive(this.data.activeKey);
  }),
  props: {
    activeKey: {
      type: Number,
      value: 0,
      observer: 'setActive',
    },
  },
  beforeCreate: function () {
    this.currentActive = -1;
  },
  methods: {
    setActive: function (activeKey) {
      var _a = this,
        children = _a.children,
        currentActive = _a.currentActive;
      if (!children.length) {
        return Promise.resolve();
      }
      this.currentActive = activeKey;
      var stack = [];
      if (currentActive !== activeKey && children[currentActive]) {
        stack.push(children[currentActive].setActive(false));
      }
      if (children[activeKey]) {
        stack.push(children[activeKey].setActive(true));
      }
      return Promise.all(stack);
    },
  },
});
export default global['__wxComponents']['vant/sidebar/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-sidebar{width:80px;width:var(--sidebar-width,80px)}
</style>