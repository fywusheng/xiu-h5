/*
 * @Description: 发现模块
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-13 16:46:48
 */
const state = {
  curAudio: {
    contId: "",
    mediaUrl: "",
    ttl: "",
    pic: ""
  },
  audioList: []
}

const mutations = {
  mCurAudio: (state, curAudio) => {
    state.curAudio.contId = curAudio.contId
    state.curAudio.mediaUrl = curAudio.mediaUrl
    state.curAudio.ttl = curAudio.ttl
    state.curAudio.pic = curAudio.imgs[0] || require("@/assets/imgs/discovery/default_player_bg-mini.png")
  },
  pauseAudio: (state) => {
    state.curAudio.contId = ""
    state.curAudio.mediaUrl = ""
    state.curAudio.ttl = ""
  },
  AudioList: (state, list) => {
    state.audioList = [...state.audioList, ...list]
  }
}

const actions = {
  getCurAudio({ commit }, data) {
    commit("mCurAudio", data)
  },
  cancelCurAudio({ commit }) {
    commit("pauseAudio")
  },
  getAudioList({ commit }, list) {
    commit("AudioList", list)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}