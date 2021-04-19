module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/standard',
    './configs/eslint/vue.js',
    'better',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    /**
     * 强制构造函数首字母大写
     * Array/Boolean/Date/Error/Function/Number/Object/RegExp/String/Symbol/ 不受限制
     */
     'new-cap': [2, {
      newIsCap: true, // 是否强制 new 后首字母大写，默认 true
      capIsNew: false, // 是否强制首字母大写的函数必须用 new 调用，默认 true
      newIsCapExceptions: [], // 指定 new 后可以不大写的函数列表
      newIsCapExceptionPattern: '', // 正则字符串，指定 new 后可以不大写的匹配字符串
      capIsNewExceptions: [], // 指定首字母大写的可以不使用 new 的函数列表
      capIsNewExceptionPattern: '^[A-Z0-9]+$', // 指定首字母大写的可以不使用 new 的正则字符串
      properties: true, // 是否检查对象的属性
    }],
  },
  globals: {
    uni: true,
    wx: true,
    Component: true,
    Page: true,
    getCurrentPages: true,
  },
}
