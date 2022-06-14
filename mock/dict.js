/*
 * @Description: 
 * @Version: 0.1
 * @Autor: yjm
 * @LastEditors: Please set LastEditors
 */
import Mock from "mockjs"

export const RandomNormalData = function() {
  const data = []
  const length = Math.floor(Math.random() * 100)
  for (let i = 0; i < length; i++) {
    data.push({
      label: Mock.Random.province(),
      value: `${i}`
    })
  }
  return data
}
export const RandomJsonData = function() {
  const data = {}
  const length = Math.floor(Math.random() * 100)
  for (let i = 0; i < length; i++) {
    data[`${i}`] = Mock.Random.province()
  }

  return data
}

function request(type, isJson) {
  type = Array.isArray(type) ? type : type.split(",")

  const data = {}
  type.map(item => {
    data[item] = isJson ? RandomJsonData() : RandomNormalData()
  })
  console.log(type, data)
  return data
}

export default [
  {
    url: "/getCodeApi",
    type: "post",
    response: config => {
      const { types, isJson } = config.body.data
      const data = request(types, isJson)

      return {
        code: 0,
        data
      }
    }
  }
]