<template>
  <div class="">
    <component :is="activeItem"></component>
  </div>
</template>

<script>
import agreement0 from "./agreement-0.vue"
import agreement1 from "./agreement-1.vue"
import agreement2 from "./agreement-2.vue"
import agreement3 from "./agreement-3.vue"
import agreement4 from "./agreement-4.vue"
export default {
  components: {
    agreement0,
    agreement1,
    agreement2,
    agreement3,
    agreement4
  },
  data() {
    return {
      type: "",
      activeItem: "agreement0"
    }
  },
  mounted() {
    this.type = this.$route.query.type
    let relation = this.$route.query.relation
    if(relation == 1){
      document.title = "一图读懂亲情账号"
    }else{
      document.title = this.getPageTile(this.type)
    }
    this.activeItem = "agreement" + this.type
  },
  methods: {
    getPageTile(type) {
      const map = {
        0: "国家老龄服务平台用户协议",
        1: "国家老龄服务平台隐私政策",
        2: "用户授权协议",
        3: "认证服务协议",
        4: "一图读懂老年人电子证"
      }
      return map[type]
    }
  }
}
</script>

<style lang="less" scoped>
.page-ocr {
  width: 100%;
  height: 100%;
  position: relative;
  
}
</style>