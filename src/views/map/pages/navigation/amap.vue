<!--
 * @Description: 导航地图组件
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-01 16:31:10
-->
<template>
  <div>
    <el-amap class="amap-box" ref="navmap" vid="amapVue" resizeEnable="true"  :amap-manager="amapManager" :plugin="plugin" :zoom="state.zoom" :center="state.center" :events="events" mapStyle="normal">
      <el-amap-marker v-for="(item, index) in state.markers" :position="item.position" :icon="item.icon" :events="item.events" :key="index"></el-amap-marker>
    </el-amap>
    <div class="map-icon">
      <div @click="showEndPos" class="item top">
        <van-icon name="location-o" />
        <span class="text">商户位置366</span>
      </div>
      <div @click="showStartPos" class="item bottom">
        <svg-icon icon-class="position" />
        <span class="text">当前定位44</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import VueAMap, { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap"
Vue.use(VueAMap)
import AmapApi from "../../model/amap-api"
import Markers from "../../controller/markers"

const amapManager = new AMapManager()
// localStorage.removeItem("_AMap_raster")
VueAMap.initAMapApiLoader({
  key: "6a9f338fbaee119e05d8f0fdeece9979", // 老龄委项目高德地图key
  plugin: [
    "AMap.Geocoder", // 点击地图获取经纬度和具体地址
    "AMap.Scale", // 比例尺，显示当前地图中心的比例尺
    "AMap.OverView", // 地图鹰眼插件 地图缩略图
    "AMap.ToolBar", // 地图工具条
    "AMap.CitySearch", // 城市获取服务，获取用户所在城市信息或根据给定IP参数查询城市信息
    "AMap.Geolocation", // 定位，提供了获取用户当前准确位置、所在城市
    "AMap.Marker",
    "AMap.Icon",
    "AMap.GeometryUtil",
    "AMap.Driving", // 驾车路线规划
    "AMap.Walking", // 步行路线规划
    "AMap.Transfer", // 公交路线规划
    "AMap.Riding", // 骑行路线规划
    "AMap.Pixel"
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: "1.4.4",
  uiVersion: "1.0.11" // 版本号
})

const amapApi = new AmapApi()
export default {
  name: "mapOfComponents",
  data() {
    return {
      amapManager, // 地图实例管理器
      state: {
        showPanel: false,
        zoom: 16, // 地图缩放
        center: [39.972236, 116.3821], // 当前位置经纬度
        addressComponent: {}, // 当前位置信息集合
        weather: "",
        markers: [],
        infoWin: []
      },
      // 路线规划
      panel: {
        index: 0,
        routes: []
      },
      // 地图事件对象
      events: {
        init: (o) => {
            lazyAMapApiLoaderInstance.load().then((res) => {
              this.getCurPos()
            })
        }
      },
      plugin: [] // 地图插件参数配置
    }
  },
  created() {
    this.$Loading.show()
  },
  mounted(){
     AMap.plugin(['AMap.Driving', 'AMap.Walking', 'AMap.Transfer' ,'AMap.Riding'], function () {
      // this.getCurPos()
      })
  },
  methods: {
    /**
     * @description 调用高德地图API 获取当前位置精准定位信息
     * @param zoom 地图缩放比例
     */
    async getCurPos(zoom) {
      // 存储地图实例
      this.$store.dispatch("map/setAmapManager", this.amapManager)
      //  根据定位获取当前城市信息
      const {
        city,
        citycode: cityCode,
        lng,
        lat
      } = await amapApi.getLocalCity()
      this.$store.dispatch("map/setCurPos", { city, cityCode, lng, lat })
      console.log("当前定位33:",city, cityCode, lng, lat)

      if (zoom) {
        this.state.zoom = zoom
      }
      this.state.center = [lng, lat]
      this.$Loading.hide()
      this.$emit("emitAmap")
      // 单个标点
      return new Promise((resolve) => {
        resolve({
          position: [lng, lat],
          offset: "0 0",
          icon: require("@/assets/svg/map/icon-point.svg") // 图标
        })
      })
    },
    async showStartPos() {
        //  根据定位获取当前城市信息
      const {
        city,
        citycode: cityCode,
        lng,
        lat
      } = await amapApi.getLocalCity()
    
      const marks = new Markers()
      const ret = await marks.setSingleMark({
        orgOfficeLon: lng,
        orgOfficeLat: lat,
        orgOfficeName: "八达岭长城"
      })
      this.state.center = [lng, lat]
      this.setMarkers(ret)
       
      console.log("当前定位33:",city, cityCode, lng, lat)
    
      console.log("===当前定位han---",lng,lat)
    },
    async showEndPos() {
      const { lng, lat, name } = this.$store.getters.navPos.end
      console.log("===商户位置定位---",lng,lat,name)
      const marks = new Markers()
      const ret = await marks.setSingleMark({
        orgOfficeLon: lng,
        orgOfficeLat: lat,
        orgOfficeName: name
      })
      this.state.center = [lng, lat]
      this.setMarkers(ret)
    },
    /**
     * @description: 设置坐标点
     * @param markers: 标记点数据
     */
    setMarkers(markers) {
      this.state.markers = []
      this.state.center = markers[0].position
      this.$nextTick(() => {
        this.state.markers = markers
        this.$refs.navmap.$$getInstance().setFitView()
      })
    }
  }

}
</script>

<style lang="less" scoped>
.custom-marker {
  background-image: url("~@/assets/svg/map/icon-location.svg");
  background-size: cover;
  background-repeat: no-repeat;
  color: @main_color;
  text-align: center;
  font-size: 16px * @ratio;
  font-weight: bold;
  padding-top: 2px * @ratio;
  width: 35px * @ratio;
  height: 40px * @ratio;
}
.map-page {
  // padding: @space_md_16 0;
  background: @main_bg_color;
  min-height: 100%;
  /deep/ .van-search__content {
    background-color: #fff;
    border-radius: 24px * @ratio;
    // border: 1px solid @main_color;
    // margin: 0 @space_xs_8;
  }
  /deep/ .van-search {
    padding: @space_sm_12 @space_md_16;
  }
  /deep/ .van-grid-item__content--center {
    background-color: #fffaf6;
  }
  /deep/ .van-field__right-icon {
    padding-left: 5px * @ratio;
    .van-icon {
      font-size: 24px * @ratio;
    }
    border-left: 1px solid;
  }
}
// 地图样式
.amap-box {
  height: 100vh;
}
.map-icon {
  position: fixed;
  right: 8px * @ratio;
  bottom: 20%;
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    cursor: pointer;
    padding: 5px * @ratio 9px * @ratio 5px * @ratio 5px * @ratio;
    box-shadow: 0px 2px * @ratio 12px * @ratio 0px rgba(0, 0, 0, 0.12);
    border-radius: 8px * @ratio;
    img {
      width: 16px * @ratio;
      height: 16px * @ratio;
      margin-right: 5px * @ratio;
    }
    .text {
      font-size: 18px * @ratio;
      color: #999999;
      line-height: 25px * @ratio;
    }
    &.top {
      margin-bottom: 10px * @ratio;
    }
  }
}
// 路线规划
.panel {
  position: fixed;
  background-color: white;
  max-height: 60%;
  overflow-y: auto;
  bottom: 0;
  width: 100%;

  z-index: 999;
  // padding-top: 15px * @ratio;
  // padding-bottom: 15px * @ratio;
  box-shadow: 0px 0px 10px * @ratio 0px rgba(204, 200, 197, 0.27);
}
.amap-call {
  display: none;
  background-color: #009cf9;
  border-top-left-radius: 4px * @ratio;
  border-top-right-radius: 4px * @ratio;
}
.amap-lib-transfer {
  border-bottom-left-radius: 4px * @ratio;
  border-bottom-right-radius: 4px * @ratio;
  overflow: hidden;
}
.amap-lib-transfer .plan dt span.line {
  height: 40px * @ratio;
}
.btn-arrow {
  text-align: center;
  margin-top: 8px * @ratio;
  margin-bottom: 16px * @ratio;
  transform: rotate(-180deg);
}
</style>
