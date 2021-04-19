<template>
<uni-shadow-root class="vant-uploader-index"><view class="van-uploader">
  <view class="van-uploader__wrapper">
    
    <view v-for="(item,index) in (lists)" :key="item.index" v-if="previewImage" class="van-uploader__preview" :data-index="index" @click="onClickPreview">
      <image v-if="item.isImage" :mode="imageFit" :src="item.thumb || item.url" :alt="item.name || ('图片' + index)" class="van-uploader__preview-image" :style="computed.sizeStyle({ previewSize })" :data-index="index" @click="onPreviewImage"></image>
      <video v-else-if="item.isVideo" :src="item.url" :title="item.name || ('视频' + index)" :poster="item.thumb" :autoplay="item.autoplay" class="van-uploader__preview-image" :style="computed.sizeStyle({ previewSize })" :data-index="index" @click="onPreviewVideo">
      </video>
      <view v-else class="van-uploader__file" :style="computed.sizeStyle({ previewSize })" :data-index="index" @click="onPreviewFile">
        <van-icon name="description" class="van-uploader__file-icon"></van-icon>
        <view class="van-uploader__file-name van-ellipsis">{{ item.name || item.url }}</view>
      </view>
      <view v-if="item.status === 'uploading' || item.status === 'failed'" class="van-uploader__mask">
       <van-icon v-if="item.status === 'failed'" name="close" class="van-uploader__mask-icon"></van-icon>
       <van-loading v-else custom-class="van-uploader__loading"></van-loading>
       <text v-if="item.message" class="van-uploader__mask-message">{{ item.message }}</text>
      </view>
      <view v-if="deletable && item.deletable" :data-index="index" class="van-uploader__preview-delete" @click.stop.prevent="deleteItem">
        <van-icon name="cross" class="van-uploader__preview-delete-icon"></van-icon>
      </view>
    </view>

    
    <block v-if="isInCount">
      <view class="van-uploader__slot" @click="startUpload">
        <slot></slot>
      </view>

      
      <view v-if="showUpload" :class="'van-uploader__upload '+(disabled ? 'van-uploader__upload--disabled': '')" :style="computed.sizeStyle({ previewSize })" @click="startUpload">
        <van-icon :name="uploadIcon" class="van-uploader__upload-icon"></van-icon>
        <text v-if="uploadText" class="van-uploader__upload-text">{{ uploadText }}</text>
      </view>
    </block>
  </view>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs><wxs src="./index.wxs" module="computed"></wxs>
<script>
import VanIcon from '../icon/index.vue'
import VanLoading from '../loading/index.vue'
global['__wxVueOptions'] = {components:{'van-icon': VanIcon,'van-loading': VanLoading}}

global['__wxRoute'] = 'vant/uploader/index'
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
var utils_1 = require('./utils');
var shared_1 = require('./shared');
var validator_1 = require('../common/validator');
component_1.VantComponent({
  props: __assign(
    __assign(
      {
        disabled: Boolean,
        multiple: Boolean,
        uploadText: String,
        useBeforeRead: Boolean,
        afterRead: null,
        beforeRead: null,
        previewSize: {
          type: null,
          value: 80,
        },
        name: {
          type: null,
          value: '',
        },
        accept: {
          type: String,
          value: 'image',
        },
        fileList: {
          type: Array,
          value: [],
          observer: 'formatFileList',
        },
        maxSize: {
          type: Number,
          value: Number.MAX_VALUE,
        },
        maxCount: {
          type: Number,
          value: 100,
        },
        deletable: {
          type: Boolean,
          value: true,
        },
        showUpload: {
          type: Boolean,
          value: true,
        },
        previewImage: {
          type: Boolean,
          value: true,
        },
        previewFullImage: {
          type: Boolean,
          value: true,
        },
        imageFit: {
          type: String,
          value: 'scaleToFill',
        },
        uploadIcon: {
          type: String,
          value: 'photograph',
        },
      },
      shared_1.chooseImageProps
    ),
    shared_1.chooseVideoProps
  ),
  data: {
    lists: [],
    isInCount: true,
  },
  methods: {
    formatFileList: function () {
      var _a = this.data,
        _b = _a.fileList,
        fileList = _b === void 0 ? [] : _b,
        maxCount = _a.maxCount;
      var lists = fileList.map(function (item) {
        return __assign(__assign({}, item), {
          isImage: utils_1.isImageFile(item),
          isVideo: utils_1.isVideoFile(item),
          deletable: validator_1.isBoolean(item.deletable)
            ? item.deletable
            : true,
        });
      });
      this.setData({ lists: lists, isInCount: lists.length < maxCount });
    },
    getDetail: function (index) {
      return {
        name: this.data.name,
        index: index == null ? this.data.fileList.length : index,
      };
    },
    startUpload: function () {
      var _this = this;
      var _a = this.data,
        maxCount = _a.maxCount,
        multiple = _a.multiple,
        lists = _a.lists,
        disabled = _a.disabled;
      if (disabled) return;
      utils_1
        .chooseFile(
          __assign(__assign({}, this.data), {
            maxCount: maxCount - lists.length,
          })
        )
        .then(function (res) {
          _this.onBeforeRead(multiple ? res : res[0]);
        })
        .catch(function (error) {
          _this.$emit('error', error);
        });
    },
    onBeforeRead: function (file) {
      var _this = this;
      var _a = this.data,
        beforeRead = _a.beforeRead,
        useBeforeRead = _a.useBeforeRead;
      var res = true;
      if (typeof beforeRead === 'function') {
        res = beforeRead(file, this.getDetail());
      }
      if (useBeforeRead) {
        res = new Promise(function (resolve, reject) {
          _this.$emit(
            'before-read',
            __assign(__assign({ file: file }, _this.getDetail()), {
              callback: function (ok) {
                ok ? resolve() : reject();
              },
            })
          );
        });
      }
      if (!res) {
        return;
      }
      if (validator_1.isPromise(res)) {
        res.then(function (data) {
          return _this.onAfterRead(data || file);
        });
      } else {
        this.onAfterRead(file);
      }
    },
    onAfterRead: function (file) {
      var _a = this.data,
        maxSize = _a.maxSize,
        afterRead = _a.afterRead;
      var oversize = Array.isArray(file)
        ? file.some(function (item) {
            return item.size > maxSize;
          })
        : file.size > maxSize;
      if (oversize) {
        this.$emit('oversize', __assign({ file: file }, this.getDetail()));
        return;
      }
      if (typeof afterRead === 'function') {
        afterRead(file, this.getDetail());
      }
      this.$emit('after-read', __assign({ file: file }, this.getDetail()));
    },
    deleteItem: function (event) {
      var index = event.currentTarget.dataset.index;
      this.$emit(
        'delete',
        __assign(__assign({}, this.getDetail(index)), {
          file: this.data.fileList[index],
        })
      );
    },
    onPreviewImage: function (event) {
      if (!this.data.previewFullImage) return;
      var index = event.currentTarget.dataset.index;
      var lists = this.data.lists;
      var item = lists[index];
      wx.previewImage({
        urls: lists
          .filter(function (item) {
            return utils_1.isImageFile(item);
          })
          .map(function (item) {
            return item.url;
          }),
        current: item.url,
        fail: function () {
          wx.showToast({ title: '预览图片失败', icon: 'none' });
        },
      });
    },
    onPreviewVideo: function (event) {
      if (!this.data.previewFullImage) return;
      var index = event.currentTarget.dataset.index;
      var lists = this.data.lists;
      wx.previewMedia({
        sources: lists
          .filter(function (item) {
            return utils_1.isVideoFile(item);
          })
          .map(function (item) {
            return __assign(__assign({}, item), { type: 'video' });
          }),
        current: index,
        fail: function () {
          wx.showToast({ title: '预览视频失败', icon: 'none' });
        },
      });
    },
    onPreviewFile: function (event) {
      var index = event.currentTarget.dataset.index;
      wx.openDocument({
        filePath: this.data.lists[index].url,
        showMenu: true,
      });
    },
    onClickPreview: function (event) {
      var index = event.currentTarget.dataset.index;
      var item = this.data.lists[index];
      this.$emit(
        'click-preview',
        __assign(__assign({}, item), this.getDetail(index))
      );
    },
  },
});
export default global['__wxComponents']['vant/uploader/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-uploader{position:relative;display:inline-block}.van-uploader__wrapper{display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap}.van-uploader__slot:empty{display:none}.van-uploader__slot:not(:empty)+.van-uploader__upload{display:none!important}.van-uploader__upload{position:relative;display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;box-sizing:border-box;width:80px;width:var(--uploader-size,80px);height:80px;height:var(--uploader-size,80px);margin:0 8px 8px 0;margin:0 var(--padding-xs,8px) var(--padding-xs,8px) 0;background-color:#f7f8fa;background-color:var(--uploader-upload-background-color,#f7f8fa)}.van-uploader__upload:active{background-color:#f2f3f5;background-color:var(--uploader-upload-active-color,#f2f3f5)}.van-uploader__upload-icon{color:#dcdee0;color:var(--uploader-icon-color,#dcdee0);font-size:24px;font-size:var(--uploader-icon-size,24px)}.van-uploader__upload-text{margin-top:8px;margin-top:var(--padding-xs,8px);color:#969799;color:var(--uploader-text-color,#969799);font-size:12px;font-size:var(--uploader-text-font-size,12px)}.van-uploader__upload--disabled{opacity:.5;opacity:var(--uploader-disabled-opacity,.5)}.van-uploader__preview{position:relative;cursor:pointer;margin:0 8px 8px 0;margin:0 var(--padding-xs,8px) var(--padding-xs,8px) 0}.van-uploader__preview-image{display:block;overflow:hidden;width:80px;width:var(--uploader-size,80px);height:80px;height:var(--uploader-size,80px)}.van-uploader__preview-delete{padding:0 0 8px 8px;padding:0 0 var(--padding-xs,8px) var(--padding-xs,8px)}.van-uploader__preview-delete,.van-uploader__preview-delete:after{position:absolute;top:0;right:0;width:14px;width:var(--uploader-delete-icon-size,14px);height:14px;height:var(--uploader-delete-icon-size,14px)}.van-uploader__preview-delete:after{content:"";background-color:rgba(0,0,0,.7);background-color:var(--uploader-delete-background-color,rgba(0,0,0,.7));border-radius:0 0 0 12px;border-radius:0 0 0 calc(var(--uploader-delete-icon-size, 14px) - 2px)}.van-uploader__preview-delete-icon{position:absolute;top:-2px;right:-2px;z-index:1;-webkit-transform:scale(.5);transform:scale(.5);font-size:16px;font-size:calc(var(--uploader-delete-icon-size, 14px) + 2px);color:#fff;color:var(--uploader-delete-color,#fff)}.van-uploader__file{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;width:80px;width:var(--uploader-size,80px);height:80px;height:var(--uploader-size,80px);background-color:#f7f8fa;background-color:var(--uploader-file-background-color,#f7f8fa)}.van-uploader__file-icon{color:#646566;color:var(--uploader-file-icon-color,#646566);font-size:20px;font-size:var(--uploader-file-icon-size,20px)}.van-uploader__file-name{box-sizing:border-box;width:100%;text-align:center;margin-top:8px;margin-top:var(--uploader-file-name-margin-top,8px);padding:0 4px;padding:var(--uploader-file-name-padding,0 4px);color:#646566;color:var(--uploader-file-name-text-color,#646566);font-size:12px;font-size:var(--uploader-file-name-font-size,12px)}.van-uploader__mask{position:absolute;top:0;right:0;bottom:0;left:0;display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;color:#fff;color:var(--white,#fff);background-color:rgba(50,50,51,.88);background-color:var(--uploader-mask-background-color,rgba(50,50,51,.88))}.van-uploader__mask-icon{font-size:22px;font-size:var(--uploader-mask-icon-size,22px)}.van-uploader__mask-message{margin-top:6px;padding:0 4px;padding:0 var(--padding-base,4px);font-size:12px;font-size:var(--uploader-mask-message-font-size,12px);line-height:14px;line-height:var(--uploader-mask-message-line-height,14px)}.van-uploader__loading{width:22px;width:var(--uploader-loading-icon-size,22px);height:22px;height:var(--uploader-loading-icon-size,22px);color:#fff!important;color:var(--uploader-loading-icon-color,#fff)!important}
</style>