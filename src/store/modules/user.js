/*
 * @Description: 
 * @Version: 1.0.0
 * @Author: yjm
 * @Date: 2021-05-21 18:42:07
 */

import { commonApi, claimApi } from "@/api"

const state = {
  user: {},
  needMaterial: false, // 是否需要提交证明材料
  form: {}, // 申领填写数据
  step: 0, // 当前步骤
  status: 0, // 电子卡状态
  token: ""
}

const mutations = {
  SET_USER(state, payload) {
    state.user = payload
  },
  SET_STATUS(state, payload) {
    state.status = payload
  },
  SET_STPE(state, payload) {
    state.step = payload
  },
  SET_FORM(state, payload) {
    state.form = Object.assign(state.form, payload)
  }
}

const actions = {
  async getUserInfo({ commit }) {
    const accessToken = localStorage.getItem("token") || this.$route.query.token
    console.log("====token验证===", accessToken)
    const { code, data } = await commonApi.getUserAccount({ accessToken })
    if (code == 0) {
      commit("SET_USER", data)
      sessionStorage.setItem("userInfo", JSON.stringify(data))
      return new Promise(resolve => {
        resolve(data)
      })
    }
  },
  // 查询老龄卡激活\授权状态
  async getEcCardState({ state }) {
    const { data } = await claimApi.ec_cert_state({
      "appId": "53928a083adb4a7dad2eecf05564873f",
      "idNo": state.user.idCard,
      "idType": "身份证",
      "userName": state.user.psnName
    })
    return new Promise(resolve => {
      resolve(data)
    })
  },
  /**
   * token是否有效
   */
  hasValidToken() {
    const accessToken = state.token || localStorage.getItem("token")
    console.log("accessToken", accessToken)
  }
}

export default {
  // namespaced: true,
  state,
  mutations,
  actions
}