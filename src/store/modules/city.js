/*
 * @Description: 
 * @Version: 0.1
 * @Autor: yjm
 */
import { commonApi } from "@/api"

const state = {
  city: [],
  homeCity: []
}

const mutations = {
  SET_CITY(state, payload) {
    state.city = payload
  },
  SET_HOMECITY(state, payload) {
    state.homeCity = payload
  }
}

const actions = {
  async getCity({ commit }, payload) {
    const cityData = JSON.parse(sessionStorage.getItem("CITYDATA"))
    if (cityData) {
      commit("SET_CITY", format(cityData))
    } else {
      const res = await commonApi.getRegnAreaTree({})
      sessionStorage.setItem("CITYDATA", JSON.stringify(res.data))
      if (res.code == 0) {
        const data = format(res.data)
        commit("SET_CITY", data)
      }
    }
  },
  async getHomeCity({ commit }, payload) {
    const cityData = JSON.parse(sessionStorage.getItem("HOMECITYDATA"))
    if (cityData) {
      commit("SET_HOMECITY", format(cityData))
    } else {
      const res = await commonApi.getRegnNamebyLV({ level: 0 })
      sessionStorage.setItem("HOMECITYDATA", JSON.stringify(res.data))
      if (res.code == 0) {
        const data = format(res.data)
        commit("SET_HOMECITY", data)
      }
    }
  }
}

function format(data) {
  !(function fn(arr) {
    arr.forEach(item => {
      item.text = item.regnName
      item.value = item.regnCode
      if (item.children && item.children.length) {
        fn(item.children)
      } else {
        item.children = null
      }
    })
  })(data)
  return data
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}