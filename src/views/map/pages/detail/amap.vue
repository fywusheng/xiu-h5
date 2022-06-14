<!--
 * @Description: 地点详情地图
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-03 14:53:00
-->
<template>
  <div>
    <el-amap
      class="amap-box"
      ref="map"
      vid="amapVue"
      :amap-manager="amapManager"
      :plugin="plugin"
      :zoom="state.zoom"
      :center="state.center"
      :events="events"
      mapStyle="normal"
    >
      <el-amap-marker
        v-for="(item, index) in state.markers"
        :position="item.position"
        :icon="item.icon"
        :events="item.events"
        :key="index"
      ></el-amap-marker>
      <el-amap-info-window
        v-if="state.infoWin.length > 0"
        :position="state.infoWin[0].position"
        :content="state.infoWin[0].content"
        :visible="state.infoWin[0].visible"
        :autoMove="false"
        :offset="[10, -25]"
      >
      </el-amap-info-window>
    </el-amap>
  </div>
</template>

<script>
import Vue from "vue"
import VueAMap, { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap"
Vue.use(VueAMap)

const amapManager = new AMapManager()
localStorage.removeItem("_AMap_raster")

VueAMap.initAMapApiLoader({
  key: "6a9f338fbaee119e05d8f0fdeece9979", // 老龄委项目高德地图key
  plugin: [
    "AMap.Geocoder", // 点击地图获取经纬度和具体地址
    "AMap.Autocomplete", // 输入提示插件，POI搜索插件
    "AMap.PlaceSearch", // 地点搜索服务,提供了关键字搜索、周边搜索、范围内搜索等功能
    "AMap.Scale", // 比例尺，显示当前地图中心的比例尺
    "AMap.OverView", // 地图鹰眼插件 地图缩略图 
    "AMap.ToolBar", // 地图工具条
    "AMap.CitySearch", // 城市获取服务，获取用户所在城市信息或根据给定IP参数查询城市信息
    "AMap.Geolocation", // 定位，提供了获取用户当前准确位置、所在城市
    "AMap.Weather", // 天气预报插件，用于获取未来的天气信息
    "AMap.Marker",
    "AMap.Icon",
    "AMap.GeometryUtil",
    "AMap.InfoWindow",
    "AMap.Pixel",
    "AMap.Driving", // 驾车路线规划
    "AMap.Walking", // 步行路线规划
    "AMap.Transfer", // 公交路线规划
    "AMap.Riding" // 骑行路线规划
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: "1.4.4",
  uiVersion: "1.0.11" // 版本号
})
import AmapApi from "../../model/amap-api"
import Markers from "../../controller/markers"

const amapApi = new AmapApi()
export default {
  name: "mapOfComponents",
  props: {
    isSearch: {
      type: Boolean,
      default: false
    },
    isNavigate: {
      type: Boolean,
      default: false
    }
  },
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
          lazyAMapApiLoaderInstance.load().then(res => {
            this.getCurPos()
          })
        },
        dragend: (e) => {
          if (!this.isSearch) {
            const center = this.$refs.map.$$getCenter()
            this.$store.dispatch("map/setDynamicPos", { lng: center[0], lat: center[1] })
            this.handleDragend(center)
          }
        }
      },
      plugin: [] // 地图插件配置
    }
  },
  mounted() {
    this.$Loading.show()
  },
  methods: {
    async init(center) {
      const fn = this.onClickMarker
      const marks = new Markers()
      const markers = await marks["allMarker"](fn)
      if (markers.length === 0) {
        this.$toast("该区域无结果，换个位置试试吧")
        return false
      }
      const current = this.state.markers[0]
      const tempMarkers = [current, ...markers]
      this.setMarkers(tempMarkers)
    },
    /**
     * @description 拖拽地图，展示分类标记
     * @param classification 当前分类
     */
    async handleDragend() {
      const classification = this.$store.getters.classification.type
      const fn = this.onClickMarker
      const marks = new Markers()
      const markers = await marks[classification](fn)
      if (markers.length === 0) {
        this.$toast("该区域无结果，换个位置试试吧")
        return false
      }
      this.setMarkers(markers)
    },
    /**
     * @description：点击标记点
     * @param val：当前标记点详情
     */
    async onClickMarker(val) {
      const infoObj = {}
      this.state.infoWin = []
      this.$nextTick(() => {
        infoObj.position = [val.position[0], val.position[1]]
        infoObj.content = `<p>${val.name}</p>`
        infoObj.visible = true
        this.state.infoWin.push(infoObj)
      })
      this.$emit("clickMarker", val)
    },
    // 刷新获取当前定位
    async getCurPos() {
      // 存储地图实例
      this.$store.dispatch("map/setAmapManager", this.amapManager)
      //  根据定位获取当前城市信息
      const { city, citycode: cityCode, lng, lat } = await amapApi.getLocalCity()
      this.$store.dispatch("map/setCurPos", { city, cityCode, lng, lat })
      this.$store.dispatch("map/setDynamicPos", { lng, lat })
      this.setCurrentPosition([lng, lat])
      this.init({ lng, lat })
    },
    // 显示当前位置
    setCurrentPosition(position, zoom) {
      if (zoom) {
        this.state.zoom = zoom
      }
      this.state.center = position
      this.state.addressComponent = Object.assign(this.state.addressComponent, { position })
      this.$Loading.hide()
      // 单个标点
      this.state.markers[0] = {
        position: position,
        offset: "0 0",
        icon: require("@/assets/svg/map/icon-point.svg") // 图标
      }
    },
    /**
     * @description: 设置坐标点
     * @param markers: 标记点数据
     */
    setMarkers(markers, isSearch) {
      this.state.markers = []
      if (isSearch) {
        this.state.center = markers[0].position
      }
      this.$nextTick(() => {
        this.state.markers = markers
        this.$refs.map.$$getInstance().setFitView()
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
</style>
