/* eslint-disable no-undef */
/*
 * @Description: 地图公共
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-05-21 15:01:10
 */
import Vue from "vue"
import VueAMap, { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap"

Vue.use(VueAMap)
const amapManager = new AMapManager()
localStorage.removeItem("_AMap_raster")

VueAMap.initAMapApiLoader({
  key: "6a9f338fbaee119e05d8f0fdeece9979", // 老龄委项目高德地图key     ed1332db13bb50e5099ddadabd2670e4
  plugin: [
    "AMap.Geocoder", // 点击地图获取经纬度和具体地址
    "AMap.Autocomplete", // 输入提示插件，POI搜索插件
    "AMap.PlaceSearch", // 地点搜索服务,提供了关键字搜索、周边搜索、范围内搜索等功能
    "AMap.Scale", // 比例尺，显示当前地图中心的比例尺
    "AMap.OverView", // 地图鹰眼插件 地图缩略图 
    "AMap.ToolBar", // 地图工具条
    "AMap.CitySearch", // 城市获取服务，获取用户所在城市信息或根据给定IP参数查询城市信息
    "AMap.LineSearch", // 公交路线服务，提供公交路线相关信息查询服务
    "AMap.StationSearch", // 公交站点查询服务，提供途经公交线路、站点位置等信息
    "AMap.Geolocation", // 定位，提供了获取用户当前准确位置、所在城市的方法
    "AMap.Driving", // 驾车路线规划服务，提供按照起、终点进行驾车路线的功能
    "AMap.Weather" // 天气预报插件，用于获取未来的天气信息
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: "1.4.4",
  uiVersion: "1.0.11" // 版本号
})
lazyAMapApiLoaderInstance.initAMapApiLoader()
amapManager.getMap()

const autoComplete = new AMap.Autocomplete({
  city: city,
  datatype: "all"
})
return new Promise((resolve, reject) => {
  autoComplete.search(keyWord, (status, result) => {
    // 搜索成功时，result即是对应的匹配数据
    if (status === "complete" && result.info === "OK") {
      const { lng, lat } = this.getCurpos()
      if (result.tips.length > 0) {
        result.tips.forEach(item => {
          item.orgOfficeName = item.name
          item.orgOfficeLon = item.location.lng
          item.orgOfficeLat = item.location.lat
          item.orgOfficeAddrArea = item.district
          item.orgOfficeAddr = item.address
          item.distance = AMap.GeometryUtil.distance([lng, lat], [item.location.lng, item.location.lat])
        })
        resolve(result.tips)
      }
    } else {
      resolve([])
    }
  })
})