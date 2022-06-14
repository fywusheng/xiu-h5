/* eslint-disable no-undef */
/*
 * @Description: 点标记相关功能
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-05-21 10:08:04
 */
import CompleteApi from "../model/merge-data"
import { mapApi } from "@/api"
import store from "@/store/index"
class Markers {
  /**
   * @description: 设置分类标点
   * @param {fn} fn handleClickMarker (map.vue)
   * @param {object} param1 
   */
  async setClassificationMarkers(fn, { type }) {
    const center = store.getters.dynamicPos
    const completeApi = new CompleteApi()
    const originalMarkers = await completeApi.getClassification(type, center)
    return await this.setMultipleMark(fn, originalMarkers)
  }
  // 设置单个标点
  setSingleMark(item) {
    return new Promise(resolve => {
      const obj = {
        position: [item.orgOfficeLon, item.orgOfficeLat],
        icon: this.setMarkerIcon(item),
        title: item.orgOfficeName,
        events: {
          click: () => { }
        }
      }
      resolve([obj])
    })
  }
  /**
   * @description: 设置多个标点
   * @param {fn} fn handleClickMarker (map.vue)
   * @param {object} param1 
   */
  setMultipleMark(fn, originalData) {
    return new Promise((resolve) => {
      const newMarkers = []
      if (originalData.length === 0) {
        resolve(newMarkers)
      }
      originalData.forEach(item => {
        const obj = {
          position: [item.orgOfficeLon, item.orgOfficeLat],
          // contentRender: (h, instance) => this.setMarker(h, item, instance),
          icon: this.setMarkerIcon(item),
          events: {
            click: () => {
              const val = Object.assign(item, {
                position: obj.position,
                name: item.orgOfficeName
              })
              fn(val)
            }
          }
        }
        newMarkers.push(obj)
        if (originalData.length === newMarkers.length) {
          store.dispatch("map/setMarkersList", originalData)
          resolve(newMarkers)
        }
      })
    })
  }
  // 设置地图标记Icon setMarker(h, item)
  setMarkerIcon(item) {
    const tempArr = ["景区", "景点", "美食", "药店", "助餐点", "医院", "养老院", "商超", "住宿", "政务服务", "日间照料"]
    let imgPath = ""
    if (item.orgOfficeType === "美食") {
      imgPath = `${require("@/assets/svg/map/marker-deliciousFood.svg")}`
    }
    if (item.orgOfficeType === "药店") {
      imgPath = `${require("@/assets/svg/map/marker-pharmacy.svg")}`
    }
    if (item.orgOfficeType === "景区" || item.orgOfficeType === "景点") {
      imgPath = `${require("@/assets/svg/map/marker-scenic.svg")}`
    }
    if (item.orgOfficeType === "助餐点") {
      imgPath = `${require("@/assets/svg/map/marker-help-meal.svg")}`
    }
    if (item.orgOfficeType === "养老院") {
      imgPath = `${require("@/assets/svg/map/marker-nursing-home.svg")}`
    }
    if (item.orgOfficeType === "商超") {
      imgPath = `${require("@/assets/svg/map/marker-store.svg")}`
    }
    if (item.orgOfficeType === "住宿") {
      imgPath = `${require("@/assets/svg/map/marker-hotel.svg")}`
    }
    if (item.orgOfficeType === "医院") {
      imgPath = imgPath = `${require("@/assets/svg/map/marker-hospital.svg")}`
    }
    if (item.orgOfficeType === "政务服务") {
      imgPath = imgPath = `${require("@/assets/svg/map/marker-government.svg")}`
    }
    if (item.orgOfficeType === "日间照料") {
      imgPath = imgPath = `${require("@/assets/svg/map/marker-look-after.svg")}`
    }
    if (!tempArr.includes(item.orgOfficeType)) {
      imgPath = imgPath = `${require("@/assets/svg/map/marker-other.svg")}`
    }
    return imgPath
    // return h(
    //   "div",
    //   {
    //     style: {
    //       color: "#000",
    //       width: "47px",
    //       height: "52px",
    //       "background": `url(${imgPath}) no-repeat`,
    //       "background-size": "cover",
    //       "text-align": "center",
    //       "font-size": "16px",
    //       "font-weight": "bold",
    //       "padding-top": "4px"
    //     }
    //   }
    // )
  }

  /**
   * @description 根据服务机构id获取服务机构详情信息
   * @param {String} orgOfficeId 服务机构id
   */
  async getMarkSummaryInfo(val, tag = true) {
    const { data: ret } = await mapApi.getEcOrgOfficeInfoById({
      orgOfficeId: val
    }, {
      authorization: "ec_token"
    })
    return new Promise((resolve, reject) => {
      const curPos = sessionStorage.getItem("curPos")
      if (curPos) {
        const startPoint = JSON.parse(sessionStorage.getItem("curPos")).postion
        const endPoint = [ret.orgOfficeLon, ret.orgOfficeLat]
        if (tag) {
          const distance = new AMap.GeometryUtil.distance(startPoint, endPoint)
          resolve({ distance, ...ret })
        } else {
          resolve(ret)
        }
      } else {
        resolve(ret)
      }
    })
  }

  // 全部标记
  async allMarker(fn) {
    return await this.setClassificationMarkers(fn, { type: "" })
  }
  // 美食标记
  async deliciousFoodMarker(fn, type) {
    return await this.setClassificationMarkers(fn, { type })
  }
  // 休闲标记
  async casualMarker(fn, type) {
    return await this.setClassificationMarkers(fn, { type })
  }
  // 景区标记
  async scenicMarker(fn, type) {
    return await this.setClassificationMarkers(fn, { type })
  }
  // 购物标记
  async shoppingMarker(fn, type) {
    return await this.setClassificationMarkers(fn, { type })
  }
  // 医院标记
  async hospitalMarker(fn, type) {
    return await this.setClassificationMarkers(fn, { type })
  }
  // 药店
  async pharmacyMarker(fn, type) {
    return await this.setClassificationMarkers(fn, { type })
  }
  // 住宿
  async stayMarker(fn, type) {
    return await this.setClassificationMarkers(fn, { type })
  }
  // 商超
  async shopMarker(fn, type) {
    return await this.setClassificationMarkers(fn, { type })
  }
  // 日料
  async dayfoodMarker(fn, type) {
    return await this.setClassificationMarkers(fn, { type })
  }
  //homeMarker 家政
  async homeMarker(fn, type) {
    return await this.setClassificationMarkers(fn, { type })
  }
  //agedMarker
  async agedMarker(fn, type) {
    return await this.setClassificationMarkers(fn, { type })
  }
  //助餐
  async helpfoodMarker(fn, type) {
    return await this.setClassificationMarkers(fn, { type })
  }
}

export default Markers
