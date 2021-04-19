module.exports = {
  root: true,
  extends: [
    'stylelint-config-standard',
    // 'stylelint-config-recess-order'
  ],
  plugins: [
    'stylelint-scss',
  ],
  ignoreFiles: [
    '**/node_modules/**',
    '**/dist/**',
    '**/wxcomponents/**',
    '**/iconfont.css',
    '**/ant-design.css',
  ],
  rules: {
    // 规则前空行
    'rule-empty-line-before': null, // 'always'|'never'|'always-multi-line'|'never-multi-line'
    // 命名颜色值
    'color-named': 'never', // 'always-where-possible'|'never'
    // 颜色大小写
    'color-hex-case': null, // 'lower'|'upper'
    'at-rule-no-unknown': [true, {
      'ignoreAtRules': ['each', 'extend', 'for', 'function', 'if', 'else', 'warn', 'include', 'mixin', 'return'],
    }],
    'unit-no-unknown': [true, {
      ignoreUnits: ['rpx'],
    }],
  },
}
