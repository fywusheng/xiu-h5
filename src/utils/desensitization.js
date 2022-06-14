/*
 * @Description: 脱敏
 * @Version: 0.1
 * @Autor: Chenyt
 */

/**
 *17350800661 => 173****0661
 *
 * @export
 * @param {*} tel 手机号码
 * @returns
 */
export function mobile(str) {
  return rule(str, 3, 4)
}


export function address(str, placeholder = 4) {
  return rule(str, 3, 4, placeholder)
}
/**
 *123456789012345678 => 123******5678
 *
 * @export
 * @param {*} idcard 身份证号码
 * @returns
 */
export function idCard(str) {
  return rule(str, 3, 4)
}

/**
 * 脱敏规则
 * @param {string} val 脱敏目标值
 * @param {number} front 截取前几字符位个数
 * @param {number} back 截取后几位字符个数
 * @param {number} placeholder 中间占位个数
 */
export function rule(val, front, back, placeholder) {
  if(!val){
    return val
  }
  const length = val.length
  placeholder = placeholder || length - front - back

  if (length > front + back) {
    const frontVal = val.slice(0, front)
    const backVal = back ? val.slice(-back) : ""
    return frontVal + "*".repeat(placeholder) + backVal
  }

  return val
}




/**
 *10000 => "10,000"
 *
 * @export
 * @param {*} num 数字
 * @returns
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","))
}

/**
 *陈伟霆 => 陈*霆
 *陈伟 => 陈*
 *迪丽热巴 => 迪丽*巴
 * @export
 * @param {*} name 名字
 * @returns
 */
const doubleSurnname = [
  "欧阳", "太史", "端木", "上官", "司马", "东方", "独孤", "南宫", "万俟", "闻人", "夏侯", "诸葛", "尉迟", "公羊", "赫连", "澹台",
  "皇甫", "宗政", "濮阳", "公冶", "太叔", "申屠", "公孙", "慕容", "仲孙", "钟离", "长孙", "宇文", "司徒", "鲜于", "司空", "闾丘", "子车", "亓官", "司寇", "巫马", "公西", "颛孙", "壤驷", "公良", "漆雕", "乐正", "宰父", "谷梁", "拓跋", "夹谷", "轩辕", "令狐", "段干", "百里", "呼延", "东郭", "南门", "羊舌", "微生", "公户", "公玉", "公仪", "梁丘", "公仲", "公上", "公门", "公山", "公坚", "左丘", "公伯", "西门", "公祖", "第五", "公乘", "贯丘", "公皙", "南荣", "东里", "东宫", "仲长", "子书", "子桑", "即墨", "达奚", "褚师", "吴铭"
]
export function name(name) {
  if(!name){
    return name
  }
  const fTwo = String(name).substr(0, 2),
    fOne = String(name).substr(0, 1),
    eOne = String(name).substr(name.length - 1),
    ifDoubleSur = doubleSurnname.toString().indexOf(fTwo) > -1
  if (!name) {
    return false
  } else if (String(name).length === 2) {
    return fOne + "*"
  } else if (String(name).length === 3) {
    if (ifDoubleSur) { //复姓3个字
      return fTwo + "*"
    } else {
      return fOne + "*" + eOne
    }
  } else if (String(name).length === 4) { //复姓4个字
    if (ifDoubleSur) { //复姓
      return fTwo + "*" + eOne
    } else {
      return fOne + "*" + "*" + eOne
    }
  } else { //大于4个字
    return fOne + "*" + "*" + eOne
  }
}

/**
 *
 * @export
 * @param {*} str 任意字符串脱敏：前3后4
 * @returns
 */
export function strf3e4(str) {
  if (!str) {
    return ""
  } else if (str.length > 7) {
    return String(str).substr(0, 3) + "***********" + String(str).substr(str.length - 4)
  } else {
    return str
  }
}


const Type = {
  mobile,
  name,
  address,
  idCard
}

/**
 * 脱敏规则
 * @param {string} val 脱敏目标值
 * @param {string|number} type 当type值可以在Type中取到值则该字段返回已定义的脱敏规则函数，否则该字段作为截取前几字符位个数
 * @param {number} back 截取后几位字符个数
 * @param {number} placeholder 中间占位个数
 */
export default function desensitization(val, type, back, placeholder) {
  if (Type[type]) {
    return Type[type](val)
  } else {
    // 重载
    const front = type
    return rule(val, front, back, placeholder)
  }
}

