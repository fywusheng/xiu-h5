/*
 * @Description: 
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-30 23:14:34
 */
import Vue from "vue"
import SvgIcon from "@/components/SvgIcon"// svg component

// register globally
Vue.component("svg-icon", SvgIcon)

const req = require.context("./svg", false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)