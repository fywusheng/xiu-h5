<!--
 * @Description: 视频列表
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-04 19:54:57
-->
<template>
  <div>
    <div class="video-list">
      <div v-for="(item, index) in state.list" :key="index">
        <video-item :item="item" :id="'video'+index" />
      </div>
    </div>
  </div>
</template>

<script>
import { discoveryApi } from "@/api"
import videoItem from "./videoItem"
export default {
  components: {
    videoItem
  },
  data() {
    return {
      videoId: "",
      state: {
        list: []
      }
    }
  },
  created() {
    this.videoId = this.$route.params && this.$route.params.videoId
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.videoId = newValue.params.videoId
        this.getList()
      }
    }
  },
  methods: {
    async getList() {
      const { data } = await discoveryApi.getVideoList({
        contId: this.videoId,
        pageNum: 1,
        pageSize: 20
      })
      this.state.list = data.list
    }
  }
}
</script>

<style lang="less" scoped>
</style>