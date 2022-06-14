/*
 * @Description: 设置Cookies
 * @Version: 0.1
 * @Autor: Chenyt
 */

import Cookies from "js-cookie"

const TokenKey = process.env.VUE_APP_TOKEN

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
