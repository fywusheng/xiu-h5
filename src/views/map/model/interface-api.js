/* eslint-disable no-undef */
/*
 * @Description: java接口
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-13 17:23:21
 */
import store from "@/store"
import { mapApi } from "@/api"

//const original = ["美食", "休闲", "景区", "购物", "医院"]
const original = ["助餐点", "日间照料", "商超", "美食", "景点", "医院", "药店", "住宿", "政务服务", "养老院", ""]
class InterfaceApi {
  /**
   * @description 根据关键字搜索获取服务机构列表
   * @param {String} orgOfficeName 关键字
   * @param {String} orgOfficeLon 经度
   * @param {String} orgOfficeLat 纬度
   */
  async keywordSearch(orgOfficeName) {
    const { lng, lat } = await this.getCurpos()
    // 调取接口返回采集数据
    const { data } = await mapApi.getEcOrgOfficeInfoByPoint({
      orgOfficeLon: lng,
      orgOfficeLat: lat,
      orgOfficeName: orgOfficeName
    })
    return new Promise((resolve) => {
      resolve(data)
    })
  }
  /**
   * @description 获取分类数据
   * @param {String} orgOfficeName 关键字
   * @param {String} orgOfficeLon 经度
   * @param {String} orgOfficeLat 纬度
   */
  async getClassification(center) {
    const typeId = store.getters.classification.typeId
    const key_word = sessionStorage.getItem("key_word")
    // const { cityCode } = await this.getCurpos()
    const { data } = await mapApi.getEcOrgOfficeInfoByPoint({
      distance: 2000,
      // orgOfficeAddrArea: cityCode,
      orgOfficeType: original[typeId],
      orgOfficeLon: center.lng,
      orgOfficeLat: center.lat,
      size: 25,
      orgOfficeName: key_word
    }, {
      authorization: "ec_token"
    })
    return new Promise((resolve, reject) => {
      resolve(data)
    })
  }
  /**
   * @description 获取周边数据
   * @param distance 范围距离
   * 
   */
  async nearBySearchByInterface(params) {
    const typeId = params.type
    const { lng, lat } = await this.getCurpos()
    console.log("====租后接口2---", params.type, original[typeId])
    const { data } = await mapApi.getOfficeByPointPage({
      // orgOfficeAddrArea: cityCode,
      orgOfficeType: typeId == "null" ? "" : original[typeId],
      distance: params.distance,
      orgOfficeLon: lng,
      orgOfficeLat: lat,
      currentPage: params.curPage,
      pageSize: params.pageSize
      // size: params.pageSize
    }, {
      authorization: "ec_token"
    })
    return new Promise(resolve => {
      resolve(data.list)
    })
  }

  async getCurpos() {
    const curPos = await store.dispatch("map/getCurPos")
    return curPos
  }
  
}

export default InterfaceApi