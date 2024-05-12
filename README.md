# 前端管理后台模板-微应用

管理后台模板，使用React + React Router + Mobx + AntDesign + Styled Component

## 环境变量配置

环境变量使用`REACT_APP`开头， 在HTML文件中可通过`%REACT_APP_XXX%`获取，JS文件中可通过`process.env.REACT_APP_XXX`获取

## 开发环境

开发环境下项目启动时默认使用根目录下 `.env.local`或`.env`运行，`.env.local`优先级更高，建议开发人员创建.env.local在本地（.local文件已经添加到git忽略目录）

## 模拟后台
由于这个项目只是为了优化前端的脚手架，所以后台采用[mockoon](https://mockoon.com/)来模拟后台，先自动下载安装好**mockoon**, 然后导入我预先已经配制好的模拟后台的脚本，脚本位置在`public/mockoon.json`, 导入后启动**Mockoon**就可以模拟本项目所需要的后端接口

## 线上环境

线上环境的环境变量位于`env`目录下，文件后缀对应环境名称

## 命令

可运行命令如下：

### `yarn start`

开发模式下运行项目， 默认端口3000
浏览器中访问 [http://localhost:3000](http://localhost:3000)

### `yarn build:xxx`

打包项目，编译后的文件位于`build`目录下

### `yarn analyze`

分析项目打包后体积，在项目编译`yarn build:xxx`完成后运行， 参考[https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
