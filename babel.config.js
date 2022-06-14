/*
 * @Description: babel配置
 * @Autor: guoruliang
 * @Date: 2020-04-03 15:28:36
 * @LastEditors: yjm
 * @LastEditTime: 2021-03-08 15:27:29
 */

module.exports = {
  presets: [
    "@vue/app"
  ],
  plugins: [
    [
      "import",
      {
        libraryName: "@ylz/vant",
        libraryDirectory: "es",
        style: (name) => `${name}/style/less`
      },
      "@ylz/vant"
    ]
  ]
}