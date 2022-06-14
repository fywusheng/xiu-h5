<!--
 * @Description: 路线导航首页
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-05-29 14:05:17
-->
<template>
  <div class="page">
    <section class="navigation">
      <!-- 搜索定位模块 -->
      <div v-show="!state.showMap" class="search-content">
        <div class="search-bar">
          <van-search
            v-model="state.keyword"
            placeholder="搜索地点、美食、景点..."
            show-action
            @input="realTimeSearch"
          >
            <template #action>
              <div @click="cancleSearch" class="search-button">取消</div>
            </template>
          </van-search>
        </div>
        <!-- 搜索结果 -->
        <div v-show="state.keyword.length > 0" class="search-result-container">
          <search-result
            :history-state="historyState"
            :keyword="state.keyword"
            :search-result="searchResult"
            @searchItem="setRouteBysearch"
          />
        </div>
        <!-- 历史搜索记录 -->
        <div
          v-show="historyState.length > 0 && state.keyword.length === 0"
          class="history"
        >
          <history
            :historyState="historyState"
            @setCurPos="setRouteBysearch"
            @historyItem="setRouteBysearch"
          />
        </div>
      </div>
      <!-- 绘制路线模块 -->
      <div v-show="state.showMap" class="draw-content">
        <div class="top">
          <div class="text">
            <p class="posText">
              <van-field
                v-model="posMap[0]['v']"
                :readonly="posMap[0]['disabled']"
                :disabled="posMap[0]['disabled']"
                @click="changePos(posMap[0]['disabled'],'start')"
                :class="state.initStatus === 'start' ? 'active' : ''"
                placeholder="起始位置"
              />
            </p>
            <p class="posText">
              <van-field
                v-model="posMap[1]['v']"
                @click="changePos(posMap[1]['disabled'],'end')"
                :class="state.initStatus === 'end' ? 'active' : ''"
                :readonly="posMap[1]['disabled']"
                :disabled="posMap[1]['disabled']"
                placeholder="结束位置"
              />
            </p>
          </div>
          <div class="reverse"><van-icon name="sort" @click="reverse" /></div>
        </div>
        <!-- 出行方式 -->
        <div class="travelMode">
          <dl
            v-for="(item, index) in modeList"
            :key="index"
            @click="drawRoute(index)"
            :class="state.active === item.type ? 'active' : ''"
            class="mode"
          >
            <dt>
              <img
                v-show="state.active === item.type"
                :src="getIcon(item.type)"
              />{{ item.name }}
            </dt>
            <dd>{{ item.time | parseTime }}</dd>
          </dl>
        </div>
        <!-- 地图 -->
        <comp-map ref="amap" @emitAmap="confirmAmap"  />
        <transfer-list
          v-show="state.showTransferList"
          :plans="transferState.list"
          @drawPath="drawRouteByTransfer"
          class="transfer-list"
        ></transfer-list>
        <transfer-detail
          v-show="state.showTransferDeatail"
          :plans="transferState.newData"
          class="transfer-detail"
        ></transfer-detail>
        <jump-app
          id="jumpApp"
          :distance="state.distance"
          :time="state.time"
          :modeType="state.active"
          @jump="jump"
        ></jump-app>
      </div>
    </section>
  </div>
</template>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.4&key=6a9f338fbaee119e05d8f0fdeece9979&plugin=AMap.Driving,AMap.Walking"></script> 
<script>
import compMap from "./amap"
import CompleteApi from "../../model/merge-data"
import DrawPath from "../../controller/drawPath"
import history from "./components/history"
import searchResult from "./components/search-result"
import transferList from "../navigation/components/transfer-list"
import transferDetail from "../navigation/components/transfer-detail"
import jumpApp from "./components/jump-app"
import { setTimeout } from 'timers';

const completeApi = new CompleteApi()
export default {
  name: "navigationIndex",
  components: {
    compMap,
    transferList,
    transferDetail,
    searchResult,
    history,
    jumpApp
  },
  data() {
    return {
      position:'',//start end
      posMap:[],
      showFlag:false,
      drawPath: null,
      routeDistance: 0,
      state: {
        showMap: true,
        showResult: false,
        showTransferList: false, // 公交信息列表
        active: "driving",
        keyword: "",
        startPos: {
          name: "我的位置",
          orgOfficeLon: this.$store.getters.curPos.lat || 0,
          orgOfficeLat: this.$store.getters.curPos.lon || 0,
          active: true
        },
        endPos: {
          name: "",
          orgOfficeLon: 0,
          orgOfficeLat: 0,
          active: false
        },
        initStatus: "end",
        distance: "0公里",
        time: 0,
        position: {}
      },
      transferState: {
        list: [],
        newData: {},
        index: 0
      },
      historyState: [],
      searchResult: [],
      modeList: [
        {
          type: "driving",
          name: "驾车",
          time: 0,
          distance: 0,
          routeMap: []
        },
        {
          type: "transfer",
          name: "公交",
          time: 0,
          distance: 0,
          routeMap: []
        },
        {
          type: "riding",
          name: "骑行",
          time: 0,
          distance: 0,
          routeMap: []
        },
        {
          type: "walking",
          name: "步行",
          time: 0,
          distance: 0,
          routeMap: []
        }
      ]
    }
  },
  created() {
    if (localStorage.getItem("navhistory")) {
      this.historyState = JSON.parse(localStorage.getItem("navhistory"))
    }
    const { end } = this.$store.getters.navPos
    // if (end.name) {
    //   this.state.endPos.name = end.name
    //   this.state.initStatus = "start"
    // } else {
    //   this.state.initStatus = "end"
    // }
    if(end.name){
      this.state.initStatus = "start"
      this.posMap = [
        {v:this.state.startPos.name,disabled:false,lon:this.$store.getters.curPos.lng,lat:this.$store.getters.curPos.lat},
        {v:end.name,disabled:true,lon:end.lng,lat:end.lat}
      ]
    }else{
      this.state.initStatus = "end"
      this.posMap = [
        {v:this.state.startPos.name,disabled:false,lon:this.$store.getters.curPos.lng,lat:this.$store.getters.curPos.lat},
        {v:end.name,disabled:false,lon:end.lng,lat:end.lat}
      ]
    }
     
    console.log("===startPos--",this.$store.getters.curPos)
    console.log("===end初始化出来的值处理han---",end)
  },
  mounted() {
    this.timer = null
  },
  methods: {
    jump(val){
     
      console.log("====点击了打开高德地图---")
       this.modeList.forEach((item, index) => {
        this.getRouteData(item.type, index)
      })
    },
    /**
     * @description 导航位置实时搜索
     * @param keyword 关键字
     */
    realTimeSearch(val) {
      clearTimeout(this.timer)
      const { hasText, len } = this.getByteLen(val)
      if (hasText && len > 64) {
        this.$toast("中文字数不能超过32个")
        this.state.keyword = val.substring(0, 32)
        return false
      }
      this.timer = setTimeout(async() => {
        this.searchResult = await completeApi.getKeywordSearchResult(val)
        this.state.showResult = true
      }, 350)
       console.log("====此时进行查询位置的关键字---",val)
    },
    // 从标记点概要跳转，显示地图路径
    async init() {
      this.routeDistance = await this.drawPath.init()
      this.modeList.forEach((item, index) => {
        this.getRouteData(item.type, index)
      })
    },
    /**
     * @description 获取路线数据
     * @param type 类型
     * @param index 索引
     */
    async getRouteData(type, index = 0) {
      const { result, time, distance } = await this.drawPath[type]()
      console.log("drawPath fff=====",type, index)
      console.log({ result, time, distance })
    //  debugger
      this.modeList[index].time = time || 0
      this.modeList[index].distance = distance || 0
      this.modeList[index].routeMap = result.routes || result.plans || []
      
      if (this.routeDistance > 1000) {
        this.drawRoute(1)
      } else {
        this.drawRoute(index)
      }
    },
    changePos(tag,position) {
      console.log("====可以点击",tag)
      // if (this.state.initStatus !== tag) {
      //   return false
      // }
      if(!tag){
       this.state.showMap = false
      }
      this.position = position
    },
    /**
     * @description 根据搜索结果绘制导航路线
     */
    setRouteBysearch(item) {
      console.log("===han开始重新绘制---",item)
      // this.posMap.filter((v,k,array)=>{
      //   if(v['disabled'] === false){
      //     array[k]['v'] = item['orgOfficeName']
      //     array[k]['lon'] = item['orgOfficeLon']
      //     array[k]['lat'] = item['orgOfficeLat']
      //   }
      // })
      console.log("===当前去搜索的位置han---",this.position)
      if(this.position === "start"){
        this.posMap[0]['v'] = item['orgOfficeName']
        this.posMap[0]['lon'] = item['orgOfficeLon']
        this.posMap[0]['lat'] = item['orgOfficeLat']
        this.drawPath.setStartPos({
          startPos: { lon: item.orgOfficeLon, lat: item.orgOfficeLat }
        })
      }else{
        this.posMap[1]['v'] = item['orgOfficeName']
        this.posMap[1]['lon'] = item['orgOfficeLon']
        this.posMap[1]['lat'] = item['orgOfficeLat']
        this.drawPath.setEndPos({ lng: item.orgOfficeLon, lat: item.orgOfficeLat })
      }
      // if (this.state.initStatus === "start") {
      //   this.state.startPos.name = item.orgOfficeName
      //   this.drawPath.setStartPos({
      //     startPos: { lon: item.orgOfficeLon, lat: item.orgOfficeLat }
      //   })
      // } 
      // else {
      //   this.state.endPos.name = item.orgOfficeName
      //   this.drawPath.setEndPos({
      //     endPos: { lon: item.orgOfficeLon, lat: item.orgOfficeLat }
      //   })
      // }
      this.state.showMap = true
      this.modeList.forEach((item, index) => {
        this.getRouteData(item.type, index)
      })
    },
    // 驾车、骑行、步行绘制路线
    drawRoute(index) {
      this.state.showTransferList = false
      const item = this.modeList[index]
      if (item.routeMap.length === 0) {
        return false
      }
      this.state.active = item.type
      this.state.time = item.time
      console.log("---当前点击的类型han---",item.type,index)
      sessionStorage.setItem('way',JSON.stringify({type:item.type,index:index}))
      this.state.distance = this.parseDistance(item.distance)
      if (index !== 1) {
        this.state.showTransferDeatail = false
        const route = item.routeMap[0]
        const key = item.type === "riding" ? "rides" : "steps"
        this.drawPath.drawRoute(route, key)
      } else {
console.log("====公交路线list有数据了---", item.routeMap)
        this.state.showTransferList = true
        this.transferState.list = item.routeMap
      }
    },
    // 绘制公交路线
    drawRouteByTransfer(route) {
      this.transferState.newData = route
      this.state.showTransferList = false
      this.state.showTransferDeatail = true
    },
    // 倒序
    reverse() {
      // const { start, end } = { start: this.state.endPos.name, end: this.state.startPos.name }
      // this.state.startPos.name = start
      // this.state.endPos.name = end
      this.posMap.reverse();
      console.log("===换位置---",this.posMap)
       this.drawPath.setStartPos({
          startPos: { lon: this.posMap[0]['lon'], lat: this.posMap[0]['lat'] }
       })
       this.drawPath.setEndPos( { lng: this.posMap[1]['lon'], lat: this.posMap[1]['lat'] })
       const way = sessionStorage.getItem('way')
       const wayObject = JSON.parse(way)
      // this.modeList[wayObject.index]
       this.getRouteData(wayObject.type,wayObject.index)
      //  this.modeList.forEach((item, index) => {
      //   this.getRouteData(item.type, index)
      // })
    },
    cancleSearch() {
      this.state.showMap = true
      this.state.showResult = false
      this.state.keyword = ""
      this.searchResult = []
    },
    getIcon(type) {
      let path = ""
      if (type === "driving") {
        path = require("@/assets/svg/map/icon-driving.svg")
      }
      if (type === "transfer") {
        path = require("@/assets/svg/map/icon-transfer.svg")
      }
      if (type === "riding") {
        path = require("@/assets/svg/map/icon-riding.svg")
      }
      if (type === "walking") {
        path = require("@/assets/svg/map/icon-walking.svg")
      }
      return path
    },
    // 获取字符长度
    getByteLen(val) {
      let hasText = false
      let len = 0
      for (let i = 0; i < val.length; i++) {
        const a = val.charAt(i)
        // /[^\x00-\xff]/ig
        if (a.match(/[^x00-\xff]/ig) != null) {
          hasText = true
          len += 2
        } else {
          len += 1
        }
      }
      return { hasText, len }
    },
    parseDistance(val) {
      if (val) {
        return val > 1000 ? (val / 1000).toFixed(2) + "公里" : parseInt(val) + "米"
      }
      return `${val}米`
    },
    confirmAmap() {
      this.showFlag = true;
      this.drawPath = new DrawPath(this.$refs.amap.amapManager)
      this.init()
    }
  },
  filters: {
    parseTime(val) {
      if (!val) {
        return "暂无"
      }
      if (val > 60) {
        const hourse = parseInt(val / 60)
        const min = val % 60
        return `${hourse}小时${min}分钟`
      }
      return `${val}分钟`
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  min-height: 100vh;
  background-color: #f5f5f5;
}
.navigation {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  .search-content {
    .search-bar {
      box-shadow: 0px 1px * @ratio 8px * @ratio 0px rgba(223, 213, 206, 0.54);
      border: 1px * @ratio solid #ececec;
      /deep/.van-search__content {
        border: 1px solid #ff5000;
        border-radius: 24px * @ratio;
      }
      /deep/ .van-search__content {
        background: none;
      }
    }
    .icon {
      width: 8px * @ratio;
      height: 8px * @ratio;
      background: #000;
    }
    .history {
      width: 344px * @ratio;
      margin: 0 auto;
    }
    .search-result-container {
      margin-top: 8px * @ratio;
    }
  }
  .draw-content {
    padding-top: 8px * @ratio;
    background: #fff;
    .top {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .text {
        width: 280px * @ratio;
        font-size: 18px * @ratio;
        background: url("~@/assets/imgs/map/icon-navigation.png") left center
          no-repeat;
        background-size: auto 60%;
        padding-left: 20px * @ratio;
        .posText {
          background-color: #fff;
          border-radius: 8px * @ratio;
          margin-bottom: 5px * @ratio;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          .active {
            background-color: #eee;
          }
        }
      }
      .reverse {
        font-size: 20px * @ratio;
      }
    }
    .travelMode {
      margin-top: 3px * @ratio;
      display: flex;
      justify-content: space-around;
      .mode {
        color: #999;
        text-align: center;
        dt {
          font-size: 20px * @ratio;
          line-height: 28px * @ratio;
          text-align: center;
        }
        dd {
          font-size: 12px * @ratio;
          line-height: 25px * @ratio;
        }
        &.active {
          color: #ff5000;
          dd {
            color: #333;
            width: 100%;
            border-radius: 3px * @ratio;
            border-bottom: 5px * @ratio solid #ff8800;
            // border-image: linear-gradient(135deg, #ff8800 0%, #ff5000 100%);
          }
        }
      }
    }
  }
  .transfer-list {
    width: 100%;
    height: 77.5%;
    position: fixed;
    top: 26%;
    z-index: 399;
  }
  .transfer-detail {
    width: 100%;
    height: 67%;
    padding:4px * @ratio 17px * @ratio 17px * @ratio 17px * @ratio;
    position: fixed;
    z-index: 399;
    padding-bottom: 22px * @ratio;
    box-shadow: 0px * @ratio 0px * @ratio 10px * @ratio 0px * @ratio rgba(204 200 197 / 27%);
    border-radius: 24px * @ratio 24px * @ratio 0 0;
  }
}
</style>