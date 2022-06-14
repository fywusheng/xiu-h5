/*
 * @Description: 惠老地图相关Vuex
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-08 14:32:55
 */
const state = {
  // 当前地点分类
  classification: {
    type: "allMarker",
    typeId: ""
  },
  // 当前所在城市
  location: {
    city: "", // 名称
    cityCode: "", // 城市代码
    lon: "", // 经度
    lat: "", // 纬度
    lng: "" // 经度
  },
  // 当前位置信息
  curPos: {
    city: "",
    cityCode: "",
    lng: "", // 经度
    lat: ""
  },
  // 地图拖拽，地图中心点
  dynamicPos: {
    lng: "", // 经度
    lat: "" // 纬度
  },
  // 导航位置信息
  navigationPos: {
    start: {
      name: "",
      lng: "",
      lat: ""
    },
    end: {
      name: "",
      lng: "",
      lat: ""
    }
  },
  amapManager: null,
  orgOfficeLon: 0,
  orgOfficeLat: 0, // 导航地点
  orgOfficeName: 0, // 导航地点名称
  endPosition: JSON.parse(sessionStorage.getItem("targetPos")) || {}, // 导航终点经纬度信息
  markersList: []
}

const mutations = {
  SetCurPos: (state, location) => {
    state.curPos.lng = location.lng
    state.curPos.lat = location.lat
    state.curPos.cityCode = location.cityCode
    state.curPos.city = location.city
  },
  set_endPos: (state, pos) => {
    state.endPosition = pos
    const end = state.navigationPos.end
    end.name = pos.orgOfficeName
    end.lng = pos.orgOfficeLon
    end.lat = pos.orgOfficeLat
  },
  SetDynamicPos: (state, pos) => {
    state.dynamicPos.lng = pos.lng
    state.dynamicPos.lat = pos.lat
  },
  set_classification: (state, val) => {
    state.classification.typeId = val.typeId
    state.classification.type = val.type
  },
  set_markersList: (state, list) => {
    state.markersList = list
  },
  set_amapManager: (state, obj) => {
    state.amapManager = obj
  }
}

const actions = {
  /**
   * @description 当前定位
   * @param {Object} pos 终点经纬度
   */
  setCurPos({ commit }, pos) {
    localStorage.setItem("curPos", JSON.stringify({
      city: pos.city,
      cityCode: pos.cityCode,
      lng: pos.lng,
      lat: pos.lat
    }))
    commit("SetCurPos", pos)
  },
  getCurPos({state, commit}) {
    let curPos = null
    if (state.curPos.lng) {
      curPos = state.curPos
    } else {
      curPos = JSON.parse(localStorage.getItem("curPos"))
    }
    console.log("===state---", state)
    return new Promise(resolve => {
      resolve(curPos)
    })
  },
  /**
   * @description 地图拖拽中心点
   * @param {*} pos 终点经纬度
   */
  setDynamicPos({ commit }, pos) {
    commit("SetDynamicPos", pos)
  },
  /**
   * @description 导航分类
   * @param {*} pos 终点经纬度
   */
  setClassification({ commit }, text) {
    commit("set_classification", text)
  },
  /**
   * @description 地点概要 
   * @param {*} list 地点信息
   */
  setMarkersList({ commit }, list) {
    commit("set_markersList", list)
  },
  /**
   * @description 设置路线规划终点 setTargetPos
   * @param {*} pos 终点经纬度
   */
  setEndPos({ commit }, pos) {
    sessionStorage.setItem("endPos", JSON.stringify(pos))
    commit("set_endPos", pos)
  },
  setAmapManager({ commit }, obj) {
    commit("set_amapManager", obj)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}