"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVEncryptTask = void 0;
var fs = require('fs');
var CryptoJS = require('crypto-js');
var AVEncryptTask = /** @class */ (function () {
    function AVEncryptTask() {
    }
    /**
     * 处理任务
     * @param taskConfig 配置参数
     */
    AVEncryptTask.prototype.handle = function (taskConfig, files) {
        // 加密音视频文件
        this._encryptAVs(taskConfig.encryptKey, files);
        // 解密音视频文件
        // this._decryptAVs(taskConfig.encryptKey, files)
    };
    /**
     * 加密音视频文件
     * @param encodeKey 加密密钥
     * @param AVs 音视频文件路径数组
     */
    AVEncryptTask.prototype._encryptAVs = function (encodeKey, files) {
        var key = CryptoJS.enc.Utf8.parse(encodeKey);
        // const iv = CryptoJS.lib.WordArray.random(16);
        var iv = CryptoJS.enc.Hex.parse('abcdefghijklmnop');
        files.forEach(function (file) {
            var avData = fs.readFileSync(file).toString('base64');
            var encrypted = CryptoJS.AES.encrypt(avData, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            });
            fs.writeFileSync(file, encrypted.toString());
        });
        // fs.writeFileSync('iv.txt', iv.toString());
    };
    /**
     * 解密音视频文件(只适用于本项目运行)
     * @param decodeKey 解密密钥
     * @param AVs 音视频对象数组
     */
    AVEncryptTask.prototype._decryptAVs = function (decodeKey, files) {
        var key = CryptoJS.enc.Utf8.parse(decodeKey);
        // const iv = fs.readFileSync('iv.txt').toString();
        var iv = CryptoJS.enc.Hex.parse('abcdefghijklmnop');
        files.forEach(function (file) {
            var avData = fs.readFileSync(file, 'utf8'); // 读取文件时指定 'utf8' 编码
            var decrypted = CryptoJS.AES.decrypt(avData, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            });
            console.log('decrypted', decrypted); // 返回的是包含二进制数据的 WordArray 对象
            var decryptedData = Buffer.from(decrypted.toString(CryptoJS.enc.Utf8), 'base64'); // 将解密后的 base64 字符串转换回原始数据
            fs.writeFileSync(file, decryptedData);
        });
    };
    return AVEncryptTask;
}());
exports.AVEncryptTask = AVEncryptTask;
