<!--
 * @Description: 意见反馈
 * @Version: 0.1
 * @Autor: wjn
 * @Date: 2021-03-29 09:43:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-18 23:54:18
-->
<template>
  <van-form class="pinion-page" @submit="onSubmit">
    <section>
      <h2>反馈问题详情</h2>
      <van-field v-model="form.prbDscr" type="textarea" rows="3" prop="prbDscr" maxlength="200" :rules="[{ required: true, message: '' }]" placeholder="请输入您要反馈的内容" autosize show-word-limit />
    </section>
    <section>
      <h3>上传图片</h3>
      <y-uploader v-model="form.fileList" :max-size="500 * 1024" @oversize="onOversize" max-count="3" />
    </section>
    <section>
      <van-field label="联系方式" v-model="form.crterMob" prop="crterMob" placeholder="请输入" :rules="[
          { required: true, message: '' },
          { pattern: mobileRex, message: '联系电话格式错误' },
        ]" />
    </section>
    <div class="tip">
      请留下您的联系方式（微信号/QQ号/邮箱），反馈的相关问题我们会第一时间为您解答。
    </div>
    <div class="submit">
      <y-button size="large" nation-type="submit" round>提交</y-button>
    </div>
  </van-form>
</template>

<script>
import { mobileRex } from "@/utils/check"
import { commonApi } from "@/api"
export default {
  data() {
    return {
      mobileRex,
      form: {
        prbDscr: "",
        fileList: [],
        crterMob: ""
      }
    }
  },
  methods: {
    async onSubmit() {
      const { prbDscr, crterMob, fileList } = this.form
      const { psnName, uactId } = this.$store.state["user-info"].user
      const img = fileList.map((item) => item.content).join(",")
      const res = await commonApi.saveOpinion({
        crterId: uactId,
        crterName: psnName,
        img,
        prbDscr,
        crterMob
      })
      if (res.code == 0) {
        this.$toast("提交成功")
        Object.assign(this.$data, this.$options.data())
      }
    },
    onOversize(file) {
      console.log(file)
      this.$toast("文件大小不能超过 500kb")
    }
  }
}
</script>

<style lang="less" scoped>
.pinion-page {
  background: @main_bg_color;
  min-height: 100%;
  /deep/ .van-field,
  .van-uploader {
    padding: 12px * @ratio 0;
  }
}
section {
  padding: 0 @space_md_16;
  background: #fff;
  margin-bottom: @space_xs_8;
}
h2,
h3 {
  font-size: @font_size_lg;
  padding: 12px * @ratio 0;
  border-bottom: 1px solid #e5e5e5;
}
h3 {
  font-weight: 400;
}
.tip {
  font-size: @font_size_md;
  color: @third_text_color;
  padding: 0 @space_md_16;
}
.submit {
  padding: @space_md_16;
}
</style>