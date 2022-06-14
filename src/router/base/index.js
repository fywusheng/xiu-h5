/*
 * @Description: 基础页面路由
 * @Version: 0.1
 * @Autor: Chenyt
 */
import Home from "@/views/home/index.vue"
export default [
  {
    path: "/",
    name: "home",
    meta: {
      keepAlive: true,
      title: "首页"
    },
    component: Home
  },
  {
    path: "/note",
    name: "note",
    meta: {
      title: "优惠说明"
    },
    component: () => import("@/views/note/index.vue")
  },
  {
    path: "/xiaohua",
    name: "note",
    meta: {
      title: "消化内科"
    },
    component: () => import("@/views/projectDetail/xiaohua.vue")
  },
  {
    path: "/shengjing",
    name: "note",
    meta: {
      title: "神经内科"
    },
    component: () => import("@/views/projectDetail/shengjing.vue")
  },
  {
    path: "/guzhi",
    name: "note",
    meta: {
      title: "骨质疏松科"
    },
    component: () => import("@/views/projectDetail/guzhi.vue")
  },
  {
    path: "/jiankang",
    name: "note",
    meta: {
      title: "健康管理中心"
    },
    component: () => import("@/views/projectDetail/jiankang.vue")
  },
  {
    path: "/guke",
    name: "note",
    meta: {
      title: "骨科治疗中心"
    },
    component: () => import("@/views/projectDetail/guke.vue")
  },
  {
    path: "/mazui",
    name: "note",
    meta: {
      title: "麻醉科"
    },
    component: () => import("@/views/projectDetail/mazui.vue")
  },
  {
    path: "/ICU",
    name: "note",
    meta: {
      title: "ICU"
    },
    component: () => import("@/views/projectDetail/ICU.vue")
  },
  {
    path: "/erbi",
    name: "note",
    meta: {
      title: "耳鼻喉科"
    },
    component: () => import("@/views/projectDetail/erbi.vue")
  },
  {
    path: "/kangfu",
    name: "note",
    meta: {
      title: "康复医学科"
    },
    component: () => import("@/views/projectDetail/kangfu.vue")
  },
  {
    path: "/pifu",
    name: "note",
    meta: {
      title: "皮肤科"
    },
    component: () => import("@/views/projectDetail/pifu.vue")
  },
  {
    path: "/fuke",
    name: "note",
    meta: {
      title: "妇科"
    },
    component: () => import("@/views/projectDetail/fuke.vue")
  },
  {
    path: "/yanke",
    name: "note",
    meta: {
      title: "眼科"
    },
    component: () => import("@/views/projectDetail/yanke.vue")
  },
  {
    path: "/guxi",
    name: "note",
    meta: {
      title: "姑息医药科"
    },
    component: () => import("@/views/projectDetail/guxi.vue")
  },
  {
    path: "/zhongliu",
    name: "note",
    meta: {
      title: "肿瘤科"
    },
    component: () => import("@/views/projectDetail/zhongliu.vue")
  },
  {
    path: "/jizheng",
    name: "note",
    meta: {
      title: "急症科"
    },
    component: () => import("@/views/projectDetail/jizheng.vue")
  },
  {
    path: "/huxi",
    name: "note",
    meta: {
      title: "呼吸内科"
    },
    component: () => import("@/views/projectDetail/huxi.vue")
  },
  {
    path: "/yaoji",
    name: "note",
    meta: {
      title: "药剂科"
    },
    component: () => import("@/views/projectDetail/yaoji.vue")
  },
  {
    path: "/jianya",
    name: "note",
    meta: {
      title: "检验科"
    },
    component: () => import("@/views/projectDetail/jianya.vue")
  },
  {
    path: "/fangshe",
    name: "note",
    meta: {
      title: "放射科"
    },
    component: () => import("@/views/projectDetail/fangshe.vue")
  },
  {
    path: "/chaosheng",
    name: "note",
    meta: {
      title: "超声医学科"
    },
    component: () => import("@/views/projectDetail/chaosheng.vue")
  },
  {
    path: "/gaoyang",
    name: "note",
    meta: {
      title: "高压氧治疗中心"
    },
    component: () => import("@/views/projectDetail/gaoyang.vue")
  },
  {
    path: "/xinxue",
    name: "note",
    meta: {
      title: "心血管内科"
    },
    component: () => import("@/views/projectDetail/xinxue.vue")
  },
  {
    path: "/weichuang",
    name: "note",
    meta: {
      title: "微创外科"
    },
    component: () => import("@/views/projectDetail/weichuang.vue")
  },
  {
    path: "/shengzhang",
    name: "note",
    meta: {
      title: "肾脏内科"
    },
    component: () => import("@/views/projectDetail/shengzhang.vue")
  },
  {
    path: "/kouqiang",
    name: "note",
    meta: {
      title: "口腔科"
    },
    component: () => import("@/views/projectDetail/kouqiang.vue")
  },
  {
    path: "/hospitalDetail",
    name: "note",
    meta: {
      title: "医院简介"
    },
    component: () => import("@/views/projectDetail/hospitalDetail.vue")
  },
  {
    path: "/checkstand",
    name: "checkstand",
    meta: {
      title: "收银台"
    },
    component: () => import("@/views/check-stand/index.vue")
  },
  {
    path: "/order",
    name: "orde",
    meta: {
      title: "优惠买单"
    },
    component: () => import("@/views/prepay/common/order.vue")
  },
  {
    path: "/download",
    name: "download",
    meta: {
      title: "下载"
    },
    component: () => import("@/views/download")
  },
  {
    path: "/message",
    name: "message",
    meta: {
      title: "消息中心"
    },
    component: () => import("@/views/user-center/message.vue")
  },
  {
    path: "/opinion",
    name: "opinion",
    meta: {
      title: "反馈意见"
    },
    component: () => import("@/views/user-center/opinion.vue")
  },
  {
    path: "/elderly-card",
    name: "oldAgeCard",
    meta: {
      keepAlive: true,
      title: "老年电子证"
    },
    component: () => import("@/views/home/comp/tool-bar/elderly-card.vue")
  },
  {
    path: "/process",
    name: "process",
    component: () => import("@/views/home/comp/tool-bar/process.vue")
  },
  {
    path: "/elderly-code",
    name: "qr-code",
    meta: {
      keepAlive: true,
      title: "二维码展示"
    },
    component: () => import("@/views/home/comp/tool-bar/elderly-code.vue")
  },
  {
    path: "/qr-code-scan",
    name: "qr-code-scan",
    meta: {
      title: "扫一扫"
    },
    component: () => import("@/views/common/qr-code-scan")
  },
  {
    path: "/card-recognition",
    name: "cardRecognition",
    meta: {
      title: "身份证识别"
    },
    component: () => import("@/views/common/ocr/index.vue")
  },
  // 实名认证、老年电子证申领
  {
    path: "/claim",
    name: "claim",
    redirect: "/claim/index",
    component: () => import("@/views/claim"),
    meta: {
      keepAlive: true,
      title: "申领流程"
    },
    children: [
      {
        path: "face-recognition-success",
        name: "faceRecognitionSuccess",
        meta: {
          title: "人脸识别-实名认证"
        },
        component: () => import("@/views/claim/step/face-recognition-success.vue")
      },
      {
        path: "apply-card",
        name: "applyCard",
        meta: {
          title: "电子证申领"
        },
        component: () => import("@/views/claim/step/index.vue")
      },
      {
        path: "apply-card-sucess",
        name: "applyCardSucess",
        meta: {
          title: "电子证申领成功"
        },
        component: () => import("@/views/claim/step/sucess.vue")
      },
      {
        path: "apply-card-sucess-others",
        name: "applyCardSucess",
        meta: {
          title: "电子证申领成功"
        },
        component: () => import("@/views/claim/step/sucess-others.vue")
      },
      //src\views\login\index.vue 便于开发使用
      {
        path: "/login",
        name: "login",
        meta: {
          title: "登录"
        },
        component: () => import("@/views/login/index.vue")
      },
      //测试专用，后续删除
      {
        path: "/concat",
        name: "concat",
        meta: {
          title: "下一步"
        },
        component: () => import("@/views/claim/step/contact-person/index.vue")
      }

    ]
  },
  //赡养扶养关系
  {
    path: "/support-raise",
    name: "supportRaise",
    redirect: "/support-raise/list",
    component: () => import("@/views/support-raise/index.vue"),
    meta: {
      title: "赡养扶养关系"
    },
    children: [
      {
        path: "list",
        name: "supportRaiseList",
        component: () => import("@/views/support-raise/list.vue"),
        meta: {
          title: "赡养扶养关系"
        }
      },
      {
        path: "creat-support",
        name: "creatSupport",
        meta: {
          title: "创建赡养关系"
        },
        component: () => import("@/views/support-raise/createSupport.vue")
      },
      {
        path: "update-support/:supportId",
        name: "updateSupport",
        meta: {
          title: "编辑赡养关系"
        },
        component: () => import("@/views/support-raise/updateSupport.vue")
      },
      {
        path: "create-raise",
        name: "creatRaise",
        meta: {
          title: "创建扶养关系"
        },
        component: () => import("@/views/support-raise/createRaise.vue")
      },
      {
        path: "update-raise/:supportId",
        name: "updateRaise",
        meta: {
          title: "编辑扶养关系"
        },
        component: () => import("@/views/support-raise/updateRaise.vue")
      }
    ]
  },
  //亲情账号
  {
    path: "/family-account",
    name: "familyAccount",
    redirect: "/family-account/index",
    component: () => import("@/views/family-account/index.vue"),
    meta: {
      keepAlive: true,
      title: "亲情账号"
    },
    children: [
      {
        path: "index",
        name: "familyAccountIndex",
        meta: { title: "亲情账号" },
        component: () => import("@/views/family-account/binding-method.vue")
      },
      {
        path: "hasphone-add",
        name: "hasphoneAdd",
        meta: { title: "亲情账号绑定" },
        component: () => import("@/views/family-account/hasPhone/index.vue")
      },
      {
        path: "nophone-add",
        name: "nophoneAdd",
        meta: { title: "亲情账号绑定" },
        component: () => import("@/views/family-account/noPhone/index.vue")
      },
      {
        path: "management",
        name: "familyAccountManagement",
        meta: { title: "亲情账号管理" },
        component: () => import("@/views/family-account/management/index.vue")
      },
      {
        path: "management/list",
        name: "familyAccountList",
        meta: { title: "亲情账号列表" },
        component: () => import("@/views/family-account/management/list.vue")
      },
      {
        path: "bound-status",
        name: "familyAccountBoundStatus",
        meta: { title: "亲情账号绑定成功" },
        component: () => import("@/views/family-account/hasPhone/success.vue")
      },
      {
        path: "bound-success-card",
        name: "familyAccountBoundSuccess",
        meta: { title: "亲情账号绑定成功" },
        component: () => import("@/views/family-account/noPhone/success.vue")
      }
    ]
  },
  // 亲情账号短信绑定
  {
    path: "/bind-account/:familyId",
    name: "bind-account",
    meta: {
      title: "国家老龄服务平台"
    },
    component: () => import("@/views/family-account/bindAccount.vue")
  },
  //个人权益
  {
    path: "/personal-rights",
    name: "personalRights",
    redirect: "/personal-rights/index",
    component: () => import("@/views/personal-rights/index.vue"),
    meta: {
      title: "个人权益"
    },
    children: [
      {
        path: "index",
        name: "personalRightsIndex",
        component: () => import("@/views/personal-rights/home.vue"),
        meta: {
          title: "个人权益"
        }
      },
      {
        path: "existing-rights",
        name: "existingRights",
        component: () => import("@/views/personal-rights/existing-rights.vue"),
        meta: {
          title: "已有权益"
        }
      },
      {
        path: "pension",
        name: "pension",
        component: () => import("@/views/personal-rights/pension/index.vue"),
        meta: {
          title: "养老金查询"
        }
      },
      {
        path: "pension/detail",
        name: "pensionDetail",
        component: () => import("@/views/personal-rights/pension/detail.vue"),
        meta: {
          title: "养老金明细"
        }
      },
      {
        path: "old-age-allowance",
        name: "oldAgeAllowance",
        component: () => import("@/views/personal-rights/age-allowance/old-age-allowance.vue"),
        meta: {
          title: "高龄津贴查询"
        }
      },
      {
        path: "medicare",
        name: "medicare",
        component: () => import("@/views/personal-rights/medicare/index.vue"),
        meta: {
          title: "消费记录查询"
        }
      },
      {
        path: "policy-description",
        name: "policyDescription",
        component: () => import("@/views/personal-rights/policy-description/index.vue"),
        meta: {
          title: "优待政策说明"
        }
      },
      {
        path: "physical-examination",
        name: "physicalExamination",
        component: () => import("@/views/personal-rights/physical-examination/index.vue"),
        meta: {
          title: "预约体检"
        }
      },
      {
        path: "physical-examination/detail",
        name: "physicalExaminationDetail",
        component: () => import("@/views/personal-rights/physical-examination/detail.vue"),
        meta: {
          title: "预约体检详情"
        }
      }
    ]
  },
  // 惠老地图
  {
    path: "/map",
    name: "mapIndex",
    redirect: "/map/index",
    component: () => import("@/views/map/index.vue"),
    children: [
      {
        path: "index",
        name: "map",
        component: () => import("@/views/map/pages/main/index.vue"),
        meta: {
          keepAlive: false,
          title: "养老地图"
        }
      },
      {
        path: "search",
        name: "search",
        component: () => import("@/views/map/pages/main/search.vue"),
        meta: {
          title: "搜索"
        }
      },
      {
        path: "hospital-details/:orgOfficeId",
        name: "hospitalDetails",
        component: () => import("@/views/map/pages/detail/place/hospital.vue"),
        meta: {
          title: "详情-医院"
        }
      },
      {
        path: "hotel-details/:orgOfficeId",
        name: "hotelDetails",
        component: () => import("@/views/map/pages/detail/place/hotel.vue"),
        meta: {
          title: "详情-酒店"
        }
      },
      {
        path: "scenic-details/:orgOfficeId",
        name: "scenicDetails",
        component: () => import("@/views/map/pages/detail/place/scenic.vue"),
        meta: {
          title: "详情-景点"
        }
      },
      {
        path: "store-details/:orgOfficeId",
        name: "storeDetails",
        component: () => import("@/views/map/pages/detail/place/store.vue"),
        meta: {
          title: "详情-商户"
        }
      },
      {
        path: "pharmacy-details/:orgOfficeId",
        name: "pharmacyDetails",
        component: () => import("@/views/map/pages/detail/place/pharmacy.vue"),
        meta: {
          title: "详情-药店"
        }
      },
      {
        path: "nursing-home-details/:orgOfficeId",
        name: "nursingHomeDetails",
        component: () => import("@/views/map/pages/detail/place/nursing-home.vue"),
        meta: {
          title: "详情-养老院"
        }
      },
      {
        path: "government-details/:orgOfficeId",
        name: "governmentDetails",
        component: () => import("@/views/map/pages/detail/place/government.vue"),
        meta: {
          title: "详情-政务服务"
        }
      },
      {
        path: "look-after-details/:orgOfficeId",
        name: "lookAfterDetails",
        component: () => import("@/views/map/pages/detail/place/look-after.vue"),
        meta: {
          title: "详情-日间照料"
        }
      },
      {
        path: "help-meal-details/:orgOfficeId",
        name: "helpMealDetails",
        component: () => import("@/views/map/pages/detail/place/help-meal.vue"),
        meta: {
          title: "详情-助餐点"
        }
      },
      {
        path: "delicious-food-details/:orgOfficeId",
        name: "deliciousFoodDetails",
        component: () => import("@/views/map/pages/detail/place/delicious-food.vue"),
        meta: {
          title: "详情-美食"
        }
      },
      {
        path: "gallery-list/:orgOfficeId",
        name: "galleryList",
        component: () => import("@/views/map/pages/detail/place/gallery-list.vue"),
        meta: {
          title: "详情"
        }
      },
      {
        path: "nearby",
        name: "nearby",
        component: () => import("@/views/map/pages/detail/nearby/nearby.vue"),
        meta: {
          title: "周边"
        }
      },
      {
        path: "navigation",
        name: "navigation",
        redirect: "/map/navigation/index",
        component: () => import("@/views/map/pages/navigation/index.vue"),
        meta: {
          title: "路线导航"
        },
        children: [
          {
            path: "index",
            name: "navigationIndex",
            component: () => import("@/views/map/pages/navigation/content.vue"),
            meta: {
              title: "路线导航"
            }
          }
        ]
      }
    ]
  },
  // 尊老头条(发现)
  {
    path: "/discovery",
    name: "discovery",
    redirect: "/discovery/index",
    component: () => import("@/views/discovery/index.vue"),
    meta: {
      title: "尊老头条"
    },
    children: [
      {
        path: "index",
        name: "discoveryHome",
        component: () => import("@/views/discovery/home/home.vue"),
        meta: {
          title: "尊老头条"
        }
      },
      {
        path: "search-result",
        name: "searchResult",
        component: () => import("@/views/discovery/home/search/search-result.vue"),
        meta: {
          title: "搜索结果"
        }
      },
      {
        path: "search",
        name: "searchResult",
        component: () => import("@/views/discovery/home/search/search.vue"),
        meta: {
          title: "搜索结果"
        }
      },
      {
        path: "detail/:articleId",
        name: "discoveryDetail",
        meta: {
          keepAlive: true,
          title: "详情"
        },
        component: () => import("@/views/discovery/detail/detail.vue")
      },
      {
        path: "app-detail/:articleId",
        name: "discoveryAppDetail",
        meta: {
          keepAlive: true,
          title: "详情"
        },
        component: () => import("@/views/discovery/detail/webView.vue")
      },
      {
        path: "video-list/:videoId",
        name: "discoveryVideo",
        meta: {
          keepAlive: true,
          title: "视频"
        },
        component: () => import("@/views/discovery/detail/video.vue")
      },
      {
        path: "small-video-class",
        name: "smallVideoClass",
        meta: {
          keepAlive: true,
          title: "分类中心"
        },
        component: () => import("@/views/discovery/small-video/small-video-class.vue")
      },
      {
        path: "video-swiper",
        name: "video-swiper",
        meta: {
          keepAlive: true,
          title: "视频"
        },
        component: () => import("@/views/discovery/small-video/video-swiper.vue")
      }
    ]
  },
  // 辟谣
  {
    path: "/refute-rumors",
    name: "refuteRumorsList",
    meta: {
      keepAlive: true,
      title: "辟谣列表"
    },
    component: () => import("@/views/home/refute-rumors/list.vue")
  },
  // 辟谣详情
  {
    path: "/refute-rumors-detail/:contId",
    name: "refuteRumorsDetail",
    meta: {
      keepAlive: true,
      title: "辟谣详情"
    },
    component: () => import("@/views/home/refute-rumors/detail.vue")
  },
  // app辟谣详情
  {
    path: "/refute-rumors/app-detail/:contId",
    name: "refuteRumorsAppDetail",
    meta: {
      keepAlive: true,
      title: "辟谣详情"
    },
    component: () => import("@/views/home/refute-rumors/app-detail.vue")
  },
  // 惠老服务
  {
    path: "/service",
    name: "service",
    redirect: "/service/index",
    component: () => import("@/views/service/index.vue"),
    meta: {
      title: "惠老服务"
    },
    children: [
      {
        path: "health-check",
        name: "healthCheck",
        component: () => import("@/views/service/health-check/list.vue"),
        meta: {
          title: "健康医疗"
        }
      },
      {
        path: "house-keeping",
        name: "houseKeeping",
        component: () => import("@/views/service/house-keeping/list.vue"),
        meta: {
          title: "家政照护"
        }
      },
      {
        path: "culture-entertainment",
        name: "cultureEntertainment",
        component: () => import("@/views/service/culture-entertainment/list.vue"),
        meta: {
          title: "文化娱乐"
        }
      },
      {
        path: "travel",
        name: "travel",
        component: () => import("@/views/service/travel/list.vue"),
        meta: {
          title: "出行旅游"
        }
      },
      {
        path: "health-care",
        name: "healthCare",
        component: () => import("@/views/service/health-care/list.vue"),
        meta: {
          title: "养生保健"
        }
      },
      {
        path: "detail/:id",
        name: "serviceDetail",
        component: () => import("@/views/service/comp/detail/index.vue"),
        meta: {
          title: "服务详情"
        }
      }
    ]
  },
  // 用户中心
  {
    path: "/user-center",
    name: "user-center",
    meta: {
      title: "个人中心"
    },
    component: () => import("@/views/user-center/index.vue")
  },
  {
    path: "/user-center/scanning",
    name: "userCenterScaning",
    component: () => import("@/views/common/verified/scaning.vue"),
    meta: {
      title: "实名认证"
    }
  },
  {
    path: "/user-center/manual",
    name: "userCenterManual",
    component: () => import("@/views/common/verified/manual.vue"),
    meta: {
      title: "实名认证"
    }
  },
  {
    path: "/user-center/success",
    name: "userCenterManual",
    component: () => import("@/views/common/verified/success.vue"),
    meta: {
      title: "实名认证成功"
    }
  },
  // 红包
  {
    path: "/red-bag",
    name: "redbag",
    meta: {
      keepAlive: true,
      title: "惠老福利"
    },
    component: () => import("@/views/map/red-bag.vue")
  }, 
  // 协议
  {
    path: "/agreement",
    name: "agreement",
    meta: {
      keepAlive: true,
      title: ""
    },
    component: () => import("@/views/common/agreement")
  }
]