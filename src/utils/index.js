/*
 * @Description: 公用方法
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-08-05 16:21:43
 */
// 判断是否连接wifi
export function isWiFi() {
    try {
        let wifi = true
        let ua = window.navigator.userAgent
        let con = window.navigator.connection
        if (/MicroMessenger/.test(ua)) {
            if (ua.indexOf('WIFI') >= 0) {
                return true;
            } else {
                wifi = false
            }
            // 如果支持navigator.connection
        } else if (con) {
            let network = con.type
            if (network !== 'wifi' && network !== '2' && network !== 'unknown') {
                wifi = false
            }
        }
        return wifi
    } catch (e) {
        return false
    }
}

/**
 * 跳转人脸识别页面
 * @param {*} userName 名称
 * @param {*} idCard 身份证
 * @param {*} url 人脸识别成功后跳转的页面路由
 */
export function jumpFaceRecognition(param) {
    const route = window.location.href
    const origin = route.slice(0, route.indexOf("#") + 1)
    const url = `${origin}/${param.url}`
    const query = param.query
    location.href = `http://120.42.37.86:10013/#/?psnName=${param.userName}&idCard=${param.idCard}&url=${url}`
}