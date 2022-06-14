/*
 * @Description: 设置localStorage
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-29 18:31:23
 */

const localStorage = window.localStorage
export default {
    getItem(key) {
        try {
            return JSON.parse(localStorage.getItem(key))
        } catch (err) {
            return err
        }
    },
    setItem(key, val) {
        try {
            localStorage.setItem(key, JSON.stringify(val))
        } catch (err) {
            return err
        }
    },
    clear() {
        localStorage.clear()
    },
    keys() {
        return localStorage.keys()
    },
    removeItem(key) {
        localStorage.removeItem(key)
    }
}
