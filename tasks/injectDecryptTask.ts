const fs = require('fs')
const path = require('path')

import { TaskType } from '../interface/file'

export class InjectDecryptTask {
  private outputDirPath: string = ''
  private type: TaskType = TaskType.None
  handle(type: TaskType, outputDirPath: string) {
    this.type = type
    this.outputDirPath = outputDirPath
    this._copyPluginToProject()
    this._injectCCRequire()
    this._injectMainJS()
  }

  /**
   * 复制解密脚本到小游戏项目中
   */
  _copyPluginToProject() {
    const decryptScriptPath = path.join(__dirname, '../decryptPlugin.js')
    const targetDirPath = path.join(this.outputDirPath, 'src/assets')
    const targetFilePath = path.join(this.outputDirPath, 'src/assets/decryptPlugin.js')

    if (!fs.existsSync(decryptScriptPath)) {
      console.log('解密脚本文件不存在')
      return
    }
    if (this.type === TaskType.Decrypt) {
      if (fs.existsSync(targetFilePath)) {
        // 删除已注入的脚本文件
        fs.unlinkSync(targetFilePath)
        console.log('注入的解密脚本文件已删除')
      }
      return
    }
    if (!fs.existsSync(targetDirPath)) {
      fs.mkdirSync(targetDirPath)
    }
    if (fs.existsSync(targetFilePath)) {
      fs.unlinkSync(targetFilePath)
    }
    fs.copyFileSync(decryptScriptPath, targetFilePath)
    console.log('注入解密脚本文件成功')
  }

  /**
   * 注入导入脚本的方法
   * @returns
   */
  _injectCCRequire() {
    const ccRequirePath = path.join(this.outputDirPath, 'ccRequire.js')
    const ccRequireContent = fs.readFileSync(ccRequirePath, 'utf8')
    const moduleMapReg = /moduleMap\s*=\s*{/
    const moduleMapMatch = ccRequireContent.match(moduleMapReg)
    const moduleMapIndex = moduleMapMatch.index
    const moduleMapStr = moduleMapMatch[0]
    const injectCodeStr = `\n'src/assets/decryptPlugin.js' () { return require('src/assets/decryptPlugin.js') },`
    if (this.type === TaskType.Decrypt) {
      // 删除已注入的代码
      const newCCRequireContent = ccRequireContent.replace(injectCodeStr, '')
      fs.writeFileSync(ccRequirePath, newCCRequireContent)
      console.log('ccRequire.js注入的导入脚本方法已删除')
      return
    }
    if (ccRequireContent.indexOf(injectCodeStr) !== -1) {
      console.log('已经注入过moduleMap了')
      return
    }
    const newCCRequireContent =
      ccRequireContent.slice(0, moduleMapIndex + moduleMapStr.length) +
      injectCodeStr +
      ccRequireContent.slice(moduleMapIndex + moduleMapStr.length)
    // const splitCode = ccRequireContent.split('let moduleMap = {')
    // const newCCRequireContent = splitCode.join(injectCodeStr)
    fs.writeFileSync(ccRequirePath, newCCRequireContent)
    console.log('注入require成功')
  }

  /**
   * 注入解密脚本到main.js
   * @returns
   */
  _injectMainJS() {
    const mainJSPath = path.join(this.outputDirPath, 'main.js')
    const mainJSContent = fs.readFileSync(mainJSPath, 'utf8')
    const injectCodeReg = /\/\/\s*inject code start[\s\S]*\/\/\s*inject code end\s/
    if (this.type === TaskType.Decrypt) {
      // 删除已注入的代码
      const newMainJSContent = mainJSContent.replace(injectCodeReg, '')
      fs.writeFileSync(mainJSPath, newMainJSContent)
      console.log('main.js解密脚本导入代码已删除')
      return
    }

    if (injectCodeReg.test(mainJSContent)) {
      console.log('已经注入过了jsList了')
      return
    }
    const injectCode = `// inject code start \nsettings.jsList.unshift('assets/decryptPlugin.js')\n// inject code end\n`
    const loadScriptReg = /cc\.assetManager\.loadScript\(/
    const loadScriptMatch = mainJSContent.match(loadScriptReg)
    const loadScriptIndex = loadScriptMatch.index
    // const loadScriptStr = loadScriptMatch[0]
    const newMainJSContent = mainJSContent.slice(0, loadScriptIndex) + injectCode + mainJSContent.slice(loadScriptIndex)
    fs.writeFileSync(mainJSPath, newMainJSContent)
    console.log('main.js注入解密脚本成功')
  }
}
