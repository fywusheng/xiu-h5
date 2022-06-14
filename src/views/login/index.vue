<template>
  <div>
    <van-field v-model="tel" type="tel" label="手机号" />
    <van-field v-model="code" center clearable label="短信验证码" placeholder="请输入短信验证码">
      <template #button>
        <van-button size="small" @click="getCode" type="primary">发送验证码</van-button>
      </template>
    </van-field>
    <van-button type="primary" @click="getToken">登录获取token</van-button>

    <van-field v-model="token" rows="20" autosize label="token" type="textarea" placeholder="token展示区" />
  </div>
</template>
<script>
import { claimApi } from "@/api"
export default {
  data() {
    return {
      code: "",
      tel: "18001146719",
      token: ""
    }
  },
  methods: {
    async getToken() {
      const { code, data } = await claimApi.goLogin({
        mobile: this.tel,
        vcode: this.code || ""
      })
      if (code === 0) {
        this.token = data.accessToken || ""
        localStorage.setItem("token", this.token)
      } else {
        Toast(data)
      }
    },
    getCode() {
      this.sent()
    },
    async sent() {
      console.log("===发送验证码")
      const params = {
        mobile: this.tel,
        tmplId: "340701587045712968",
        sceneFlag: "4",
        source: "source"
      }
      const { code, data } = await claimApi.sentCode(params)
      if (code === 0) {
        console.log("code返回来的data是什么----", data)
        this.code = data
      }
      //  console.log("===范湖id值===",res)
    }
  }
}
</script>

