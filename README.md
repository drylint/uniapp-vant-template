# uniapp-vant-template

基于 vue-cli, uni-app, vant-weapp, scss 搭建的微信小程序开发项目模板。

为了保持良好的编码规范，项目启用了 eslint, stylelint, markdownlint 分别用于校验 js, css, markdown 规范。

本项目也支持 uni-ui 组件库，但极其不推荐使用，推荐优先使用 [vant-weapp](https://vant-contrib.gitee.io/vant-weapp/#/button) 进行开发。

## 开始

```bash
# 克隆项目模板
git clone https://github.com/drylint/uniapp-vant-template.git

# 将目录名修改为自己的项目名

# 进入项目目录的命令行下安装依赖
npm install

# 运行项目 (开发时使用)
npm run serve

# 打包项目 (发布时使用)
npm run build
```

## 项目结构

基于 vue-cli 和 uni-app 的目录结构基础上进行一了些扩展。

```bash
├── src                        # 源代码
│   ├── api                    # 后端请求 api
│   ├── assets                 # 主题 字体等静态资源需要被打包的资源
│   ├── components             # 全局公用基础组件（与业务无关）
│   ├── custom-tab-bar         # 当需要自定义 tabBar 时，才需要用到此目录
│   ├── pageComponents         # 全局公用业务组件（与业务有关）
│   ├── pages                  # 应用的页面存放目录
│   ├── static                 # 静态资源存储目录，不需要被打包的资源，比如 tabBar 用到的图片
│   ├── store                  # 全局状态管理 vuex 目录
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── wxcomponents           # 微信小程序原生代码编写的组件，比如 vant-weapp 存放在此目录中
│   ├── App.vue                # 入口组件，对应小程序的 app.js
│   ├── manifest.json          # uni-app 框架配置，对应小程序的 project.config.json
│   ├── pages.json             # 小程序全局配置，对应小程序的 app.json
```

## 引入及注册 vant-weapp 组件

项目已经默认将 vant-weapp 全局全部引入，在页面或组件中直接使用即可，比如：

```xml
<van-button type="default">默认按钮</van-button>
```

### 引入 vant-weapp 的原理

此处只是讲述引入原理，模板已经全部操作完成，不需要再手动操作。

根据此原理，当然出了 vant-wepp 以外，还可以引入任何想要的原生组件进行使用。

#### 1. 引入组件资源

可以看到 `package.json` 项目依赖中有 `@vant/weapp`。实际上是通过 npm 安装到了 `node_modules` 目录中。

由于 uni-app 的约定，微信小程序原生代码编写的组件需要放在 `src/wxcomponents` 中，所以已经将 `node_modules/@vant/weapp/lib` 目录下的所有内容复制到了 `src/wxcomponents/vant` 目录中。

如果还需要引入其他小程序原生组件，也可以按照此方式，通过 npm 方式安装后，拷贝到 `src/wxcomponents/xxx` 目录中。

但是，这一步只是将组件代码引入项目中了，通常组件的使用方式都是 引入--注册--使用，所以下一步就是注册组件。

#### 2. 注册组件

注册组件，也就是告诉程序，组件的代码在哪里去找。

全局注册（本模板采用的方式）：

在 `src/pages.json` 文件中的 `globalStyle.usingComponents` 对象中注册，例如：

```json
{
  "globalStyle": {
    "usingComponents": {
      "van-action-sheet": "/wxcomponents/vant/action-sheet/index",
      "van-area": "/wxcomponents/vant/area/index"
    }
  }
}
```

在页面中注册组件方式(不推荐)详见 [uni-app 文档](https://uniapp.dcloud.io/frame?id=%e5%b0%8f%e7%a8%8b%e5%ba%8f%e8%87%aa%e5%ae%9a%e4%b9%89%e7%bb%84%e4%bb%b6%e6%94%af%e6%8c%81)

在 `usingComponents` 对象中，每一个 `key` 就是将来在代码中要是用的组件名，`value` 就是组件代码所在的路径。

完成此步骤后，就可以在页面代码中使用组件了，当然，在 uni-app 中使用小程序原生组件，有一些特殊的约定，一定要遵循才能正确使用。

## 使用 vant-weapp 组件

由于是在 uni-app 中使用原生组件，所以在使用 vant-weapp 的时候需要注意，一定要使用 uni-app 的语法（也就是 vue 语法）来调用原生组件。

比如：

```xml
<!-- 小程序原生写法 -->
<van-button type="default" bind:click="onClick">默认按钮</van-button>

<!-- uni-app 中的写法 -->
<van-button type="default" @click="onClick">默认按钮</van-button>
```

```xml
<!-- 小程序原生写法 -->
<van-icon name="{{ iconType }}" />

<!-- uni-app 中的写法 -->
<van-icon :name="iconType" />
```

```xml
<!-- 小程序原生写法 -->
<van-field
  model:value="{{ value }}"
  placeholder="请输入"
/>

<!-- uni-app 中的写法 -->
<van-field
  :value="value"
  placeholder="请输入"
  @change="value = $event.detail"
/>

```

总结就是，在 uni-app 中使用原生组件时，所有原生的写法都需要写为 vue 语法即可，uni-app 会将这些 vue 语法自动转换为对应的小程序语法。

## 原理

实际上，uni-app 就是在打包时，单纯地把 `wxcomponents` 复制到了打包目录下而已，uni-app 是不会对它做任何处理的。

所以，在 `src/pages.json` 中注册组件时，每个路径都是以 `/wxcomponents` 开头的，因为在编译后，生成到 `app.json` 文件中的 `usingComponents` 字段会保持此路径，程序会根据此路径去寻找，就能够刚好在打包后的根目录下找到此路径。然后注册并使用它。
