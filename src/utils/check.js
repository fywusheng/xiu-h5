/*
 * @Description: 常用表单校验规则
 * @Version: 0.1
 * @Autor: Chenyt
 */


// export const mobileRex = /^1[3-9]\d{9}$/;//校验手机号格式
export const mobileRex = /^(13[0-9]|14[56789]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[136589])\d{8}$/;
export const codeRex = /^\d{6}$/; // 6位数验证码
export const cnReg = /^([\u4e00-\u9fa5\·]{2,25})$/; //校验中文名正则
// 邮箱 ^\w+([-+.]*\w?)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
export const regEmail = /^\s*$|^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,6})+$/;
export const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/; //15位和18位身份证号码的正则表达式
export const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/
export const usernameRex = /^[a-zA-Z][\da-zA-Z]{2,19}$/;
export const homePhone =/^\s*$|^\d{4}-\d{8}|\d{4}-\d{7}$/;//验证固定电话号码为7-8位数字并带有区号
// 纳税人识别号15|17|18|20位，字母+数字
export const taxpayerNo = /^(^[\da-zA-Z]{15}$)|(^[\da-zA-Z]{17}$)|(^[\da-zA-Z]{18}$)|(^[\da-zA-Z]{20}$)$/
export const postCode=/^[0-9]{6}$/;//邮政编码
export const bankNo=/^([1-9]{1})(\d{14}|\d{18})$/;//银行卡号

/**
 * 固定电话
 * @param {String} str 
 */
export function checkHomePhone(str) {
  return homePhone.test(str);
}
/**
 * 银行卡号
 * @param {String} str 
 */
export function checkBankNo(str) {
  return bankNo.test(str);
}
/**
 * 纳税人识别号格式校验
 * @param {String} str 
 */
export function checkTaxpayerNo(str) {
  return taxpayerNo.test(str);
}
/**
 * 校验用户名 字母开头，3-20位
 * @param {*} str 
 */
export function checkUserName(str) {
  return usernameRex.test(str);
}
/**
 * 邮箱校验
 * @param {*} str 
 */
export function checkEmail(str) {
  return regEmail.test(str);
}
/**
 * 校验手机号格式
 * @param {*} str 
 */
export function checkMobile(str) {
  return mobileRex.test(str);
}
/**
 * 校验验证码位数
 * @param {*} str 
 */
export function checkCode(str) {
  return codeRex.test(str);
}
/**
 * 校验是否是中文名
 * @param {*} str 
 */
export function checkCN(str) {
  return cnReg.test(str);
}
/**
 * 密码校验大小写+数字
 * @param {*} str 
 */
export function checkPWD(str) {
  const rule1 = /\d+/;
  const rule2 = /[a-z]+/;
  const rule3 = /[A-Z]+/;
  const rule4 = /[~!@#\$%^&*\{\};,.\?\/'"]/;
  const rule5 = /^.{6,20}$/;
  const flag1 = rule1.test(str);
  const flag2 = rule2.test(str);
  const flag3 = rule3.test(str);
  const flag4 = rule4.test(str);
  const flag5 = rule5.test(str);
  if (flag1 && flag5 && flag2 || flag3) {
    return true;
  } else {
    return false;
  }
}
/**
 * 纳税人识别号，校验组地址码
 * @param {*} str 
 */
export function orgcodevalidate(value) {
  if (value != "") {
    var part1 = value.substring(0, 8);
    var part2 = value.substring(value.length - 1, 1);
    var ws = [3, 7, 9, 10, 5, 8, 4, 2];
    var str = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var reg = /^([0-9A-Z]){8}$/;
    if (!reg.test(part1)) {
      return true
    }
    var sum = 0;
    for (var i = 0; i < 8; i++) {
      sum += str.indexOf(part1.charAt(i)) * ws[i];
    }
    var C9 = 11 - (sum % 11);
    var YC9 = part2 + "";
    if (C9 == 11) {
      C9 = "0";
    } else if (C9 == 10) {
      C9 = "X";
    } else {
      C9 = C9 + "";
    }
    return YC9 != C9;
  }
}
/**
 * 大写校验
 * @param {*} str 
 */
export function upper(str) {
  const rule3 = /[A-Z]+/;
  const flag3 = rule3.test(str);
  return flag3
}
/**
 * 校验邮政编码
 * @param {*} str 
 */
export function checkPostCode(str) {
  const flag = postCode.test(str);
  return flag
}
/**
 * 校验地址码
 * @param {*} str 
 */
// 校验地址码
export function checkAddressCode(addressCode) {
  var provinceAndCitys = {
    11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江",
    31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东",
    45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏",
    65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
  };
  var check = /^[1-9]\d{5}$/.test(addressCode);
  if (!check) { return false; }
  if (provinceAndCitys[parseInt(addressCode.substring(0, 2))]) {
    return true;
  } else {
    return false;
  }

}

/*
 * 身份证15位编码规则：dddddd yymmdd xx p
 * dddddd：6位地区编码
 * yymmdd: 出生年(两位年)月日，如：910215
 * xx: 顺序编码，系统产生，无法确定
 * p: 性别，奇数为男，偶数为女
 *
 * 身份证18位编码规则：dddddd yyyymmdd xxx y
 * dddddd：6位地区编码
 * yyyymmdd: 出生年(四位年)月日，如：19910215
 * xxx：顺序编码，系统产生，无法确定，奇数为男，偶数为女
 * y: 校验码，该位数值可通过前17位计算获得
 *
 * 前17位号码加权因子为 Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
 * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
 * 如果验证码恰好是10，为了保证身份证是十八位，那么第十八位将用X来代替
 * 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
 * i为身份证号码1...17 位; Y_P为校验码Y所在校验码数组位置
 */
export function validateIdCard(idCard) {
  let isOK = false;
  //如果通过该验证，说明身份证格式正确，但准确性还需计算
  if (regIdCard.test(idCard)) {
    if (idCard.length == 18) {
      var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
      var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
      var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
      for (var i = 0; i < 17; i++) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
      }

      var idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
      var idCardLast = idCard.substring(17); //得到最后一位身份证号码

      //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod == 2) {
        if (idCardLast == "X" || idCardLast == "x") {
          isOK = true;
        } else {
        }
      } else {
        //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast == idCardY[idCardMod]) {
          isOK = true;
        } else {
        }
      }
    } else {
      isOK = true
    }
  }
  return isOK;
}



/******全局访问********/
/**
 * 校验身份证正误
 * @param {*} IdCard 
 * @param {*} 
 */
export const validateIdCardFn=(rule, value, callback) => { 
  if (!validateIdCard(value)) {
    callback(new Error("请输入正确的身份证号"))
  } else {
    callback()
  }
}
/**
 * 校验手机号正误
 * @param {*} phone
 * @param {*} 
 */
export const validateMobilePhoneFn=(rule, value, callback) => { 
  if (!checkMobile(value)) {
    callback(new Error("请输入正确的手机号"))
  } else {
    callback()
  }
}
/**
 * 校验邮箱正误
 * @param {*} email
 * @param {*} 
 */
export const validateEmailFn=(rule, value, callback) => { 
  if (!checkEmail(value)) {
    callback(new Error("请输入正确的邮箱"))
  } else {
    callback()
  }
}
/**
 * 校验6位数验证码正误
 * @param {*} phone
 * @param {*} 
 */
export const validateCodeCountFn=(rule, value, callback) => { 
  if (!checkCode(value)) {
    callback(new Error("请输入6位验证码"))
  } else {
    callback()
  }
}
/**
 * 校验固定电话正误
 * @param {*} phone
 * @param {*} 
 */
export const validateHomePhoneFn=(rule, value, callback) => { 
  if (!checkHomePhone(value)) {
    callback(new Error("请输入正确的固定电话"))
  } else {
    callback()
  }
}
/**
 * 校验是否中文
 * @param {*} value
 * @param {*} 
 */
export const validateChineseFn=(rule, value, callback) => { 
  if (!checkCN(value)) {
    callback(new Error("请输入中文"))
  } else {
    callback()
  }
}
/**
 * 校验纳税人识别号
 * @param {*} TaxpayerNo
 * @param {*} 
 */
export const validateTaxpayerNoFn=(rule, value, callback) => { 
  if (!checkTaxpayerNo(value)) {
    callback(new Error("请输入正确是纳税人识别号"))
  } else {
    callback()
  }
}

/**
 * 校验是否大写
 * @param {*} upper
 * @param {*} 
 */
export const validateUpperFn=(rule, value, callback) => { 
  if (!upper(value)) {
    callback(new Error("请输入大写字母"))
  } else {
    callback()
  }
}

/**
 * 校验邮编
 * @param {*} postcode
 * @param {*} 
 */
export const validatePostCodeFn=(rule, value, callback) => { 
  if (!checkPostCode(value)) {
    callback(new Error("请输入正确的邮政编码"))
  } else {
    callback()
  }
}
/**
 * 校验用户名
 * @param {*} upper
 * @param {*} 
 */
export const validateUserNameFn=(rule, value, callback) => { 
  if (!checkUserName(value)) {
    callback(new Error("请输入字母开头，3-20位的用户名"))
  } else {
    callback()
  }
}
/**
 * 校验密码
 * @param {*} pwd
 * @param {*} 
 */
export const validatePwdFn=(rule, value, callback) => { 
  if (!checkPWD(value)) {
    callback(new Error("6-20位由字母大小写和数字组成的密码"))
  } else {
    callback()
  }
}
/**
 * 校验银行卡号
 * @param {*} pwd
 * @param {*} 
 */
export const validateBankNo=(rule, value, callback) => { 
  if (!checkBankNo(value)) {
    callback(new Error("请输入正确的银行卡号"))
  } else {
    callback()
  }
}
/**
 * 校验网址(url,支持端口和"?+参数"和"#+参数")
 * @param {*} pwd
 * @param {*} 
 */
export const validateUrl = (rule, value, callback) => {
  const reg = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/
  if (reg.test(value)) {
    callback()
  } else {
    return callback(new Error('请输入正确的网址'))
  }
}

