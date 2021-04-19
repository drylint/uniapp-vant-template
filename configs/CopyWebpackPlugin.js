const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const { NODE_ENV } = process.env
const isProduction = NODE_ENV === 'production'

// uni 其实也仅仅是将 src/wxcomponents 下的文件拷贝到 dist/xxx/mp-weixin/wxcomponents 目录中
// 如果只编译为微信小程序，可以直接跳过 uni 的拷贝，自行拷贝到打包的对应目录中
// uni 目前支持将小程序原生组件编译到其他平台使用，如果要编译为其他平台，则还是应该拷贝到 src/wxcomponents 中
const from = path.join(__dirname, '../node_modules/@vant/weapp/dist/')
const to = path.join(__dirname, `../dist/${isProduction ? 'build' : 'dev'}/mp-weixin/wxcomponents/vant/`)
// const to = path.join(__dirname, '../src/wxcomponents/vant/')

module.exports = config => {
  config
    .plugin('CopyWebpackPlugin')
    .use(new CopyWebpackPlugin({
      patterns: [
        {
          from,
          to,
          globOptions: {
            ignore: ['**/*.ts'],
          },
        },
      ],
    }))
}
