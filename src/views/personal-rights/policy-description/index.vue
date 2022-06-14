<!--
 * @Description: 优惠政策说明
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-24 14:15:31
-->
<template>
  <div>
    <van-tree-select :items="items" :active-id.sync="activeId" :main-active-index.sync="activeIndex" />
    <div class="page-policy-description">
      <treatment />
      <security />
      <pension />
      <health-care />
    </div>
  </div>
</template>

<script>
import { TreeSelect } from "@ylz/vant"
import treatment from "./treatment"
import security from "./security"
import pension from "./pension"
import healthCare from "./healthCare"
import { rightsApi } from "@/api"
export default {
  components: {
    [TreeSelect.name]: TreeSelect,
    treatment,
    security,
    pension,
    healthCare
  },
  data() {
    return {
      items: [
        { text: "浙江", children: [{ text: "杭州" }, { text: "宁波" }] },
        { text: "江苏", children: [{ text: "南京" }, { text: "苏州" }] }
      ],
      activeId: 0,
      activeIndex: 0,
      state: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const { data } = await rightsApi.getIndividualRights()
      this.state = data.preTreatPoliDesc["北京市"]
      console.log("state", this.state)
    }
  }
}
</script>

<style lang="less" scoped>
.page-policy-description {
  padding: 16px * @ratio;
}
</style>