<template>
  <view class="inner-nav">
    <van-cell-group
      v-for="(group, i) in list"
      :key="i"
      :title="group.groupName"
    >
      <van-cell
        v-for="(item, index) in group.list"
        :key="index"
        :title="item.title"
        is-link
        :url="item.path"
      />
    </van-cell-group>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
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
    handleClick (item) {
      console.log(item)
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  font-size: 28rpx;
}
</style>
