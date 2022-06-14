<!--
 * @Description: 带有展开全文
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-05-28 15:06:01
-->
<template>
  <div class="widthExpandText">
    <p class="tit">{{ title }}</p>
    <div class="wrapper">
      <input :id="id" class="exp" type="checkbox" />
      <div class="text">
        <label v-if="!expandState" class="btn fr" :for="id" @click="changeExpandState"></label>
        {{ article }}
        <label v-if="expandState" class="btn" :for="id" @click="changeExpandState"></label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "expandText",
  props: {
    title: {
      type: String,
      default: ""
    },
    article: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showMore: false,
      expandState: false
    }
  },
  methods: {
    changeExpandState() {
      this.expandState = !this.expandState
    }
  }
}
</script>

<style lang="less" scoped>
.widthExpandText {
  padding: 14px * @ratio 15px * @ratio 12px * @ratio;
  border-bottom: solid #f2f2f2 8px * @ratio;
  .tit {
    font-size: 20px * @ratio;
    line-height: 28px * @ratio;
    margin-bottom: 12px * @ratio;
    color: #333;
  }
  .wrapper {
    display: flex;
    width: 100%;
    overflow: hidden;
    /*   resize: horizontal; */
    font-size: 18px * @ratio;
  }
  .text {
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: justify;
    /* display: flex; */
    /*   display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical; */
    position: relative;
    line-height: 1.5;
    max-height: 7.5em;
    transition: 0.3s max-height;
  }
  .text::before {
    content: "";
    height: calc(100% - 26px * @ratio);
    float: right;
  }
  .text::after {
    content: "";
    width: 999vw;
    height: 999vw;
    position: absolute;
    box-shadow: inset calc(100px * @ratio - 999vw) calc(30px * @ratio - 999vw) 0
      0 #fff;
    margin-left: -100px * @ratio;
  }
  .btn {
    position: relative;
    clear: both;
    line-height: 24px * @ratio;
    border-radius: 4px * @ratio;
    font-size: 18px * @ratio;
    color: #0059ff;
    cursor: pointer;
    /* margin-top: -30px; */
  }
  .fr {
    float: right;
    margin-left: 20px * @ratio;
  }
  .btn::after {
    content: "全文";
  }
  .exp {
    display: none;
  }
  .exp:checked + .text {
    max-height: none;
  }
  .exp:checked + .text::after {
    visibility: hidden;
  }
  .exp:checked + .text .btn::before {
    visibility: hidden;
  }
  .exp:checked + .text .btn::after {
    content: "收起";
  }
  .fr::before {
    content: "...";
    position: absolute;
    left: -5px * @ratio;
    color: #333;
    transform: translateX(-100%);
  }
}
</style>