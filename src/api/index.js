/*
 * @Description: 接口按模块引入，控制好每个模块的接口个数
 * @Version: 0.1
 * @Author: Chenyt
 * @Date: 2021-04-15 15:57:54
 */
import * as commonApi from "./modules/common-api"
import * as claimApi from "./modules/claim-api"
import * as familyApi from "./modules/family-api"
import * as rightsApi from "./modules/rights-api"
import * as mapApi from "./modules/map-api"
import * as discoveryApi from "./modules/discovery-api"
import * as serviceApi from "./modules/service-api"
import * as payApi from "./modules/pay"
export {
  commonApi,
  claimApi,
  familyApi,
  rightsApi,
  mapApi,
  discoveryApi,
  payApi,
  serviceApi
}
