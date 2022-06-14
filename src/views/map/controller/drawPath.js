/* eslint-disable no-undef */
/*
 * @Description: 路线规划相关功能
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-05-29 13:48:32
 */

import Store from "@/store/index"
const iconStarPos = require("@/assets/svg/map/icon-posStart.svg")
const iconEndPos = require("@/assets/svg/map/icon-posEnd.svg")
class DrawPath {
  startPos = {} // 起始点经纬度
  endPos = {} // 终点经纬度
  constructor(amapManager) {
    this.amapManager = amapManager
  }
  init() {
    console.log("====Map---", AMap)
    //debugger
    this.setStartPos()
    this.setEndPos()
    const start = this.getStartPos()
    const end = this.getEndPos()
    console.log("====开始位置坐标---", start)
    console.log("====结束位置坐标---", end)
    return new Promise((resolve) => {
      const distance = AMap.GeometryUtil.distance([start.lng, start.lat], [end.lng, end.lat])
      resolve(distance)
    })
  }
  // 驾车路线规划
  driving() {
    const jumapp = document.getElementById("jumpApp")
     console.log("===驾车文件==", AMap.DrivingPolicy)
    var driving = new AMap.Driving({
      policy: AMap.DrivingPolicy.LEAST_TIME
    })
    const start = this.getStartPos()
    const end = this.getEndPos()
    console.log("====是否拿到新的位置start---", start)
    console.log("====是否拿到新的位置end---", end)
    return new Promise((resolve, reject) => {
      driving.search(
        new AMap.LngLat(start.lng, start.lat),
        new AMap.LngLat(end.lng, end.lat),
        (status, result) => {

          console.log("====重新近下来drop--", result)
          jumapp.onclick = function(){
            console.log("====riding导航处理", result)
            driving.searchOnAMAP({
                origin: result.origin,
                destination: result.destination
            })
          }
          if (status === "complete" && result.info === "OK") {
            const time = result.routes.length > 0 ? Math.ceil(result.routes[0].time / 60) : ""
            const distance = result.routes.length > 0 ? result.routes[0].distance : "0米"
            resolve({ result, time, distance })
          } else {
            reject("get driving Data failure")
          }
        })
    })
  }

  // 公交路线规划
  transfer() {
    const jumapp = document.getElementById("jumpApp")
   // this.init()  后续查看注释掉会有什么问题
    const start = this.getStartPos()
    const end = this.getEndPos()
    console.log("====公交路线中的开始位置0---", start, end)
    const transferOptions = {
      nightflag: true, // 是否计算夜班车
      city: this.startPos.city,
      outlineColor: "#ffeeee",
      policy: AMap.TransferPolicy.LEAST_TIME
    }
    const transfer = new AMap.Transfer(transferOptions)
    return new Promise((resolve, reject) => {
      transfer.search(
        new AMap.LngLat(start.lng, start.lat),
        new AMap.LngLat(end.lng, end.lat),
        (status, result) => {
          console.log("===公交返回状态查看han---", status, result)
          if (status === "complete" && result.info === "OK") {
            console.log("====高德返回公交路线情况---", result)
            const time = result.plans.length > 0 ? Math.ceil(result.plans[0].time / 60) : ""
            const distance = result.plans.length > 0 ? result.plans[0].distance : "0米"

            jumapp.onclick = function(){
              console.log("====riding导航处理", result)
              transfer.searchOnAMAP({
                  origin: result.origin,
                  destination: result.destination
              })
            }

            resolve({ result, time, distance })
          } else if (status === "complete" && result.info === "NO_DATA") {
            resolve({ result })
          } else {
            reject("get transfer Data failure")
          }
          
        })
    })
  }

  // 骑行路线规划
  riding() {
    const jumapp = document.getElementById("jumpApp")
    const start = this.getStartPos()
    const end = this.getEndPos()
    console.log("====骑行路线中的开始位置0---", start, end)
    const ridingOption = {
      policy: 1,
      hideMarkers: false,
      isOutline: true,
      outlineColor: "#ffeeee",
      autoFitView: true
    }
    const riding = new AMap.Riding(ridingOption)
    return new Promise((resolve, reject) => {
      riding.search(
        [start.lng, start.lat],
        [end.lng, end.lat],
        (status, result) => {
          if (status === "complete" && result.info === "OK") {
            const time = result.routes.length > 0 ? Math.ceil(result.routes[0].time / 60) : ""
            const distance = result.routes.length > 0 ? result.routes[0].distance : "0米"
            jumapp.onclick = function(){
              console.log("====riding导航处理", result)
              riding.searchOnAMAP({
                  origin: result.origin,
                  destination: result.destination
              })
            }
            resolve({ result, time, distance })
          } else {
            reject("get riding Data failure")
          }
        })
    })
  }

  //  步行路线规划
  walking() {
    const jumapp = document.getElementById("jumpApp")
    console.log("===jumpApp22--", jumapp)
    const start = this.getStartPos()
    const end = this.getEndPos()
    console.log("====步行路线中的开始位置0---", start, end)
    const walking = new AMap.Walking({
      // policy: AMap.WalkingPolicy.LEAST_TIME,
      ferry: 1 // 是否可以使用轮渡
    })
    return new Promise((resolve, reject) => {
      walking.search(
        [start.lng, start.lat],
        [end.lng, end.lat],
        (status, result) => {
          if (status === "complete" && result.info === "ok") {
            const time = result.routes.length > 0 ? Math.ceil(result.routes[0].time / 60) : ""
            const distance = result.routes.length > 0 ? result.routes[0].distance : "0米"
            jumapp.onclick = function(){
              console.log("====步行导航处理", result)
              walking.searchOnAMAP({
                  origin: result.origin,
                  destination: result.destination
              })
            }
            resolve({ result, time, distance })
          } else {
            reject("get walking Data failure")
          }
        }
      )
    })
  }
  /**
   * @description 绘制路径
   * @param {*} route 
   */
  drawRoute(route, key) {
    this.amapManager.getMap().clearMap()
    const path = this.parseRouteToPath(route, key)
    const startMarker = new AMap.Marker({
      position: path[0],
      icon: iconStarPos,
      offset: new AMap.Pixel(-13, -30),
      map: this.amapManager.getMap()
    })

    const endMarker = new AMap.Marker({
      position: path[path.length - 1],
      icon: iconEndPos,
      map: this.amapManager.getMap()
    })

    const routeLine = new AMap.Polyline({
      path: path,
      isOutline: true,
      outlineColor: "#ffeeee",
      borderWeight: 2,
      strokeWeight: 5,
      strokeColor: "#0091ff",
      lineJoin: "round"
    })
    routeLine.setMap(this.amapManager.getMap())

    // 调整视野达到最佳显示区域
    this.amapManager.getMap().setFitView([startMarker, endMarker, routeLine])
  }
  /**
   * @description 将route对象转化为path路径
   * @param {*} route 
   * @returns 
   */
  parseRouteToPath(route, key) {
    var path = []
    const len = route[key].length
    for (let i = 0; i < len; i++) {
      var step = route[key][i]
      for (let j = 0, n = step.path.length; j < n; j++) {
        path.push(step.path[j])
      }
    }
    return path
  }
  /**
   * @description 绘制公交路线规划
   * @param {} route 路线数据
   */
  drawRouteByTransfer(route) {
    this.amapManager.getMap().clearMap()
    var startMarker = new AMap.Marker({
      position: route.segments[0].transit.origin,
      icon: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
      map: this.amapManager.getMap()
    })

    var endMarker = new AMap.Marker({
      position: route.segments[route.segments.length - 1].transit.destination,
      icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
      map: this.amapManager.getMap()
    })

    const routeLines = []
    const len = route.segments.length
    for (let i = 0; i < len; i++) {
      const segment = route.segments[i]
      let line = null

      // 绘制步行路线
      if (segment.transit_mode === "WALK") {
        line = new AMap.Polyline({
          path: segment.transit.path,
          isOutline: true,
          outlineColor: "#ffeeee",
          borderWeight: 2,
          strokeWeight: 5,
          strokeColor: "grey",
          lineJoin: "round",
          strokeStyle: "dashed"
        })
        line.setMap(this.amapManager.getMap())
        routeLines.push(line)
      }
      if (segment.transit_mode === "SUBWAY" || segment.transit_mode === "BUS") {
        line = new AMap.Polyline({
          path: segment.transit.path,
          isOutline: true,
          outlineColor: "#ffeeee",
          borderWeight: 2,
          strokeWeight: 5,
          strokeColor: "#0091ff",
          lineJoin: "round",
          strokeStyle: "solid"
        })
        line.setMap(this.amapManager.getMap())
        routeLines.push(line)
      }
    }
    // 调整视野达到最佳显示区域
    this.amapManager.getMap().setFitView([startMarker, endMarker].concat(routeLines))
  }
  /**
   * @description 获取起始定位、终点定位
   * @param {Object} startPos 起始定位
   * @param {Object} endPos 终点定位
   */
  setStartPos(startPos) {
    if (!startPos) {
      const { city, lng, lat } = Store.getters.curPos || JSON.parse(sessionStorage.getItem("curPos"))
      this.startPos.city = city
      this.startPos.lon = lng
      this.startPos.lat = lat
    } else {
      console.log("----记录地理位置---", startPos)
      this.startPos.lon = startPos.startPos.lon
      this.startPos.lat = startPos.startPos.lat
    }
  }
  setEndPos(endPos) {
    if (!endPos) {
      const { end } = Store.getters.navPos
      this.endPos.lon = end.lng
      this.endPos.lat = end.lat
    } else {
      this.endPos.lon = endPos.lng
      this.endPos.lat = endPos.lat
    }
  }
  getStartPos() {
    const { city, lon: lng, lat } = this.startPos
    return { city, lng, lat }
  }
  getEndPos() {
    const { lon: lng, lat } = this.endPos
    return { lng, lat }
  }
}

export default DrawPath