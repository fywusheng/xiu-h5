<!--
 * @Description: 尊老头条首页
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-29 15:44:57
-->
<template>
  <div>
    <!-- <art-list v-show="!state.showSearch" @clickSearch="clickSearch" /> -->
    <art-list @clickSearch="clickSearch" />
    <!-- <search v-show="state.showSearch" /> -->
    <audio-comp ref="audio" />
  </div>
</template>

<script>
import artList from "./list/index"
// import search from "./search/search.vue"
import audioComp from "../audio-comp/audio-index"
export default {
  components: {
    artList,
    // search,
    audioComp
  },
  data() {
    return {
      state: {
        showSearch: false,
        keyword: ""
      }
    }
  },
  computed: {
    curAudioId() {
      return this.$store.getters.curAudio.contId
    }
  },
  watch: {
    curAudioId(val) {
      this.$refs.audio.playCur(this.$store.getters.curAudio)
    }
  },
  methods: {
    getKeyword(val) {
      this.state.keyword = val
    },
    clickSearch() {
      // this.state.showSearch = true
      this.$router.push({ path: "/discovery/search" })
    }
  }
}
</script>

<style lang="less" scoped>
</style>