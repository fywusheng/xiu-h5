<!--
 * @Description
 * @Version: 0.1
 * @Autor: Chenyt
 * @Date: 2020-11-03 14:11:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-25 20:15:52
-->
# 更新日志

### 介绍

`mobile-init-project` 主要针对移动端进行开发的vue前端开发框架。

**发布节奏**

- 修订号：发布包含新特性和问题修复。
- 次版本号：发布包含新特性和较大的功能更新，向下兼容。
- 主版本号：发布时间不定，包含不兼容更新。

### [v1.1.0]()

**Feature**

- 新增svg文件压缩配置
- y-auto-form新增图形验证码与短信验证码表单项
- 表单演示页添加图形和短信验证码示例

**Fix**
- 去掉环境变量VUE_APP_OUTPUT_DIR，vue.config.js配置文件构建输出目录直接用dist
- 修改axios.js文件baseURL使用mock
- 修改main.js使用环境变量VUE_APP_MOCK_SERVER判断条件错误问题


### [v1.0.3]()

`2021-1-12`

**chore**
- 去除无用代码

**Feature**
- 新增简介版本前端框架分支：master-simple

### [v1.0.2]()

`2020-11-16`

**Feature**
- mixins：添加全局字典转换函数（asyncGetLabelByCodeFn、asyncGetLabelByCodesFn、asyncGetCodeByLabelFn、asyncGetCodeByLabelsFn）、全局日期转换函数（dayFormatFn）、常用校验函数（validatePostCodeFn,validatePwdFn,validateUserNameFn, validateTaxpayerNoFn,validateChineseFn, validateIdCardFn, validateMobilePhoneFn, validateHomePhoneFn, validateEmailFn, validateCodeCountFn,validateBankNo,validateUrl,）
- 新增字典使用页面案例

**chore 代码整理**

- utils：整理工具函数，去除无用工具文件。 

### [v1.0.1]()

`2020-11-03`

**Feature**

- @ylz/vant:更新@ylz/vant版本号为“2.11.0” ，确保下载到自主维护到扩展组件库。
- 添加nodejs脚本命令，自动创建页面和页面路由。
- 添加浏览器ie兼容配置
- 将依赖包镜像下载源指向私有库

**Bug Fixes**

- 修复eslint报错，git不检测问题
- 修复eslint,git检测冲突问题

**Docs 补充**
- 更新readme文档信息

**其他**
- 删除无用utils文件

### [v1.0.0]()

`2020-06-03`


**Feature**

- 主题：添加医保主题颜色配置
- 初始化框架
- 配置线上、测试环境、本地发布环境变量文件
- 添加加速访问速度优化配置
- 添加基础使用组件
