//正常申领，审核中，申领失败
<template>
  <div class="_code">
    <div class="_topbg">
      <div class="_cont">
        <div class="_flex">
          <div class="_icon"><img src="@/assets/imgs/electronic-card/codeIcon.png" /></div>
          <div class="_col">
            <div class="_par">中华人民共和国老年人证</div>
            <div class="_sub">中国老龄协会监制</div>
          </div>
        </div>
        <div class="_line">姓 名:<span class="name">{{ user.psnName | desensitization("name") }}</span></div>
        <div class="_line">身份证:<span class="card">{{ user.idCard | desensitization("idCard") }}</span></div>
      </div>
    </div>
    <div class="_center">
      <div class="pading_center">
        <slot name="changeCenter"></slot>
      </div>
    </div>
  </div>

</template>
<script>
import YQrCode from "@/components/plugins/y-qr-code"
import jsbarcode from "@ylz/jsbarcode"
export default {
  components: {
    YQrCode
  },
  data() {
    return {
      message: {
        5: "电子老年人证申领失败暂时无法使用",
        4: "电子老年人证审核中暂时无法使用"
      }
    }
  },
  props: {
    typeState: {
      type: String,
      default: "4"
    }
  },
  computed: {
    user() {
      return this.$store.state["user"].user
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
._code {
  width: 100%;
  height: 100%;
  ._topbg {
    width: 375px * @ratio;
    height: 231px * @ratio;
    background: url("../../../../assets/imgs/electronic-card/topbg.png") 100%
      100%;
    background-size: cover;
    ._cont {
      width: 90%;
      margin: 0 auto;
      padding-top: 15px * @ratio;
      ._flex {
        display: flex;
        flex-flow: row;
        ._col {
          margin-left: 5px * @ratio;
          ._par {
            font-size: 24px * @ratio;
            color: #fff;
          }
          ._sub {
            font-size: 18px * @ratio;
            color: #fff;
          }
        }
      }
      ._line {
        height: 25px * @ratio;
        line-height: 25px * @ratio;
        font-size: 18px * @ratio;
        color: #fff;
        margin-top: 15px * @ratio;
      }
    }
  }
  ._center {
    width: 100%;

    margin: 0 auto;
    position: absolute;
    top: 231px * @ratio;
    .pading_center {
      width: 90%;
      margin: 0 auto;
      background-color: #fff;
      height: 100%;
      box-shadow: 0px * @ratio 3px * @ratio 10px * @ratio 0px * @ratio
        rgba(0, 0, 0, 0.12);
      border-radius: 12px;
    }
  }
}
</style>

