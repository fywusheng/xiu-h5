/*
 * @Description:
 * @Version: 0.1
 * @Autor: wjn
 */

export default [
    {
        // 模糊查询附近可用的机构服务场所
        url: "/eac/orgOffice/getOfficeByLike",
        type: "post",
        response: config => {
            return {
                "code": 0,
                "data": [
                    {
                        "orgOfficeLon": 122.222222,
                        "distance": 102935.39594202675,
                        "rid": "0000000000000043",
                        "orgOfficeName": "北京伟泽景区",
                        "orgId": "asd123456",
                        "orgOfficeYcode": "100000",
                        "orgOfficeType": "景区",
                        "orgOfficeAddr": "北京市西城区北环中心",
                        "orgOfficeAddrCity": "北京市",
                        "orgOfficeTel": "15260613980",
                        "orgOfficeStatus": "1",
                        "orgOfficeLeader": "伟泽",
                        "orgOfficeLat": 22.222222,
                        "orgOfficeAddrArea": "西城区",
                        "orgOfficeAddrDetail": "北京市西城区北环中心",
                        "orgOfficeId": "695277f6f53a4bf1bd851c528969b991",
                        "orgOfficeAddrPro": "北京市",
                        "orgOfficePlayTime": "建议游玩时间",
                        "orgOfficeOpenTime": "开放时间",
                        "discounts": [
                            {
                                "discountsTitle": "优惠主题",
                                "discountsContent": "优惠内容"
                            }
                        ]
                    }
                ],
                "message": "成功",
                "timestamp": "1606132172"
            }
        }
    },
    {
        // 根据当前位置获取附近的服务场所地图
        url: "/eac/orgOffice/getOfficeByPoint",
        type: "post",
        response: config => {
            return {
                "code": 0,
                "data": [
                    {
                        "orgOfficeLon": 118.08948,
                        "distance": 926283.7307565104,
                        "rid": "0000000000000043",
                        "orgOfficeName": "思明区",
                        "orgId": "asd123456",
                        "orgOfficeYcode": "100000",
                        "orgOfficeType": "景区",
                        "orgOfficeAddr": "湖滨北路61号东楼附近",
                        "orgOfficeAddrCity": "厦门市",
                        "orgOfficeTel": "15260613980",
                        "orgOfficeStatus": "1",
                        "orgOfficeLeader": "伟泽",
                        "orgOfficeLat": 24.47951,
                        "orgOfficeAddrArea": "西城区",
                        "orgOfficeAddrDetail": "湖滨北路61号东楼附近",
                        "orgOfficeId": "695277f6f53a4bf1bd851c528969b991",
                        "orgOfficeAddrPro": "厦门市",
                        "orgOfficePlayTime": "建议游玩时间",
                        "orgOfficeOpenTime": "开放时间",
                        "discounts": [
                            {
                                "discountsTitle": "优惠主题",
                                "discountsContent": "优惠内容"
                            }
                        ]
                    }
                ],
                "message": "成功",
                "timestamp": "1606133692"
            }
        }
    },
]