/*
 * @Description: 全局混入的方法
 * @Version: 0.1
 * @Autor: Chenyt
 */
import { validateUrl, validateBankNo, validatePostCodeFn, validatePwdFn, validateUserNameFn, validateTaxpayerNoFn, validateChineseFn, validateIdCardFn, validateMobilePhoneFn, validateHomePhoneFn, validateEmailFn, validateCodeCountFn} from "@/utils/check"
import {asyncGetLabelByCode, asyncGetLabelByCodes, asyncGetCodeByLabel, asyncGetCodeByLabels} from "@/utils/dictionary"
import {dayFormat} from "@/utils/dayjs"
export default {
  methods: {
    validatePostCodeFn,
    validatePwdFn,
    validateUserNameFn, 
    validateTaxpayerNoFn, 
    validateChineseFn, 
    validateIdCardFn, 
    validateMobilePhoneFn, 
    validateHomePhoneFn, 
    validateEmailFn, 
    validateCodeCountFn,
    validateBankNo,
    validateUrl,
    /**
     * 日期格式转换
     * @param {String} day 日期
     * @param {String} format 日期格式 常用格式参数如下：
     * date: "YYYY-MM-DD",
     * month: "YYYY-MM",
     * datetime: "YYYY-MM-DD HH:mm:ss",
     * time: "HH:mm:ss",
     * year: "YYYY"
     */
    dayFormatFn(day, format){
      return dayFormat(day, format)
    },
    /**
     * 通过编码值获取中文值
     * @param {String} type 字典表类型
     * @param {String} val 编码值
     */
    async asyncGetLabelByCodeFn(val, type){
      let result
      await asyncGetLabelByCode(val, type).then(res => { 
        result=res
      })
      return result
    },
    /**
     * 异步通过编码值获取中文值
     * @param {String} type 字典表类型
     * @param {Array|String} vals 编码值以逗号分割的字符串数据
     * @param {String} delimiter 返回数据拼接分割符
     */
    async asyncGetLabelByCodesFn(val, type, delimiter){
      let result
      await asyncGetLabelByCodes(val, type, delimiter).then(res => { 
        result=res
      })
      return result
    }
  },
  /**
   * 通过中文值获取编码值
   * @param {String} type 字典表类型
   * @param {String} val 中文值
   */
  async asyncGetCodeByLabelFn(val, type){
    let result
    await asyncGetCodeByLabel(val, type).then(res => { 
      result=res
    })
    return result
  },
  /**
   * 通过中文值获取编码值
   * @param {String} type 字典表类型
   * @param {Array|String} vals 中文值以逗号分割的字符串数据
   * @param {String} delimiter 返回数据拼接分割符
   */
  async asyncGetCodeByLabelsFn(val, type, delimiter){
    let result
    await asyncGetCodeByLabels(val, type, delimiter).then(res => { 
      result=res
    })
    return result
  }
  
}