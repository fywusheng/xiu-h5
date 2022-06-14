<!--
 * @Description: 项目结构
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-08-07 00:13:55
-->
# api 接口
```sh
├── axios
├── index 接口按模块引入
├── modules
    ├── claim-api 电子证
    ├── common-api 公共接口
    ├── discovery-api 尊老头条
    ├── family-api 赡养扶养关系、亲情账号
    ├── map-api 地图接口
    ├── rights-api 个人权益
    ├── service-api 惠老服务
```
# store modules 
```sh
├── discovery 尊老头条
├── map 惠老地图
├── user 用户信息
```
# utils 工具类
```sh
├── index
    ├── isWiFi 判断是否连接wifi
    ├── jumpFaceRecognition 跳转人脸识别页面
├── formCheck 表单字段校验
```
# views 页面
```sh 
├── claim 老年电子证
    ├── step 领卡流程
        ├── base-info 基本信息
        ├── contact-person 紧急联系人
        ├── material 材料
        ├── sucess 为自己领卡成功
        ├── sucess-others 为他人领卡成功
├── common 公共组件
    ├── ocr 文字识别
    ├── qr-code-scan 扫一扫
├── discovery 尊老头条
    ├── home 首页
        ├── search 搜索
        ├── list 列表
        ├── comp-article 文章组件
    ├── detail 详情
        ├── detail 文章详情
        ├── toolBar 工具条
        ├── video 视频列表
        ├── webView app详情页
    ├── audio-comp 头条首页
├── family-account 亲情账号
    ├── hasPhone 被绑定人有手机号
    ├── noPhone 被绑定人无手机号
    ├── management 亲情账号管理
    ├── binding-method 亲情账号首页, 亲情账号绑定方式
    ├── bindAccount 亲情账号绑定(通过短信)
├── home 首页
    ├── comp 首页面组件
        ├── service 惠老服务
        ├── tool-bar 亮证、扫一扫、老年码 
        ├── banner
        ├── nav 导航
        ├── personal-rights 个人服务
        ├── search-bar 搜索框
        ├── tool 辟谣、养老地图
    ├── refute-rumors 辟谣
├── map 养老地图
    ├── controller 处理数据回显view
        ├── drawPath 路径规划数据处理
        ├── markers 标点数据处理
    ├── model 处理接口返回数据(高德API和java)
        ├── amap-api 高德API接口
        ├── interface-api Java接口
        ├── merge-data 将高德跟项目自有接口返回的数据进行合并
    ├── pages 页面
        ├── detail 机构服务详情
            ├── place 机构服务详情页
              ├── scenic 景点详情页
              ├── hospital 医院详情页
            ├── nearby 周边
        ├── main 地图主要功能
            ├── amap 高德地图实例 
            ├── search 搜索功能
            ├── summary 机构信息概览
        ├── navigation
            ├──content 导航首页
├── personal-rights 个人权益
    ├── age-allowance 高龄津贴
    ├── medicare 医疗保险
    ├── pension 养老金 
    ├── policy-description优惠政策说明
    ├── existing-rights 已有权益
    ├── Home 个人权益首页
    ├── physical-examination 预约体检
├── service 惠老服务
    ├── culture-entertainment 文化娱乐
    ├── health-care 养生保健
    ├── health-check 健康体检
    ├── house-keeping 家政服务
    ├── travel 出行旅行
├── support-raise 赡养扶养关系
    ├── list 赡养扶养关系列表
    ├── createRaise 添加赡养关系
    ├── updateRaise 编辑赡养关系
    ├── createSupport 添加扶养关系
    ├── updateSupport 编辑扶养关系
├── user-center 用户中心
    ├── index 用户中心首页
    ├── verified 纯实名认证
    ├── message 用户中心首页
```
## 地图相关文档
[ 高德地图api ](https://lbs.amap.com/api/javascript-api/summary/)
[ vue-amap文档 ](https://elemefe.github.io/vue-amap/#/zh-cn/introduction/install)

[ 手机拍照预览2种实现方式 ](https://cloud.tencent.com/developer/article/1410306)
[ html5摄像头调用 ](https://cloud.tencent.com/developer/article/1476896)
