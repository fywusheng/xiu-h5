<!--
 * @Description: 消息中心
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-05-21 18:42:07
-->
<template>
  <div class="message-page">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="message" v-for="(item, index) in list" :key="index">
        [<span class="type">
          {{ type[item.type] }}
        </span>
        ] <span class="text">{{ item.message }}</span>
        <div class="time">{{ item.time | dayFormat("datetime") }}</div>
      </div>
    </van-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      finished: false,
      loading: false,
      type: {
        0: "系统消息"
      },
      list: [
        {
          type: 0,
          message: "情亲账户已上线",
          time: new Date().getTime()
        }
      ]
    }
  },
  created() {
    this.getMessage()

  },
  methods: {
    getMessage(pageIndex, pageSize) {
      this.list = new Array(10).fill(
        {
          type: 0,
          message: "情亲账户已上线",
          time: new Date().getTime()
        }
      )

    },
    onLoad() {

    }
  }
}
</script>
<style lang="less" scoped>
.message-page {
  background: #fbf9f7;
  min-height: 100%;
  padding: @space_md_16;
}
.message {
  padding: @space_md_16;
  background: #ffffff;
  border-radius: @border_radius_lg;
  margin-bottom: @space_md_16;
  font-size: @font_size_lg;
  .type {
    color: @main_color;
  }
  .text {
    margin-left: 10px * @ratio;
  }
  .time {
    margin-top: @space_md_16;
    color: @third_text_color;
    font-size: @font_size_md;
  }
}
</style>