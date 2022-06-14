<!--
 * @Description: 地点详情页-景区
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-04 09:52:20
-->
<template>
  <div>
    <div v-show="!showMap" class="page">
      <div class="header-info">
        <p class="title">{{ state.scenic_area_name }}</p>
        <rate-price :score="state.scenic_area_score" :price="state.scenic_area_price"></rate-price>
        <addr-distance :distance="state.distance" :addr="state.orgOfficeAddrDetail" />
        <p class="labels">
          <span class="item">{{ state.scenic_area_rank }}</span>
        </p>
        <p class="bar">
          <span @click="getPos" class="item">
            <van-icon name="location" />位置
          </span>
          <span @click="callPhone" class="item">
            <van-icon name="phone" />电话
          </span>
        </p>
        <div class="gallery">
          <van-swipe :show-indicators="false" :loop="false">
            <van-swipe-item v-for="(item, index) in state.scenic_area_photos" :key="index" @click="gotoGalleryList(state.scenic_area_photos)" class="item">
              <img :src="item" />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <expand-text id="exp1" title="景点介绍" :article="state.scenic_area_intro" />
      <section>
        <p class="tit">开放时间</p>
        <div class="text">
          <p>{{ state.scenic_area_opentime }}</p>
        </div>
      </section>
      <section>
        <p class="tit">优待政策</p>
        <div class="text">
          {{ state.scenic_area_policies }}
        </div>
      </section>
      <expand-text id="exp2" title="服务设施" :article="state.scenic_area_facility" />
      <toolbar :item="itemData" :name="state.orgOfficeName" :id="state.orgOfficeId" />
    </div>
    <!-- 地图 -->
    <div v-show="showMap">
      <div class="searcch-cont">
        <div class="search-bar">
          <van-search v-model="state.orgOfficeName" placeholder="搜索地点、美食、景点..." show-action>
            <template #action>
              <div class="search-button">
                <span style="color: #c9c9c9">|</span>
                <svg-icon icon-class="voice" class-name="custom-class" />
              </div>
            </template>
          </van-search>
        </div>
      </div>
      <comp-map ref="amap" />
      <div class="container-summary">
        <summary-info :item="itemData" class="detail-popup"></summary-info>
      </div>
    </div>
    <van-action-sheet v-model="sheetState.show" :actions="sheetState.actions" cancel-text="取消" description="请选择拨打电话" close-on-click-action />
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "@ylz/vant"
import ratePrice from "./comp/rate-price"
import addrDistance from "./comp/addr-distance"
import expandText from "./comp/expand-text"
import toolbar from "./comp/toolbar"
import compMap from "../amap"
import summaryInfo from "./summary"

import Markers from "../../../controller/markers"
export default {
  name: "scenicDetails",
  components: {
    compMap,
    summaryInfo,
    ratePrice,
    addrDistance,
    expandText,
    toolbar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      orgOfficeId: "",
      showMap: false, // 是否展示地图
      state: {},
      sheetState: {
        show: false,
        callPhone: [],
        actions: []
      },
      itemData: {},
      statePos: {
        lng: "",
        lat: ""
      }
    }
  },
  created() {
    this.flag = this.$route.query && this.$route.query.isShare
  },
  watch: {
    $route: {
      handler() {
        this.orgOfficeId = this.$route.params && this.$route.params.orgOfficeId
        this.getDetail()
      },
      immediate: true
    }
  },
  methods: {
    async getDetail() {
      const markers = new Markers()
      const ret = await markers.getMarkSummaryInfo(this.orgOfficeId, false)
      this.itemData = ret
      const {
        orgOfficeAddrDetail,
        orgOfficeTel,
        orgOfficeInfoDetail,
        orgOfficeLon,
        orgOfficeLat,
        orgOfficeName,
        distance,
        orgOfficeId
      } = ret
      const tempState = orgOfficeInfoDetail.replace(/[\n\r]/g, "")
      this.state = JSON.parse(tempState)

      this.state.orgOfficeAddrDetail = orgOfficeAddrDetail
      this.state.orgOfficeName = orgOfficeName
      this.state.distance = distance
      console.log(
        "🚀 ~ file: scenic.vue ~ line 167 ~ getDetail ~ this.state.distance",
        this.state.distance
      )
      this.state.orgOfficeId = orgOfficeId
      console.log("123", this.state)
      if (this.state.scenic_area_photos !== "") {
        this.state.scenic_area_photos = this.state.scenic_area_photos.split(",")
      }

      this.statePos.lng = orgOfficeLon
      this.statePos.lat = orgOfficeLat
      this.sheetState.callPhone =
        orgOfficeTel.indexOf(";") !== -1
          ? orgOfficeTel.split(";")
          : orgOfficeTel.split(",")
    },
    callPhone() {
      const temp = []
      this.sheetState.show = true
      this.sheetState.callPhone.forEach((item) => {
        temp.push({ name: item })
      })
      this.sheetState.actions = temp
    },
    async getPos() {
      const markers = new Markers()
      const item = await markers.getMarkSummaryInfo(this.orgOfficeId, false)
      const ret = await markers.setSingleMark(item)
      this.$refs.amap.setMarkers(ret)
      this.showMap = true
      console.log(this.itemData)
    },
    gotoGalleryList() {
      this.$router.push({ path: `../gallery-list/${this.orgOfficeId}` })
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  padding-bottom: 120px * @ratio;
  .header-info {
    padding: 14px * @ratio 15px * @ratio 12px * @ratio;
    .title {
      font-size: 22px * @ratio;
      line-height: 30px * @ratio;
      margin-bottom: 14px * @ratio;
      color: #333333;
    }
    .labels {
      margin-bottom: 12px * @ratio;
      .item {
        color: #fff;
        background: #ff5500;
        display: inline-block;
        border-radius: 2px * @ratio;
        padding: 2px * @ratio 8px * @ratio;
      }
    }
    .bar {
      margin-bottom: 24px * @ratio;
      .item {
        padding: 4px * @ratio 12px * @ratio;
        background: #ffffff;
        border-radius: 17px * @ratio;
        border: 1px * @ratio solid #eeeeee;
        margin-right: 10px * @ratio;
        font-size: 18px * @ratio;
        line-height: 25px * @ratio;
        color: #999999;
        /deep/ .van-icon {
          font-size: 20px * @ratio;
          vertical-align: middle;
          margin-right: 4px * @ratio;
          color: #457de6;
        }
      }
    }
    .status {
      margin-bottom: 14px * @ratio;
      .label {
        display: inline-block;
        padding: 2px * @ratio 8px * @ratio;
        background: rgba(18, 179, 98, 0.2);
        border-radius: 2px * @ratio;
        color: #12b362;
        line-height: 16px * @ratio;
        font-size: 16px * @ratio;
        margin-right: 11px * @ratio;
      }
    }
    .gallery {
      width: 343px * @ratio;
      overflow: scroll;
      .item {
        width: 319px * @ratio;
        height: 184px * @ratio;
        border-radius: 7px * @ratio;
        margin-right: 11px;
        vertical-align: sub;
        background-color: #000;
        overflow: hidden;
        img {
          width: 100%;
          display: block;
        }
      }
    }
  }
  section {
    padding: 14px * @ratio 15px * @ratio 12px * @ratio;
    border-bottom: solid #f2f2f2 8px * @ratio;
    .tit {
      font-size: 20px * @ratio;
      line-height: 28px * @ratio;
      margin-bottom: 12px * @ratio;
      color: #333;
    }
    .text {
      font-size: 18px * @ratio;
      line-height: 25px * @ratio;
      color: #333333;
    }
  }
  .searcch-cont {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 199;
    background: #fff;
    padding: 10px * @ratio 0;
    .search-bar {
      margin: 0 16px * @ratio;
      box-shadow: 0px 1px 8px * @ratio 0px rgba(223, 213, 206, 0.54);
      overflow: hidden;
      border-radius: 24px * @ratio;
      border: 1px solid #ff5000;
      .message {
        font-size: 24px * @ratio;
      }
      .van-search__action {
        line-height: inherit;
      }
      .icon {
        font-size: 24px * @ratio;
        color: @second_text_color;
      }
    }
    /deep/ .van-search__content {
      background: none;
    }
  }
}
/deep/ .van-action-sheet__description {
  color: #333 !important;
  line-height: 30px * @ratio;
  font-size: 24px * @ratio !important;
  background-color: #fff !important;
  text-align: center !important;
}
.container-summary {
  position: fixed;
  width: 100%;
  background: #fff;
  bottom: 0;
  transition: all 0.5s ease-in 0.3s;
  .detail-popup {
    width: 100%;
    box-shadow: 0px -2px * @ratio 3px * @ratio 0px rgba(0, 0, 0, 0.08);
    border-radius: 12px * @ratio;
    padding: 9px * @ratio;
  }
}
</style>