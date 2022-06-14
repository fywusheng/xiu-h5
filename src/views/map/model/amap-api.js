/* eslint-disable no-undef */
/*
 * @Description: 高德api
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-16 17:35:08
 */
import store from "@/store"

//const globalTypeOpt = ["餐饮服务", "体育休闲服务", "风景名胜", "购物服务", "医疗保健服务"]
//const original = ["美食", "休闲", "景区", "购物", "医院", "其他"]
const globalTypeOpt = ["NULL", "NULL", "商场|便民商店/便利店|家电电子卖场|超级市场|专卖店", "餐饮服务", "风景名胜", "医疗保健服务机构|综合医院|专科医院|诊所|急救中心|疾病预防机构", "医药保健销售店", "住宿服务", "政府机构及社会团体", "NULL"]
const original = ["助餐点", "日间照料", "商超", "美食", "景点", "医院", "药店", "住宿", "政务服务", "养老院", ""]

class AmapApi {
  /**
   * @description 高德POI搜索 关键字搜索
   * @param {*} keyWord 
   */
  keywordSearchByApi(keyWord) {
    console.log("===地图关键字搜索---", keyWord)
    const PlaceSearch = new AMap.PlaceSearch({
      city: store.getters.curPos.cityCode,
      extensions: "all",
      pageSize: 25,
      pageIndex: 1
    })
    return new Promise((resolve, reject) => {
      PlaceSearch.search(keyWord, async(status, result) => {
        if (status === "complete" && result.info === "OK") {
          const pois = result.poiList.pois
          const { lng, lat } = await this.getCurpos()
          if (pois.length > 0) {
            pois.forEach(item => {
              item.orgOfficeName = item.name
              item.orgOfficeLon = item.location.lng
              item.orgOfficeLat = item.location.lat
              item.orgOfficeType = this.getOrgOfficeType(item)
              item.distance = AMap.GeometryUtil.distance([lng, lat], [item.location.lng, item.location.lat])
            })
            resolve(pois)
          }
        } else {
          resolve([])
        }
      })
    })
  }
  /**
   * @description 高德分类搜索
   * @param {String} typeId 类型id
   * @param {Array} typeOpt 高德分类类型数据 ["餐饮服务", "体育休闲服务", "风景名胜", "购物服务", "医疗保健服务"]
   * @param {Array} original 本地分类类型数据 ["美食", "休闲", "景区", "购物", "医院"]
   */
  async getClassifyDataByApi(center) {
    const typeId = store.getters.classification.typeId
    let typeText = ""
    const keyword = sessionStorage.getItem("key_word")
    if (typeId === "") {
      typeText = "商场|便民商店/便利店|家电电子卖场|超级市场|专卖店|餐饮服务|风景名胜|医疗保健服务场所|综合医院|专科医院|诊所|急救中心|疾病预防机构|医药保健销售店|住宿服务|政府机构及社会团体"
    } else {
      typeText = globalTypeOpt[typeId]
    }
    console.log("===类型值分类搜索2---", typeId, typeText)
    const { lng, lat, city } = await this.getCurpos()
    const placeSearch = new AMap.PlaceSearch({
      city: city, // 兴趣点城市
      // children: options.children, // 是否按照层级展示子POI数据
      type: typeText, // 兴趣点类别
      pageSize: 25,
      pageIndex: 1,
      extensions: "all",
      autoFitView: true // 自动调整地图视野
    })
    return new Promise((resolve) => {
      placeSearch.searchNearBy(keyword, [center.lng, center.lat], 20000, (status, ret) => {
        let originalData = []
        if (status === "complete" && ret.info === "OK") {
          originalData = ret.poiList.pois
          originalData.forEach(item => {
            item.orgOfficeLon = item.location.lng
            item.orgOfficeLat = item.location.lat
            item.orgOfficeName = item.name
            item.orgOfficeTel = item.tel
            item.orgOfficeType = this.getOrgOfficeType(item)
            item.distance = AMap.GeometryUtil.distance([lng, lat], [item.location.lng, item.location.lat])
          })
          resolve(originalData)
        } else {
          resolve(originalData)
        }
      })
    })
  }

  /**
   * @description 周边
   * @param distance 范围距离 han  TODO
   */
  async nearBySearchByApi(params) {
    const key_word = sessionStorage.getItem("key_word")
    const { lng, lat, city } = await this.getCurpos()
    let typeText = ""
    if (params.type) {
      typeText = globalTypeOpt[params.type]
    } 
    const type = params.type
    if (type === "") {
      typeText = "商场|便民商店/便利店|家电电子卖场|超级市场|专卖店|餐饮服务|风景名胜|医疗保健服务场所|综合医院|专科医院|诊所|急救中心|疾病预防机构|医药保健销售店|住宿服务|政府机构及社会团体"
    } else {
      typeText = globalTypeOpt[type]
    }
    const placeSearch = new AMap.PlaceSearch({
      city: city, // 兴趣点城市
      // children: options.children, // 是否按照层级展示子POI数据
      type: typeText, // 兴趣点类别
      pageSize: params.pageSize,
      pageIndex: params.curPage,
      extensions: "all",
      autoFitView: true // 自动调整地图视野
    })
    return new Promise((resolve) => {
      placeSearch.searchNearBy(key_word, [lng, lat], params.distance, (status, result) => {
        let originalData = []
        if (status === "complete" && result.info === "OK") {
          originalData = result.poiList.pois
          originalData.forEach(item => {
            item.orgOfficeLon = item.location.lng
            item.orgOfficeLat = item.location.lat
            item.orgOfficeName = item.name
            item.orgOfficeTel = item.tel
            item.orgOfficeType = this.getOrgOfficeType(item)
          })
          resolve(originalData)
        } else {
          resolve(originalData)
        }
      })
    })
  }
  // 高精度定位，自动根据IP定位获取当前城市
  getLocalCity() {
    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: true, //是否使用高精度定位，默认:true
      timeout: 5000, //超过10秒后停止定位，默认：5s
      position: "RB", //定位按钮的停靠位置
      buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
    })

    const citySearch = new AMap.CitySearch()
    return new Promise((resolve, reject) => {
      let city = ""
      citySearch.getLocalCity((status, result) => {
        if (status === "complete" && result.info === "OK") {
          city = result.city
        } else {
          reject("自动获取当前城市数据失败")
        }
      })
      geolocation.getCurrentPosition((status, result) => {
        if (status == "complete") {
          resolve({
            city: city,
            citycode: result.addressComponent.citycode,
            lng: result.position.lng,
            lat: result.position.lat
          })
        }
      })

    })
  }
  /**
   * @description 获取经纬度 当前匹配值第一个
   * @param {*} city：设置地址描述所在城市  可选值：城市名（中文或中文全拼）、citycode、adcode
   * @param {*} radius：半径 默认 1000米 
   */
  getLocation(city) {
    const geocoder = new AMap.Geocoder()
    return new Promise((resolve, reject) => {
      geocoder.getLocation(city, (status, result) => {
        if (status === "complete") {
          const geocodes = result.geocodes[0]
          resolve(geocodes)
        } else {
          reject("获取所在城市经纬度失败")
        }
      })
    })
  }
  //定位控件，用来获取和展示用户主机所在的经纬度位置
  getCurrentPosition() {
    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: true
    })
    return new Promise((resolve, reject) => {
      geolocation.getCurrentPosition((status, result) => {
        if (status === "complete" && result.info === "SUCCESS") {
          resolve(result)
        } else {
          reject(result)
        }
      })
    })
  }
 
  getOrgOfficeType(item) {
    //const index = globalTypeOpt.indexOf(item.type.split(";")[0]) > -1 ? globalTypeOpt.indexOf(item.type.split(";")[0]) : 10
    const types = item.type.split(";")
    let curIndex = null
    
    types.some((value, index, array) => {
      if (value == "医疗保健服务"){
        curIndex = 5
        return
      }
      if (value == "购物服务"){
        curIndex = 2  
        return
      }
      if (globalTypeOpt.indexOf(value) > -1){
        curIndex = globalTypeOpt.indexOf(value)
        return
      }
    })
    return original[curIndex]
  }
  getCurreIndex(globalTypeOpt, item, fn){
    const types = item.type.split(";")
    this.curIndex = null
    return types.some((value, index, array) => {
      if (globalTypeOpt.includes(value)){
        fn(index)
        return 
      }
    })
  }

  async getCurpos() {
    const curPos = await store.dispatch("map/getCurPos")
    return curPos
  }
}

export default AmapApi