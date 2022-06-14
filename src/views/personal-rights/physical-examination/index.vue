<!--
 * @Description: 预约体检
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-25 16:52:45
-->
<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="query.place" :options="optiosState.place" />
      <van-dropdown-item v-model="query.area" :options="optiosState.area" />
    </van-dropdown-menu>
    <div class="list">
      <list-item :state="state" />
    </div>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem } from "@ylz/vant"
import listItem from "./item"
import { rightsApi, mapApi } from "@/api"
export default {
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    listItem
  },
  data() {
    return {
      state: {},
      query: {
        place: "北京",
        area: "朝阳"
      },
      optiosState: {
        place: [
          { text: "北京", value: "北京" },
          { text: "上海", value: "上海" }
        ],
        area: [{ text: "朝阳区", value: "朝阳" }]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const { data } = await rightsApi.getIndividualRights()
      this.getlist(data.healthCare.medical)
    },
    async getlist(orgOfficeId) {
      const { data: res } = await mapApi.getEcOrgOfficeInfoById(
        {
          orgOfficeId
        },
        {
          authorization: "ec_token"
        }
      )
      this.state = res
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  height: 95vh;
  background: #f2f2f2;
}
/deep/.van-dropdown-menu .van-dropdown-menu__item {
  width: 120px * @ratio;
  flex: inherit;
}
</style>