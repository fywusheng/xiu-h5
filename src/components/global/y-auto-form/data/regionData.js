const data = [
  {
    code: "110000",
    supportYn: "y",
    name: "北京市",
    list: []
  },
  {
    code: "120000",
    supportYn: "n",
    name: "天津市",
    list: [
      {
        code: "120101",
        supportYn: "y",
        name: "和平区",
        list: []
      }
    ]
  },
  {
    code: "140000",
    supportYn: "n",
    name: "山西省",
    list: [
      {
        code: "140100",
        supportYn: "y",
        name: "太原市",
        list: []
      },
      {
        code: "140200",
        supportYn: "y",
        name: "大同市",
        list: []
      },
      {
        code: "140300",
        supportYn: "y",
        name: "阳泉市",
        list: []
      },
      {
        code: "140400",
        supportYn: "y",
        name: "长治市",
        list: []
      },
      {
        code: "140500",
        supportYn: "y",
        name: "晋城市",
        list: []
      },
      {
        code: "140600",
        supportYn: "y",
        name: "朔州市",
        list: []
      },
      {
        code: "140800",
        supportYn: "y",
        name: "运城市",
        list: []
      },
      {
        code: "140900",
        supportYn: "y",
        name: "忻州市",
        list: []
      },
      {
        code: "141000",
        supportYn: "y",
        name: "临汾市",
        list: []
      },
      {
        code: "141100",
        supportYn: "y",
        name: "吕梁市",
        list: []
      },
      {
        code: "149900",
        supportYn: "y",
        name: "山西省省本级",
        list: []
      }
    ]
  },
  {
    code: "150000",
    supportYn: "n",
    name: "内蒙古自治区",
    list: [
      {
        code: "150600",
        supportYn: "y",
        name: "鄂尔多斯市",
        list: []
      },
      {
        code: "150900",
        supportYn: "y",
        name: "乌兰察布市",
        list: []
      },
      {
        code: "152200",
        supportYn: "y",
        name: "兴安盟",
        list: []
      },
      {
        code: "159900",
        supportYn: "y",
        name: "内蒙古自治区区本级",
        list: [
          {
            code: "159901",
            supportYn: "y",
            name: "内蒙古自治区区本级（区直）",
            list: []
          }
        ]
      }
    ]
  },
  {
    code: "210000",
    supportYn: "n",
    name: "辽宁省",
    list: [
      {
        code: "219900",
        supportYn: "y",
        name: "辽宁省省本级",
        list: []
      }
    ]
  },
  {
    code: "220000",
    supportYn: "n",
    name: "吉林省",
    list: [
      {
        code: "229900",
        supportYn: "y",
        name: "吉林省省本级",
        list: []
      }
    ]
  },
  {
    code: "230000",
    supportYn: "n",
    name: "黑龙江省",
    list: [
      {
        code: "239900",
        supportYn: "n",
        name: "黑龙江省省本级",
        list: [
          {
            code: "239903",
            supportYn: "y",
            name: "黑龙江省省本级(哈尔滨铁路局)",
            list: []
          }
        ]
      }
    ]
  },
  {
    code: "320000",
    supportYn: "n",
    name: "江苏省",
    list: [
      {
        code: "320300",
        supportYn: "y",
        name: "徐州市",
        list: []
      },
      {
        code: "320700",
        supportYn: "y",
        name: "连云港市",
        list: []
      },
      {
        code: "320800",
        supportYn: "y",
        name: "淮安市",
        list: []
      },
      {
        code: "320900",
        supportYn: "y",
        name: "盐城市",
        list: []
      },
      {
        code: "321300",
        supportYn: "y",
        name: "宿迁市",
        list: []
      }
    ]
  },
  {
    code: "330000",
    supportYn: "n",
    name: "浙江省",
    list: [
      {
        code: "339900",
        supportYn: "y",
        name: "浙江省省本级",
        list: []
      }
    ]
  },
  {
    code: "340000",
    supportYn: "y",
    name: "安徽省",
    list: [
      {
        code: "341500",
        supportYn: "y",
        name: "六安市",
        list: []
      },
      {
        code: "349900",
        supportYn: "y",
        name: "安徽省省本级",
        list: []
      }
    ]
  },
  {
    code: "350000",
    supportYn: "n",
    name: "福建省",
    list: [
      {
        code: "359900",
        supportYn: "y",
        name: "福建省省本级",
        list: []
      }
    ]
  },
  {
    code: "360000",
    supportYn: "n",
    name: "江西省",
    list: [
      {
        code: "360100",
        supportYn: "n",
        name: "南昌市",
        list: [
          {
            code: "360199",
            supportYn: "y",
            name: "南昌市市本级",
            list: []
          }
        ]
      },
      {
        code: "360300",
        supportYn: "n",
        name: "萍乡市",
        list: [
          {
            code: "360302",
            supportYn: "y",
            name: "安源区",
            list: []
          },
          {
            code: "360313",
            supportYn: "y",
            name: "湘东区",
            list: []
          },
          {
            code: "360321",
            supportYn: "y",
            name: "莲花县",
            list: []
          },
          {
            code: "360322",
            supportYn: "y",
            name: "上栗县",
            list: []
          },
          {
            code: "360323",
            supportYn: "y",
            name: "芦溪县",
            list: []
          },
          {
            code: "360340",
            supportYn: "y",
            name: "萍乡经济开发区",
            list: []
          },
          {
            code: "360399",
            supportYn: "y",
            name: "萍乡市市本级",
            list: []
          }
        ]
      },
      {
        code: "360500",
        supportYn: "n",
        name: "新余市",
        list: [
          {
            code: "360502",
            supportYn: "y",
            name: "渝水区",
            list: []
          },
          {
            code: "360521",
            supportYn: "y",
            name: "分宜县",
            list: []
          },
          {
            code: "360540",
            supportYn: "y",
            name: "仙女湖区",
            list: []
          },
          {
            code: "360541",
            supportYn: "y",
            name: "新余高新技术产业园区",
            list: []
          },
          {
            code: "360599",
            supportYn: "y",
            name: "新余市市本级",
            list: []
          }
        ]
      },
      {
        code: "360700",
        supportYn: "n",
        name: "赣州市",
        list: [
          {
            code: "360702",
            supportYn: "y",
            name: "章贡区",
            list: []
          },
          {
            code: "360721",
            supportYn: "y",
            name: "赣县",
            list: []
          },
          {
            code: "360722",
            supportYn: "y",
            name: "信丰县",
            list: []
          },
          {
            code: "360723",
            supportYn: "y",
            name: "大余县",
            list: []
          },
          {
            code: "360724",
            supportYn: "y",
            name: "上犹县",
            list: []
          },
          {
            code: "360725",
            supportYn: "y",
            name: "崇义县",
            list: []
          },
          {
            code: "360726",
            supportYn: "y",
            name: "安远县",
            list: []
          },
          {
            code: "360727",
            supportYn: "y",
            name: "龙南县",
            list: []
          },
          {
            code: "360728",
            supportYn: "y",
            name: "定南县",
            list: []
          },
          {
            code: "360729",
            supportYn: "y",
            name: "全南县",
            list: []
          },
          {
            code: "360730",
            supportYn: "y",
            name: "宁都县",
            list: []
          },
          {
            code: "360731",
            supportYn: "y",
            name: "于都县",
            list: []
          },
          {
            code: "360732",
            supportYn: "y",
            name: "兴国县",
            list: []
          },
          {
            code: "360733",
            supportYn: "y",
            name: "会昌县",
            list: []
          },
          {
            code: "360734",
            supportYn: "y",
            name: "寻乌县",
            list: []
          },
          {
            code: "360735",
            supportYn: "y",
            name: "石城县",
            list: []
          },
          {
            code: "360781",
            supportYn: "y",
            name: "瑞金市",
            list: []
          },
          {
            code: "360782",
            supportYn: "y",
            name: "南康市",
            list: []
          },
          {
            code: "360799",
            supportYn: "y",
            name: "赣州市市本级",
            list: []
          }
        ]
      },
      {
        code: "369900",
        supportYn: "y",
        name: "江西省省本级",
        list: []
      }
    ]
  },
  {
    code: "370000",
    supportYn: "n",
    name: "山东省",
    list: [
      {
        code: "379900",
        supportYn: "y",
        name: "山东省省本级",
        list: []
      }
    ]
  },
  {
    code: "430000",
    supportYn: "n",
    name: "湖南省",
    list: [
      {
        code: "430300",
        supportYn: "n",
        name: "湘潭市",
        list: [
          {
            code: "430302",
            supportYn: "y",
            name: "雨湖区",
            list: []
          },
          {
            code: "430304",
            supportYn: "y",
            name: "岳塘区",
            list: []
          },
          {
            code: "430321",
            supportYn: "y",
            name: "湘潭县",
            list: []
          },
          {
            code: "430381",
            supportYn: "y",
            name: "湘乡市",
            list: []
          },
          {
            code: "430382",
            supportYn: "y",
            name: "韶山市",
            list: []
          },
          {
            code: "430399",
            supportYn: "y",
            name: "湘潭市市本级",
            list: []
          }
        ]
      },
      {
        code: "439900",
        supportYn: "y",
        name: "湖南省省本级",
        list: []
      }
    ]
  },
  {
    code: "450000",
    supportYn: "n",
    name: "广西壮族自治区",
    list: [
      {
        code: "459900",
        supportYn: "y",
        name: "广西壮族自治区区本级",
        list: []
      }
    ]
  },
  {
    code: "460000",
    supportYn: "n",
    name: "海南省",
    list: [
      {
        code: "460100",
        supportYn: "n",
        name: "海口市",
        list: [
          {
            code: "460199",
            supportYn: "y",
            name: "海口市市本级",
            list: []
          }
        ]
      },
      {
        code: "469900",
        supportYn: "y",
        name: "海南省省本级",
        list: []
      }
    ]
  },
  {
    code: "510000",
    supportYn: "n",
    name: "四川省",
    list: [
      {
        code: "511600",
        supportYn: "y",
        name: "广安市",
        list: []
      },
      {
        code: "519900",
        supportYn: "y",
        name: "四川省省本级",
        list: []
      }
    ]
  },
  {
    code: "610000",
    supportYn: "n",
    name: "陕西省",
    list: [
      {
        code: "610300",
        supportYn: "y",
        name: "宝鸡市",
        list: []
      },
      {
        code: "610700",
        supportYn: "y",
        name: "汉中市",
        list: []
      },
      {
        code: "610900",
        supportYn: "y",
        name: "安康市",
        list: []
      },
      {
        code: "611100",
        supportYn: "y",
        name: "杨凌示范区",
        list: []
      }
    ]
  },
  {
    code: "640000",
    supportYn: "n",
    name: "宁夏回族自治区",
    list: [
      {
        code: "640100",
        supportYn: "y",
        name: "银川市",
        list: []
      },
      {
        code: "640200",
        supportYn: "y",
        name: "石嘴山市",
        list: []
      },
      {
        code: "640300",
        supportYn: "y",
        name: "吴忠市",
        list: []
      },
      {
        code: "640400",
        supportYn: "y",
        name: "固原市",
        list: []
      },
      {
        code: "640500",
        supportYn: "y",
        name: "中卫市",
        list: []
      }
    ]
  },
  {
    code: "650000",
    supportYn: "n",
    name: "新疆维吾尔自治区",
    list: [
      {
        code: "659900",
        supportYn: "n",
        name: "新疆维吾尔自治区区本级",
        list: [
          {
            code: "659901",
            supportYn: "y",
            name: "新疆维吾尔自治区区本级（区直）",
            list: [
              {
                name: "4",
                list: [
                  {
                    name: "5"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]

module.exports = data
