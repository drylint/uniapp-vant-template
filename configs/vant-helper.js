const path = require('path')
const fs = require('fs')
const glob = require('glob')

const isValid = abPath => glob.sync(abPath).length > 0

// 获取 docs 绝对路径
const pathJoin = dir => path.join(__dirname, dir)
const test1 = pathJoin('./test.json')
const test2 = pathJoin('./test2.json')

const content = fs.readFileSync(test1, {
  encoding: 'utf-8'
})

const targetDirAbpath = pathJoin('../src/wxcomponents/vant')

let vantChildren = fs.readdirSync(targetDirAbpath)
console.log('过滤前数量', vantChildren.length)
vantChildren = vantChildren.filter(item => {
  itemPath = `${targetDirAbpath}/${item}`
  const result = isValid(`${itemPath}/index.wxml`)
  if (!result) {
    console.log('丢弃', item)
  }
  return result
})

console.log('过滤后数量', vantChildren.length)

const childrenObj = {}

vantChildren.forEach(item => {
  childrenObj[`van-${item}`] = `/wxcomponents/vant/${item}/index`
})

console.log(childrenObj)

const result = JSON.stringify(childrenObj, undefined, 2)


fs.writeFileSync(test2, result)
