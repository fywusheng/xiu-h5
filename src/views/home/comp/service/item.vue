<!--
 * @Description: 惠老服务列表item
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-16 15:16:37
-->
<template>
  <div class="service-item">
    <div class="left">
      <p class="picture">
        <img :src="photo" />
      </p>
    </div>
    <div class="right">
      <div @click="goDetail" class="tit">
        {{ state.social_service_name }}
      </div>
      <div class="addr overflow">
        <svg-icon icon-class="home-location" />
        <span>{{ state.social_service_addr }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      state: {},
      photo: "",
      orgOfficeId: ""
    }
  },
  watch: {
    item: {
      immediate: true,
      handler(newValue) {
        this.orgOfficeId = newValue.orgOfficeId
        const tempState = JSON.parse(
          newValue.orgOfficeInfoDetail.replace(/[\n\r]/g, "")
        )
        this.state = tempState
        this.photo = tempState.social_service_photos.split(",")[0]
      }
    }
  },
  methods: {
    goDetail() {
      this.$router.push({
        path: `service/detail/${encodeURIComponent(this.orgOfficeId)}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
.service-item {
  display: flex;
  // justify-content: space-around;
  padding-top: 12px * @ratio;
  padding-bottom: 12px * @ratio;
  margin-left: 12px * @ratio;
  margin-right: 12px * @ratio;
  border-bottom: 1px * @ratio solid #eeeeee;
  .left {
    // background-color: #666666;
    .picture {
      width: 107px * @ratio;
      height: 88px * @ratio;
      border-radius: 8px * @ratio;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .text {
      height: 25px * @ratio;
      background: rgba(0, 0, 0, 0.6);
    }
  }
  .right {
    width: 203px * @ratio;
    margin-left: 10px * @ratio;
    .tit {
      font-size: 20px * @ratio;
      font-weight: 500;
      color: #333333;
      line-height: 25px * @ratio;
      height: 2.5em;
      margin-bottom: 12px * @ratio;
      overflow: hidden;
    }
    .addr {
      font-size: 18px * @ratio;
      font-weight: 400;
      color: #666666;
      line-height: 25px * @ratio;
    }
  }
}
.overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>