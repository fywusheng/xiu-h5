/*
 * @Description: 
 * @Version: 0.1
 * @Autor: Chenyt
 * @Date: 2020-10-27 10:11:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-03 11:40:04
 */
// generateView.js
const chalk = require("chalk")
const path = require("path")
const fs = require("fs")
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))
const { vueTemplate, routerTemplate, routerStr } = require("./template")

const generateFile = (path, data) => {
  if (fs.existsSync(path)) {
    errorLog(`${path}文件已存在`)
    return
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, "utf8", err => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}
const appendFile = (path, data) => {
  return new Promise((resolve, reject) => {
    const datastr = fs.readFileSync(path, "utf8").toString()//readFileSync的第一个参数是文件名
    const dataArry = datastr.split("]")
    // 避免编辑器自动eslint去除路由的最后一个逗号，加判断处理
    const lastWord = dataArry[0].toString()[dataArry[0].toString().length - 1]
    data = (lastWord == "," || lastWord == "[") ? data : `,${data}`
    const dataInsert = dataArry[0] + data + "]"
    fs.writeFile(path, dataInsert, "utf8", err => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}
log("请输入要生成的页面的模块英文名称、会生成在 views/目录下")
// let componentName = ""
let str1, str2, pageChineseName
process.stdin.on("data", async chunk => {
  const inputName = String(chunk).trim().toString().toLowerCase()
  if (inputName == "n") { //结束进程
    process.stdin.emit("end")
  }
  if (!str1) {
    str1 = inputName.endsWith("-module") ? inputName : inputName + "-module"
    const routerNameTemp = `../src/router/${inputName.endsWith("-module") ? inputName.split("-module")[0] : inputName}`

    /**
   * Vue页面组件路径
   */
    const componentVueName = resolve(`../src/views/${str1}`)
    const routeModuleName = resolve(routerNameTemp)
    /**
   * vue组件目录路径
   */
    const componentDirectory = componentVueName
    const hasComponentExists = fs.existsSync(componentVueName)
    const hasRouteExists = fs.existsSync(routeModuleName)
    if (!hasComponentExists) {
      log(`正在生成 component 目录 ${componentDirectory}`)
      await dotExistDirectoryCreate(componentDirectory)
      log(`模块目录/views/${str1}创建成功！`)
    } else {
      successLog("模块选择成功！")
    }
    if (!hasRouteExists) { //创建路由模块文件
      log(`正在生成 路由 目录 ${routeModuleName}`)
      await dotExistDirectoryCreate(routeModuleName)

      log(`模块目录/router/${str1.split("-module")[0]}创建成功！`)
      const routerName = `../src/router/${str1.split("-module")[0]}`
      const routeModuleFileName = resolve(routerName, "index.js")
      await generateFile(routeModuleFileName, routerTemplate(""))
      // await appendFile(routeModuleFileName, routerTemplate(""))
      successLog(`生成路由文件成功，文件在${routerName}路径下`)
    } else {
      successLog("路由模块已经存在")
    }
    log(`请输入要生成的页面中文名称：`)
  } else if (!pageChineseName) {
    pageChineseName = inputName
    log(`请输入"${pageChineseName}"页面英文名称、文件会自动生成在 views/${str1}目录下`)
  } else {
    str2 = inputName
    if (inputName == "n" || inputName == "N") {
      process.stdin.emit("end")
    }
    /**
     * Vue页面组件路径
     */
    const componentVueName = resolve(`../src/views/${str1}/${inputName}`)
    // log(`componentVueName${componentVueName}`)

    /**
     * vue组件目录路径
     */
    const componentDirectory = componentVueName
    const hasComponentExists = fs.existsSync(componentVueName)
    if (!hasComponentExists) {
      log(`正在生成 component 目录 ${componentDirectory}`)
      await dotExistDirectoryCreate(componentDirectory)
    }
    let componentVuePageName = resolve(`../src/views/${str1}/${inputName}`, "index")
    // 如果不是以 .vue 结尾的话，自动加上
    if (!componentVuePageName.endsWith(".vue")) {
      componentVuePageName += ".vue"
    }
    // log(`componentVuePageName${componentVuePageName}`)
    try {
      if (inputName.includes("/")) {
        const inputArr = inputName.split("/")
        componentName = inputArr[inputArr.length - 1]
      } else {
        componentName = inputName
      }
      if (!hasComponentExists) {
        log(`正在生成 vue 文件 ${componentVuePageName}`)
        await generateFile(componentVuePageName, vueTemplate(str2, pageChineseName))
        successLog("页面生成成功")
        successLog(`页面访问路径：http://localhost:9081/#/${str1}/${str2},可直接在浏览器中访问`)
        //追加路由
        appendRouter()
        log(`页面创建成功！继续在模块${str1}下创建页面，请输入页面中文名称，结束请输入：n`)
      } else {
        successLog("模块选择成功！")
      }

    } catch (e) {
      errorLog(e.message)
    }
  }

})

process.stdin.on("end", () => {
  log("感谢使用！")
  log("exit")
  process.exit()
})
async function appendRouter() {
  const routeModuleFileName = resolve(`../src/router/${str1.split("-module")[0]}`, "index.js")
  await appendFile(routeModuleFileName, routerStr(str1, str2, pageChineseName))
  pageChineseName = ""//清空创建名，继续创建
}
function dotExistDirectoryCreate(directory) {
  return new Promise((resolve) => {
    mkdirs(directory, function() {
      resolve(true)
    })
  })
}

// 递归创建目录
function mkdirs(directory, callback) {
  var exists = fs.existsSync(directory)
  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), function() {
      fs.mkdirSync(directory)
      callback()
    })
  }
}
