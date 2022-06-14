<!--
 * @Description: 地点实景图列表
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-05-27 15:23:48
-->
<template>
  <div class="page">
    <ul class="list">
      <li
        v-for="(item, index) in galleryState"
        :key="index"
        @click="handleImagePreview(index)"
        class="item"
      >
        <img :src="item" style="height:100%" />
      </li>
    </ul>
    <van-image-preview
      v-model="state.show"
      :start-position="state.current"
      :images="galleryState"
      @change="onChange"
    >
      <template v-slot:current>{{ state.current + 1 }}/{{ total }}</template>
    </van-image-preview>
  </div>
</template>

<script>
import { ImagePreview } from "@ylz/vant"
import Markers from "../../../controller/markers"

export default {
  name: "gallery",
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  data() {
    return {
      state: {
        show: false,
        current: 0
      },
      galleryState: []
    }
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
  computed: {
    total() {
      return this.galleryState.length
    }
  },
  methods: {
    async getDetail() {
      let key = ""
      const markers = new Markers()
      const ret = await markers.getMarkSummaryInfo(this.orgOfficeId)
      const { orgOfficeInfoDetail, orgOfficeType } = ret
      if (orgOfficeType === "医院") {
        key = "hospital_photos"
      }
      if (orgOfficeType === "景区") {
        key = "scenic_area_photos"
      }
      const tempState = orgOfficeInfoDetail.replace(/[\n\r]/g, "")
      this.galleryState = JSON.parse(tempState)[key].split(",")
    },
    handleImagePreview(index) {
      this.state.show = true
      this.state.current = index
    },
    onChange(index) {
      this.current = index
      this.state.current = index
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  background: #f2f2f2;
  padding: 18px * @ratio 16px * @ratio 0;
}
.list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .item {
    width: 48%;
    // height: 134px * @ratio;
    margin-bottom: 12px * @ratio;
    img {
      width: 100%;
      display: block;
    }
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 100%;
  height: 120px;
  background-color: #fff;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
</style>