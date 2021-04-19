const glob = require('glob')
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const originalList = JSON.parse(process.env.npm_config_argv).original
// const originalList = []
const runPageParam = originalList.find(item => item.startsWith('--page-'))

const runPage = runPageParam && runPageParam.replace('--page-', '')

// glob 匹配获取多页路径方法
const getPages = basePath => {
  const pages = {}
  // glob.sync(basePath) 返回匹配到的路径组成的数组，例如：['src/pages/students', 'src/pages/teachers']
  const pagePathList = glob.sync(basePath)
  const pageNameList = pagePathList.map(pagePath => pagePath.split('/').slice(-1)[0])
  const isRunPageExists = pageNameList.includes(runPage)
  pageNameList.forEach(pageName => {
    if (runPage && isRunPageExists && pageName !== runPage) {
      if (IS_PROD) {
        return
      }
      if (pageName !== 'index') {
        return
      }
    }
    // pages的key值，使用目录结构。生成的静态资源，就会按这个目录存放。
    // 比如可以使用 pages[`../${pageName}/js/${pageName}`] = {}
    // 同时会影响引入路径，打包的 css 等静态资源也会被放入这个目录。
    // 注意，不是chunks的值决定了静态资源的存放目录，是pages的key。
    pages[`${pageName}`] = {
      entry: `src/pages/${pageName}/main.js`,
      template: `src/pages/${pageName}/index.html`,
      // 除首页外的页面单独放置于文件夹内
      // filename: pageName === 'index' ? 'index.html' : `${pageName}/index.html`,
      filename: `${pageName}.html`,
      title: '',
      // chunks: ['chunk-vendors', 'chunk-common', pageName]
    }
  })
  return pages
}

module.exports = getPages

// pages: {
//   index: {
//     // page 的入口
//     entry: 'src/main.js',
//     // 模板来源
//     template: 'public/index.html',
//     // 在 dist/index.html 的输出
//     filename: 'index.html',
//     // 当使用 title 选项时，
//     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
//     title: '首页',
//     // 在这个页面中包含的块，默认情况下会包含
//     // 提取出来的通用 chunk 和 vendor chunk。
//     // chunks: ['chunk-vendors', 'chunk-common', 'index']
//   },
// },
