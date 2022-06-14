/*
 * @Description: 常用字符串处理函数
 * @Version: 0.1
 * @Autor: Chenyt
 */

// 产生8位数字、字母随机数
export function randomStr () {
  const source = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const letter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const number = '0123456789'

  function generatePassword (length, resource) {
    length = length || 32
    let s = ''
    for (let i = 0; i < length; i++) {
      s += resource.charAt(Math.ceil(Math.random() * 1000) % resource.length)
    }
    return s
  }

  let range = generatePassword(6, source)
  let lettval = generatePassword(1, letter)
  let numval = generatePassword(1, number)
  let pwd = lettval + numval + range
  return pwd
}

/**
 * 判断是否是最后一页
 * @export
 * @param {*} res 返回的data对象 有pageNum，pageSize，total等属性
 */
export function isPageEnd (res = {}) {
  let { pageNum = 1, pageSize = 20, total = 0, list = [] } = res
  if (total) {
    return total <= pageNum * pageSize
  }
  return list.length < pageSize
}

/**
 * 计算rem
 *
 * @export
 *
 */
export function rem (val) {
  const rem = 16 / 375
  return `${val * rem}rem`
}


/**
 * 判断是否是空对象
 *
 * @export
 *
 */
export function isNullObj (val) {
  return JSON.stringify(val) === '{}'
}
/**
 * 解析一个url并生成window.location对象中包含的域
 * location:
 * {
 *      href: '包含完整的url',
 *      origin: '包含协议到pathname之前的内容',
 *      protocol: 'url使用的协议，包含末尾的:',
 *      host: '完整主机名，包含:和端口',
 *      hostname: '主机名，不包含端口'
 *      port: '端口号',
 *      pathname: '服务器上访问资源的路径/开头',
 *      search: 'query string，?开头',
 *      hash: '#开头的fragment identifier'
 * }
 *
 * @param {string} url 需要解析的url
 * @return {Object} 包含url信息的对象
 */

export function parseUrl (url) {
  var url = url || location.href;
  var result = {};
  var keys = [
    "href",
    "origin",
    "protocol",
    "host",
    "hostname",
    "port",
    "pathname",
    "search",
    "hash"
  ];
  var i;
  var regexp = /(([^:]+:)\/\/(([^:\/\?#]+)(:\d+)?))(\/[^?#]*)?(\?[^#]*)?(#.*)?/;

  var match = regexp.exec(url);
  //  console.info('match=', match);

  if (match) {
    for (i = keys.length - 1; i >= 0; --i) {
      result[keys[i]] = match[i] ? match[i] : "";
    }
  }
  if (result.search) {
    var queryObj = {};
    var reg = /[?&]([^=&#]+)=([^&#]*)/g;
    var querys = result.search.match(reg);
    if (querys) {
      for (var j in querys) {
        var query = querys[j].split("=");
        var key = query[0].substr(1),
          value = query[1];
        queryObj[key]
          ? (queryObj[key] = [].concat(queryObj[key], value))
          : (queryObj[key] = value);
      }
    }
    result.search = queryObj;
  }
  //  console.info('result=', result);
  return result;
}
// 返回空对象
export const noop = () => { };

/**
 * 判断对象类型
 * @param [obj: any] 参数对象
 * @returns String
 */
export function isType (obj) {
  return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
}

/**
 * 判断是否非空
 * @param [object: any] 参数对象
 * @returns Boolean
 */
export function isNotEmpty (object) {
  const type = isType(object);
  if (type === 'array') {
    return !!object.length;
  } else if (type === 'object') {
    return !!Object.keys(object).length;
  } else if (type === 'string') {
    return !!object.length;
  } else if (type === 'boolean') {
    return object;
  } else {
    return false;
  }
}

/**
 * 取消冒泡
 * @returns void
 */
export function cancelBubble (evt) {
  let e = (evt) ? evt : window.event;
  if (window.event) { // IE
    e.cancelBubble = true;
  } else { // 非 IE
    e.stopPropagation();
  }
}

/**用于将空字符串的数据修改为null */
export function setDataNull (data) {
  let field = {
    ...data
  };
  for (let d in field) {
    if (field.hasOwnProperty(d)) {
      if (isType(field[d]) === 'string' && field[d].trim() === '') {
        field[d] = null;
      } else if (isType(field[d]) === 'object') {
        field[d] = setDataNull(field[d]);
      }
    }
  }
  return field;
}

// 用于将null的数据修改为空字符串
export function setNullEmpty (data) {
  let field = {
    ...data
  };
  for (let d in field) {
    if (field.hasOwnProperty(d)) {
      if (isType(field[d]) === 'null') {
        field[d] = '';
      } else if (isType(field[d]) === 'object') {
        field[d] = setNullEmpty(field[d]);
      }
    }
  }
  return field;
}

//判断是否为有效值,ps: 只判断string，number，boolean
export function isInvalid (value) {
  // 排除undefined,null,空字符串
  let InvalidType = ['undefined', 'null', 'string'];
  return InvalidType.includes(isType(value)) && !isNotEmpty(value);
}

//返回有效值的值，0，false，string，number，若无效返回空字符串
export function effectiveValue (value) {
  let InvalidType = ['number', 'boolean'];
  if (isInvalid(value) && !(InvalidType.includes(isType(value)))) {
    return '';
  } else {
    return value;
  }
}

// 关闭当前页面并刷新上级页面
export function closeAndReloadOpener () {
  if (window.opener) {
    window.opener.location.reload();
  }
  window.close();
}

// 不足10补0
export function fixTen (num) {
  return ('0' + num).slice(-2);
}
/**
 * 用于操作方法防抖
 * @param [wait] 延时ms
 * @param [immediate] 立即执行
 * @returns descriptor
 */
export const DRDebounce = (wait, immediate = false) => (target, key, descriptor) => {
  let timeout;
  const original = descriptor.value;
  descriptor.value = function () {
    let later = () => {
      timeout = null;
      if (!immediate) {
        original.apply(this, arguments);
      }
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      original.apply(this, arguments);
    }
  };
  return descriptor;
};

/**
 * 用于操作函数节流
 *  @param [delay] 延时ms
 */
export const DRThrottle = (delay) => (target, key, descriptor) => {
  let last;
  let deferTimer;
  const original = descriptor.value;
  descriptor.value = function () {
    let now = +new Date();
    if (last && now < last + delay) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        original.apply(this, arguments);
      }, delay);
    } else {
      last = now;
      original.apply(this, arguments);
    }
  };
  return descriptor;
};

// 截取字符串
export const sliceStr = (str, sliceLen) => {
  if (!str) {
    return ''
  }
  let realLength = 0
  const len = str.length
  let charCode = -1
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1
    } else {
      realLength += 2
    }
    if (realLength > sliceLen) {
      return `${str.slice(0, i)}...`
    }
  }

  return str
}