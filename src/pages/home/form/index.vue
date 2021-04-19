<template>
  <view class="view-test">
    <!--
      van-dialog 组件节点，即使已经全局注册，但是由于微信小程序没有调用一次全局生效的写法（因为 App.vue 中不能写视图模板），
      所以，只要使用 vant 的 Toast 方法的页面就必须在页面内调用一次 van-dialog 组件，并指定 id 为 van-dialog
    -->
    <van-dialog id="van-dialog" />

    <van-cell-group>
      <!-- 输入 -->
      <van-field
        :value="formData.input"
        label="输入框"
        placeholder="请输入"
        @change="formData.input = $event.detail"
      />

      <!-- 单选 -->
      <van-field label="单选">
        <van-radio-group
          slot="input"
          :value="formData.radio"
          direction="horizontal"
          @change="formData.radio = $event.detail"
        >
          <van-radio
            v-for="item in radioOptions"
            :key="item.value"
            :name="item.value"
          >
            {{ item.label }}
          </van-radio>
        </van-radio-group>
      </van-field>

      <!-- 多选 -->
      <van-field label="多选">
        <van-checkbox-group
          slot="input"
          :value="formData.valueList"
          direction="horizontal"
          class="van-horizontal"
          @change="formData.valueList = $event.detail"
        >
          <van-checkbox
            v-for="item in radioOptions"
            :key="item.value"
            :name="item.value"
            custom-class="custom-checkbox"
          >
            {{ item.label }}
          </van-checkbox>
        </van-checkbox-group>
      </van-field>

      <!-- 开关 -->
      <van-field label="开关">
        <van-switch
          slot="input"
          :checked="formData.switch"
          @change="formData.switch = $event.detail"
        />
      </van-field>

      <!-- 日期时间选择 -->
      <van-field label="年月日" :value="formData.dateValue" readonly @click-input="isShowPopup = 'dateValue'" />

      <!-- picker 选择 1 -->
      <van-field
        label="单列 picker"
        :value="formData.pickerValue"
        readonly
        @click-input="isShowPopup = 'pickerValue'"
      />

      <!-- picker 选择 2 -->
      <van-field
        label="单列 picker 2"
        :value="formData.pickerValue2"
        readonly
        @click-input="isShowPopup = 'pickerValue2'"
      />

      <!-- picker 选择 3 -->
      <van-field
        label="多列 picker 3"
        :value="formData.pickerValue3"
        readonly
        @click-input="isShowPopup = 'pickerValue3'"
      />

      <van-popup
        position="bottom"
        :show="isShowPopup"
        @close="handleClosePopup"
      >
        <van-datetime-picker
          v-if="isShowPopup === 'dateValue'"
          :value="Number($utils.parseToDate(formData.dateValue))"
          type="date"
          @confirm="handleConfirmDate"
          @cancel="handleClosePopup"
        />
        <van-picker
          v-if="isShowPopup === 'pickerValue'"
          show-toolbar
          title="请选择"
          :default-index="columns1.findIndex(e => e === formData.pickerValue)"
          :columns="columns1"
          @cancel="handleClosePopup"
          @confirm="handleConfirmPickerValue($event, 'pickerValue')"
        />
        <van-picker
          v-if="isShowPopup === 'pickerValue2'"
          show-toolbar
          title="请选择"
          :default-index="columns2.findIndex(e => e === formData.pickerValue2)"
          :columns="columns2"
          @cancel="handleClosePopup"
          @confirm="handleConfirmPickerValue($event, 'pickerValue2')"
        />
        <van-picker
          v-if="isShowPopup === 'pickerValue3'"
          show-toolbar
          title="请选择"
          :default-index="columns3.findIndex(e => e === formData.pickerValue3)"
          :columns="columns3"
          @cancel="handleClosePopup"
          @confirm="handleConfirmPickerValue($event, 'pickerValue3')"
          @change="handleColumnChange"
        />
      </van-popup>
    </van-cell-group>
    <view class="button-box">
      <van-button custom-class="custom-button" type="primary" round block @click="handleSubmit">提交</van-button>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      isShowPopup: null,
      formData: {
        input: '',
        radio: 2,
        valueList: [],
        switch: false,
        dateValue: '2000-01-01',
        pickerValue: '选项 1',
        pickerValue2: '选项 2',
        pickerValue3: ['选项3', '选项 3-3'],
      },
      radioOptions: [
        { label: '选项 1', value: 1 },
        { label: '选项选项 2', value: 2 },
        { label: '选项选项 3', value: 3 },
        { label: '选项选项选项 4', value: 4 },
        { label: '选项选项选项选项选项选项选项选项 5', value: 5 },
      ],
      columns1: ['选项 1', '选项 2', '选项 3', '选项 4'],
      columns2: [
        { text: '选项 1' },
        { text: '选项 2', disabled: true },
        { text: '选项 3' },
        { text: '选项 4', disabled: true },
      ],
      columns3AllOptions: {
        '选项1': ['选项 1-1', '选项 1-2', '选项 1-3', '选项 1-4'],
        '选项2': ['选项 2-1', '选项 2-2', '选项 2-3', '选项 2-4'],
        '选项3': ['选项 3-1', '选项 3-2', '选项 3-3', '选项 3-4'],
        '选项4': ['选项 4-1', '选项 4-2', '选项 4-3', '选项 4-4'],
      },
      columns3: [
        {
          values: [],
          defaultIndex: 0,
        },
        {
          values: [],
          defaultIndex: 0,
        },
      ],
    }
  },
  created () {
    this.handleInitColumns3(this.formData.pickerValue3)
  },
  methods: {
    handleEvent (e) {
      console.log(e)
    },
    handleClosePopup () {
      this.isShowPopup = null
    },
    handleGetUserInfo (e) {
      console.log(e)
    },
    handleOpenDialog () {
      this.$Dialog.alert({
        title: '标题',
        message: '弹窗内容',
      }).then(() => {
      // on close
      })
    },
    handleConfirmDate (e) {
      this.formData.dateValue = this.$utils.dateToString(e.detail, 'YYYY-MM-DD')
      this.handleClosePopup()
    },
    // e.detail: { index: 0, value: '' }
    handleConfirmPickerValue (e, key) {
      console.log('picker 选择', e)
      const { value } = e.detail
      this.formData[key] = value.text || value
      this.handleClosePopup()
    },
    handleInitColumns3 (valueArr = []) {
      const { columns3AllOptions, columns3 } = this
      // 第一列数据
      const col1 = Object.keys(columns3AllOptions)
      if (columns3[0].values.length < 1) {
        this.$set(columns3[0], 'values', col1)
      }

      // 如果有回显值
      if (valueArr.length === columns3.length) {
        columns3.forEach((col, i) => {
          if (i > 0) {
            col.values = columns3AllOptions[valueArr[i - 1]]
          }
          col.defaultIndex = col.values.findIndex(v => v === valueArr[i])
        })
      } else {
        // 第二列数据
        this.$set(columns3[1], 'values', columns3AllOptions[col1[0]])
      }
    },
    // e.detail: { index:0, value: '', picker: Picker{} },
    handleColumnChange (e) {
      const { picker, value } = e.detail
      const { columns3AllOptions } = this
      picker.setColumnValues(1, columns3AllOptions[value[0]])
    },
    handleSubmit () {
      const { formData } = this
      console.log(JSON.parse(JSON.stringify(formData)))
    },
  },
}
</script>

<style lang="scss" scoped>
.view-test {
  font-size: 28rpx;
  .button-box {
    padding: 0 1em;
    /deep/ .custom-button {
      margin: 2em 0;
    }
  }
}
</style>
