<!--
 * @Description: 详情模板
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-27 10:41:26
-->
<template>
  <div class="page">
    <div class="header">
      <p class="title">{{ state.social_service_name }}</p>
      <p class="addr">{{ state.social_service_addr }}</p>
      <div class="area">
        <span class="normal-text">服务区域：</span><span>{{ state.social_service_area }}</span>
      </div>
      <div class="contacts normal-text">
        联系人：{{ state.social_service_contacts }}
      </div>
    </div>
    <!-- 图片轮播 -->
    <van-swipe :autoplay="3000" indicator-color="white" class="swipe-content">
      <van-swipe-item v-for="(item, index) in photos" :key="index">
        <img :src="item" class="item-img" @click="showGallery = true" />
      </van-swipe-item>
    </van-swipe>
    <!-- <div class="service-description">
      <div v-html="state.social_service_intro" class="content normal-text"></div>
    </div> -->
    <expand-text class="expand-text" id="exp2" title="" :article="state.social_service_intro" />
    <div class="bar">
      <p @click="onNavigation" class="btn">
        <svg-icon icon-class="route" /> 路线
      </p>
      <p @click="callPhone" class="btn">
        <svg-icon icon-class="phone-orange" /> 电话
      </p>
    </div>
    <van-action-sheet v-model="sheetState.show" :actions="sheetState.actions" cancel-text="取消" description="请选择拨打电话" close-on-click-action />
    <galleryList v-show="showGallery" :list="photos" @hideGallery="hideGallery" class="gallery-content"></galleryList>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Overlay } from "@ylz/vant"
import { serviceApi } from "@/api"
import galleryList from "./gallery-list"
import expandText from "../expand-text"
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Overlay.name]: Overlay,
    galleryList,
    expandText
  },
  data() {
    return {
      orid: "",
      showGallery: false,
      photos: [],
      state: {},
      sheetState: {
        show: false,
        callPhone: [],
        actions: []
      }
    }
  },
  created() {
    this.orid = this.$route.params && this.$route.params.id
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const { data } = await serviceApi.getOfficeInfoById({
        orgOfficeId: this.orid
      })
    const tempState = data.orgOfficeInfoDetail.replace(/[\n\r]/g, "")
      this.state = JSON.parse(tempState)
     
      this.sheetState.callPhone =
        this.state.social_service_tel.indexOf(";") !== -1
          ? this.state.social_service_tel.split(";")
          : this.state.social_service_tel.split(",")
      this.photos = this.state.social_service_photos.split(",")
    },
    /**
     * @description 路线导航
     * @param {string} orgOfficeLon 终点经度
     * @param {string} orgOfficeLat 终点纬度
     * @param {string} orgOfficeName 终点名称
     */
    onNavigation() {
      this.$store.dispatch("map/setEndPos", {
        orgOfficeLon: this.state.social_service_lon,
        orgOfficeLat: this.state.social_service_lat,
        orgOfficeName: this.state.social_service_name
      })
      this.$router.push({ path: "/map/navigation/index" })
    },
    callPhone() {
      const temp = []
      this.sheetState.show = true
      this.sheetState.callPhone.forEach((item) => {
        temp.push({ name: item })
      })
      this.sheetState.actions = temp
    },
    hideGallery() {
      this.showGallery = false
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  padding-top: 14px * @ratio;
  padding-bottom: 100px * @ratio;
  background-color: #fff;
  .header {
    margin: 0 16px * @ratio;
    .title {
      font-size: 22px * @ratio;
      font-weight: 500;
      color: #333333;
      // line-height: 30px * @ratio;
      font-family: PingFangSC-Medium, PingFang SC;
    }
    .addr {
      font-size: 18px * @ratio;
      font-weight: 400;
      color: #999999 !important;
      margin: 8px * @ratio 0px * @ratio;
    }
    .area {
      margin-bottom: 8px * @ratio;
      span {
        font-size: 18px * @ratio;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
      }
    }
    .contacts {
      font-size: 18px * @ratio;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      margin-bottom: 12px * @ratio;
    }
  }
  .service-description {
    padding: 14px * @ratio 16px * @ratio 0px * @ratio;
    border-top: 8px * @ratio solid #f2f2f2;
  }
  .expand-text {
    margin-bottom: 100px * @ratio;
    font-size:18px !important;
  }
  .normal-text {
    font-size: 18px * @ratio;
    font-weight: 500;
    color: #333333;
    line-height: 25px * @ratio;
  }
  .swipe-content {
    width: 350px * @ratio;
    height: 184px * @ratio;
    margin: 0 auto;
    margin-bottom: 16px * @ratio;
    border-radius: 8px * @ratio;
    .item-img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .bar {
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #ffffff;
    border-top: 8px * @ratio solid #f2f2f2;
    padding-top: 8px * @ratio;
    padding-bottom: 20px * @ratio;
    .btn {
      width: 164px * @ratio;
      height: 54px * @ratio;
      line-height: 54px * @ratio;
      background: #ffffff;
      border-radius: 27px * @ratio;
      border: 1px * @ratio solid #ff5500;
      font-size: 22px * @ratio;
      font-weight: 500;
      color: #ff5500;
      text-align: center;
    }
  }
  .gallery-content {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }
}
/deep/ .van-action-sheet__description {
  color: #333 !important;
  line-height: 30px * @ratio;
  font-size: 24px * @ratio !important;
  background-color: #fff !important;
  text-align: center !important;
}
/deep/ .van-swipe__indicators {
  display: none;
}
</style>