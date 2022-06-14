/*
 * @Description: 个人权益接口
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-24 20:22:14
 */

import { post } from "../axios"
/**
 * 查询个人权益
 * @param {*} relationType 关系类型 (不传则全部 — 0- 赡养人 1-抚养人)
 */
export const getIndividualRights = function() {
  return post("cms/iep/web/cms/cmscont/getIndividualRights")
}

