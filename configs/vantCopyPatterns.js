// 让Vant用于 uni项目
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const get = require('lodash.get')
const stripJsonComments = require('strip-json-comments')

// 默认拷贝目录 有讲究的话可以再具体细分 可能意义不大了
// 这是 @vant/weapp 内组件公用的地方
let defaultCopy = ['common', 'wxs', 'mixins']

// 独立出来的方法 组件依赖寻找
const deepFindUsingComponents = jsonPath => {
  let jsonFilePath = null
  if (jsonPath.indexOf('/wxcomponents/') >= 0) {
    jsonFilePath = path.resolve(
      process.env.UNI_INPUT_DIR,
      `${jsonPath.replace('../', '../node_modules/@vant/weapp/dist/')}.json`,
    )
  } else {
    jsonFilePath = path.resolve(
      process.env.UNI_INPUT_DIR,
      `${jsonPath.replace('/wxcomponents/', '../node_modules/')}.json`,
    )
  }
  let pagesJson = {}
  try {
    pagesJson = JSON.parse(stripJsonComments(fs.readFileSync(jsonFilePath, 'utf8')))
  } catch (error) {}
  let usingComponents = pagesJson.usingComponents || {}
  if (pagesJson.usingComponents) {
    const _deepUsingComponentsPathArr = Object.values(pagesJson.usingComponents) || []
    for (let index = 0; index < _deepUsingComponentsPathArr.length; index++) {
      const obj = _deepUsingComponentsPathArr[index]
      usingComponents = {
        ...usingComponents,
        ...deepFindUsingComponents(obj),
      }
    }
  }
  return usingComponents
}

const getVantUsedList = () => {
  const jsonFilePath = path.resolve(process.env.UNI_INPUT_DIR, 'pages.json')
  const pagesJson = JSON.parse(stripJsonComments(fs.readFileSync(jsonFilePath, 'utf8')))
  let allUsingComponents = {}
  /**
   * 获取各个 page 中的 usingComponents
   */
  for (let index = 0; index < pagesJson.pages.length; index++) {
    allUsingComponents = {
      ...allUsingComponents,
      ...get(pagesJson.pages[index], 'style.usingComponents'),
    }
  }
  /**
   * 获取 globalStyle 中的 usingComponents
   */
  allUsingComponents = {
    ...allUsingComponents,
    ...get(pagesJson, 'globalStyle.usingComponents', {}),
  }
  /**
   * 组件依赖关系的 usingComponents
   */
  const allUsingComponentsPathArr = Object.values(allUsingComponents)
  for (let index = 0; index < allUsingComponentsPathArr.length; index++) {
    allUsingComponents = {
      ...deepFindUsingComponents(allUsingComponentsPathArr[index]),
      ...allUsingComponents,
    }
  }
  defaultCopy = defaultCopy.concat(Object.keys(allUsingComponents))
  process.stdout.write(chalk.green(`\n*** 拷贝Vant以下组件 ***: ${defaultCopy}\n`))
  return Array.from(defaultCopy, item => item.replace('van-', '')) // 目录名称没有 van- 要删除
}

const getVantCopyPatterns = () => {
  // // 默认全拷贝
  // let vantPaths = [{
  //   from: path.join(__dirname, '../node_modules/@vant/weapp/dist/'),
  //   to: path.join(__dirname, '/dist/dev/mp-weixin/wxcomponents/vant/'),
  // }]

  // if (process.env.NODE_ENV !== 'development') {
  //   // getVantUsedList 获取具体需要拷贝的文件夹名
  //   vantPaths = Array.from(getVantUsedList(), item => ({
  //     from: path.join(__dirname, `../node_modules/@vant/weapp/dist/${item}`),
  //     to: path.join(__dirname, `../dist/build/mp-weixin/wxcomponents/vant/${item}`),
  //   }))
  // }

  // getVantUsedList 获取具体需要拷贝的文件夹名
  const vantPaths = Array.from(getVantUsedList(), item => ({
    from: path.join(__dirname, `../node_modules/@vant/weapp/dist/${item}`),
    to: path.join(__dirname, `../dist/build/mp-weixin/wxcomponents/vant/${item}`),
  }))
  return vantPaths
}

module.exports = getVantCopyPatterns

// module.exports = {
//   chainWebpack (config) {
//     config.plugin('CopyWebpackPlugin')
//       .use(new CopyWebpackPlugin(getVantCopyPatterns(), { copyUnmodified: true, ignore: ['*.d.ts'] }))
//   },
// }
