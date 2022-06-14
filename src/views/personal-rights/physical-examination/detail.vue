<!--
 * @Description: 体检详情
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-25 17:05:52
-->
<template>
  <div class="page">
    <div class="header-info">
      <p class="title">{{ state.hospital_name }}</p>
      <p>性质：{{ state.hospital_nature }}</p>
      <p>特色科室：{{ state.hospital_clinic }}</p>
      <addr-distance distance="3.5公里" addr="朝阳公园南路1号" />
      <p class="labels">
        <span class="item">{{ state.hospital_level }}</span>
      </p>
      <p class="bar">
        <span class="item"><van-icon name="location" />位置</span>
        <span class="item"><van-icon name="phone" />电话</span>
      </p>
      <div class="gallery">
        <van-swipe :show-indicators="false" :loop="false">
          <van-swipe-item
            v-for="(item, index) in state.scenic_area_photos"
            :key="index"
            class="item"
          >
            <img :src="item" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <expand-text title="医院简介" :article="state.hospital_intro" />
    <section>
      <p>创建时间：{{ state.hospital_create_time }}</p>
      <p>职工人数：{{ state.hospital_workers }}</p>
      <p>床位数量：{{ state.hospital_bed }}</p>
      <p>科室数目：{{ state.hospital_clinic_numbers }}</p>
      <p>特色科室：{{ state.hospital_clinic }}</p>
      <p>网址：{{ state.hospital_website }}</p>
    </section>
    <toolbar />
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "@ylz/vant"
import { mapApi } from "@/api"
import addrDistance from "@/views/map/pages/detail/place/comp/addr-distance.vue"
import expandText from "@/views/map/pages/detail/place/comp/expand-text"
import toolbar from "@/views/map/pages/detail/place/comp/toolbar"
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    addrDistance,
    expandText,
    toolbar
  },
  data() {
    return {
      state: {}
    }
  },
  created() {
    this.getDeatil()
  },
  methods: {
    async getDeatil() {
      const { data: res } = await mapApi.getEcOrgOfficeInfoById({
        orgOfficeId: "dbf6be2894f04630b1255f8b4c5f0ccc"
      }, {
        authorization: "ec_token"
      })

      const tempState = res.orgOfficeInfoDetail.replace(/[\n\r]/g, "")
      this.state = JSON.parse(tempState)
      console.log("res", this.state)
    }
  }
}
</script>

<style lang="less" scoped>
.page {
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
      li {
        display: inline-block;
        width: 319px * @ratio;
        height: 184px * @ratio;
        border-radius: 7px * @ratio;
        margin-right: 11px * @ratio;
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
}
</style>