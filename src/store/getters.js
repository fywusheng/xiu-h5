/*
 * @Description: 
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-04-15 15:57:54
 */
const getters = {
  dictionaryCodeList: state => state.ddiscoveryictionary.codeList,
  userInfo: state => state.user.user,
  token: state => state.user.token,
  location: state => state.map.location,
  orgOfficeLon: state => state.map.orgOfficeLon,
  orgOfficeLat: state => state.map.orgOfficeLat,
  endPosition: state => state.map.endPosition,
  dynamicPos: state => state.map.dynamicPos,
  classification: state => state.map.classification,
  markersList: state => state.map.markersList,
  navPos: state => state.map.navigationPos,
  curPos: state => state.map.curPos,
  amapManager: state => state.map.amapManager,
  curAudio: state => state.discovery.curAudio,
  audioList: state => state.discovery.audioList
}

export default getters
