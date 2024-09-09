"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectDecryptTask = void 0;
var fs = require('fs');
var path = require('path');
var file_1 = require("../interface/file");
var InjectDecryptTask = /** @class */ (function () {
    function InjectDecryptTask() {
        this.outputDirPath = '';
        this.type = file_1.TaskType.None;
    }
    InjectDecryptTask.prototype.handle = function (type, outputDirPath) {
        this.type = type;
        this.outputDirPath = outputDirPath;
        this._copyPluginToProject();
        this._injectCCRequire();
        this._injectMainJS();
    };
    /**
     * 复制解密脚本到小游戏项目中
     */
    InjectDecryptTask.prototype._copyPluginToProject = function () {
        var decryptScriptPath = path.join(__dirname, '../decryptPlugin.js');
        var targetDirPath = path.join(this.outputDirPath, 'src/assets');
        var targetFilePath = path.join(this.outputDirPath, 'src/assets/decryptPlugin.js');
        if (!fs.existsSync(decryptScriptPath)) {
            console.log('解密脚本文件不存在');
            return;
        }
        if (this.type === file_1.TaskType.Decrypt) {
            if (fs.existsSync(targetFilePath)) {
                // 删除已注入的脚本文件
                fs.unlinkSync(targetFilePath);
                console.log('注入的解密脚本文件已删除');
            }
            return;
        }
        if (!fs.existsSync(targetDirPath)) {
            fs.mkdirSync(targetDirPath);
        }
        if (fs.existsSync(targetFilePath)) {
            fs.unlinkSync(targetFilePath);
        }
        fs.copyFileSync(decryptScriptPath, targetFilePath);
        console.log('注入解密脚本文件成功');
    };
    /**
     * 注入导入脚本的方法
     * @returns
     */
    InjectDecryptTask.prototype._injectCCRequire = function () {
        var ccRequirePath = path.join(this.outputDirPath, 'ccRequire.js');
        var ccRequireContent = fs.readFileSync(ccRequirePath, 'utf8');
        var moduleMapReg = /moduleMap\s*=\s*{/;
        var moduleMapMatch = ccRequireContent.match(moduleMapReg);
        var moduleMapIndex = moduleMapMatch.index;
        var moduleMapStr = moduleMapMatch[0];
        var injectCodeStr = "\n'src/assets/decryptPlugin.js' () { return require('src/assets/decryptPlugin.js') },";
        if (this.type === file_1.TaskType.Decrypt) {
            // 删除已注入的代码
            var newCCRequireContent_1 = ccRequireContent.replace(injectCodeStr, '');
            fs.writeFileSync(ccRequirePath, newCCRequireContent_1);
            console.log('ccRequire.js注入的导入脚本方法已删除');
            return;
        }
        if (ccRequireContent.indexOf(injectCodeStr) !== -1) {
            console.log('已经注入过moduleMap了');
            return;
        }
        var newCCRequireContent = ccRequireContent.slice(0, moduleMapIndex + moduleMapStr.length) +
            injectCodeStr +
            ccRequireContent.slice(moduleMapIndex + moduleMapStr.length);
        // const splitCode = ccRequireContent.split('let moduleMap = {')
        // const newCCRequireContent = splitCode.join(injectCodeStr)
        fs.writeFileSync(ccRequirePath, newCCRequireContent);
        console.log('注入require成功');
    };
    /**
     * 注入解密脚本到main.js
     * @returns
     */
    InjectDecryptTask.prototype._injectMainJS = function () {
        var mainJSPath = path.join(this.outputDirPath, 'main.js');
        var mainJSContent = fs.readFileSync(mainJSPath, 'utf8');
        var injectCodeReg = /\/\/\s*inject code start[\s\S]*\/\/\s*inject code end\s/;
        if (this.type === file_1.TaskType.Decrypt) {
            // 删除已注入的代码
            var newMainJSContent_1 = mainJSContent.replace(injectCodeReg, '');
            fs.writeFileSync(mainJSPath, newMainJSContent_1);
            console.log('main.js解密脚本导入代码已删除');
            return;
        }
        if (injectCodeReg.test(mainJSContent)) {
            console.log('已经注入过了jsList了');
            return;
        }
        var injectCode = "// inject code start \nsettings.jsList.unshift('assets/decryptPlugin.js')\n// inject code end\n";
        var loadScriptReg = /cc\.assetManager\.loadScript\(/;
        var loadScriptMatch = mainJSContent.match(loadScriptReg);
        var loadScriptIndex = loadScriptMatch.index;
        // const loadScriptStr = loadScriptMatch[0]
        var newMainJSContent = mainJSContent.slice(0, loadScriptIndex) + injectCode + mainJSContent.slice(loadScriptIndex);
        fs.writeFileSync(mainJSPath, newMainJSContent);
        console.log('main.js注入解密脚本成功');
    };
    return InjectDecryptTask;
}());
exports.InjectDecryptTask = InjectDecryptTask;
