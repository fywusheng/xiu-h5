/*
 * @Description: 将自有数据和高德数据合并
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-16 17:50:50
 */
import InterfaceApi from "./interface-api"
import AmapApi from "./amap-api"
class CompleteApi {
  // 根据关键字搜索获取服务机构列表
  async getKeywordSearchResult(keyword) {
    const interfaceApi = new InterfaceApi()
    const amapApi = new AmapApi()
    const ret = await interfaceApi.keywordSearch(keyword)
    const apiData = await amapApi.keywordSearchByApi(keyword)

    if (ret.length == 0 || apiData.length == 0) {
      return new Promise((resolve, reject) => {
        const data = ret.concat(apiData)
        data.sort((a, b) => {
          return (a.distance - b.distance)
        })
        console.log("=====关键字搜索---", data)
        resolve(data)
      })
    }
    if (ret.length != 0 && apiData.length != 0) {
      //去重
      let delindexs = []
      ret.map((item, index, array) => {
        apiData.reduce((pre, cur, i, arra) => {
         if (item.orgOfficeName == cur.name){
          arra.splice(i, 1, item)
          delindexs.push(index)
         }
        }, [])
      })
     const getRet = ret.filter((item, index) => {return !delindexs.includes(index)})
     let concatData = getRet.concat(apiData)
     
     //排序
     concatData.sort((a, b) => {
      return (a.distance - b.distance)
     })
     //取25
    let showData = concatData.slice(0, 26)
     console.log("=====关键字搜索最后的值---", showData)
     return new Promise((resolve, reject) => {
      resolve(showData)
     })
    }
  }

  // 获取分类数据
  async getClassification(type, center) {
    const interfaceApi = new InterfaceApi()
    const amapApi = new AmapApi()
  
    const ret = await interfaceApi.getClassification(center) || []
    const apiData = await amapApi.getClassifyDataByApi(center) || []

    if (ret.length == 0 || apiData.length == 0) {
      return new Promise((resolve, reject) => {
        const data = ret.concat(apiData)
        data.sort((a, b) => {
          return (a.distance - b.distance)
        })
        console.log("=====有一方是空的情况---", data)
        resolve(data)
      })
    }
    if (ret.length != 0 && apiData.length != 0) {
      //去重
      let delindexs = []
      ret.map((item, index, array) => {
        apiData.reduce((pre, cur, i, arra) => {
          if (item.orgOfficeName == cur.name){
          arra.splice(i, 1, item)
          delindexs.push(index)
          }
        }, [])
      })
      const getRet = ret.filter((item, index) => {return !delindexs.includes(index)})
      let concatData = getRet.concat(apiData)
      
      //排序
      concatData.sort((a, b) => {
      return (a.distance - b.distance)
      })
      //取25
    let showData = concatData.slice(0, 26)
      console.log("=====最后排序后的值---", showData)
      return new Promise((resolve, reject) => {
      resolve(showData)
      })
    }
  }
  // 获取周边数据
  async getNearBySearch(params) {
    const interfaceApi = new InterfaceApi()
    const amapApi = new AmapApi()
    //TODO 先去掉自己接口的数据
    const ret = await interfaceApi.nearBySearchByInterface(params)
    const apiData = await amapApi.nearBySearchByApi(params)

    if (ret.length == 0 || apiData.length == 0) {
      return new Promise((resolve, reject) => {
        const data = ret.concat(apiData)
        data.sort((a, b) => {
          return (a.distance - b.distance)
        })
        console.log("====周边搜索数据的值---", data)
        resolve(data)
      })
    }
    if (ret.length != 0 && apiData.length != 0) {
      //去重
      let delindexs = []
      ret.map((item, index, array) => {
        apiData.reduce((pre, cur, i, arra) => {
         if (item.orgOfficeName == cur.name){
          arra.splice(i, 1, item)
          delindexs.push(index)
         }
        }, [])
      })
     const getRet = ret.filter((item, index) => {return !delindexs.includes(index)})
     let concatData = getRet.concat(apiData)
     
     //排序
     concatData.sort((a, b) => {
      return (a.distance - b.distance)
     })
     //取25
    let showData = concatData.slice(0, 26)
     console.log("=====周边搜索排序的值---", showData)
     return new Promise((resolve, reject) => {
      resolve(showData)
     })
    }
  }
}

export default CompleteApi