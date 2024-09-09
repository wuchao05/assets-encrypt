"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsEncryptTask = void 0;
var fs = require('fs');
// const CryptoJS = require('../ASE.js')
var CryptoJS = require('crypto-js');
var file_1 = require("../interface/file");
// const { createCipheriv, createDecipheriv, randomBytes } = require('crypto');
var AssetsEncryptTask = /** @class */ (function () {
    function AssetsEncryptTask() {
    }
    /**
     * 处理任务
     * @param taskConfig 配置参数
     */
    AssetsEncryptTask.prototype.handle = function (taskConfig, files, type) {
        if (type === file_1.TaskType.Encrypt) {
            // 加密资源文件
            console.log('开始加密资源文件');
            this._encryptFiles(taskConfig, files);
        }
        else if (type === file_1.TaskType.Decrypt) {
            // 解密资源文件
            console.log('开始解密资源文件');
            this._decryptFiles(taskConfig, files);
        }
    };
    /**
     * 加密资源文件
     * @param encodeKey 加密密钥
     * @param files 文件对象数组
     */
    AssetsEncryptTask.prototype._encryptFiles = function (taskConfig, files) {
        var encryptKey = taskConfig.encryptKey, encryptIv = taskConfig.encryptIv;
        var key = CryptoJS.enc.Utf8.parse(encryptKey);
        // const iv = CryptoJS.lib.WordArray.random(16);
        var iv = CryptoJS.enc.Hex.parse(encryptIv);
        files.forEach(function (_a) {
            var filePath = _a.filePath, type = _a.type;
            var fileData = fs.readFileSync(filePath);
            var encrypted = CryptoJS.AES.encrypt(fileData.toString('base64'), key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            });
            fs.writeFileSync(filePath, encrypted.toString());
        });
    };
    /**
     * 解密资源文件
     * @param decodeKey 解密密钥
     * @param files 文件对象数组
     */
    AssetsEncryptTask.prototype._decryptFiles = function (taskConfig, files) {
        var encryptKey = taskConfig.encryptKey, encryptIv = taskConfig.encryptIv;
        var key = CryptoJS.enc.Utf8.parse(encryptKey);
        var iv = CryptoJS.enc.Hex.parse(encryptIv);
        files.forEach(function (_a) {
            var filePath = _a.filePath, type = _a.type;
            var fileData = fs.readFileSync(filePath, 'utf8'); // 读取文件时指定 'utf8' 编码
            var decrypted = CryptoJS.AES.decrypt(fileData, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            });
            console.log('decrypted', decrypted); // 返回的是包含二进制数据的 WordArray 对象
            var decryptedData = Buffer.from(decrypted.toString(CryptoJS.enc.Utf8), 'base64'); // 将解密后的 base64 字符串转换回原始数据
            console.log('decryptedData', decryptedData);
            fs.writeFileSync(filePath, decryptedData);
        });
    };
    return AssetsEncryptTask;
}());
exports.AssetsEncryptTask = AssetsEncryptTask;
