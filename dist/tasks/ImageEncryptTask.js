"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageEncryptTask = void 0;
var fs = require('fs');
var CryptoJS = require('crypto-js');
var ImageEncryptTask = /** @class */ (function () {
    function ImageEncryptTask() {
    }
    /**
     * 处理任务
     * @param taskConfig 配置参数
     */
    ImageEncryptTask.prototype.handle = function (taskConfig, files) {
        // 加密图片文件
        this._encryptImage(taskConfig.encryptKey, files);
        // 解密图片文件
        // this._decryptImage(taskConfig.encryptKey, files)
    };
    /**
     * 加密图片
     * @param encodeKey 加密密钥
     * @param imgs 图片文件路径数组
     */
    ImageEncryptTask.prototype._encryptImage = function (encodeKey, files) {
        var key = CryptoJS.enc.Utf8.parse(encodeKey);
        // const iv = CryptoJS.lib.WordArray.random(16);
        var iv = CryptoJS.enc.Hex.parse('abcdefghijklmnop');
        files.forEach(function (file) {
            var imgData = fs.readFileSync(file).toString('base64');
            var encrypted = CryptoJS.AES.encrypt(imgData, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            });
            fs.writeFileSync(file, encrypted.toString());
        });
        // fs.writeFileSync('iv.txt', iv.toString());
    };
    /**
     * 解密图片
     * @param decodeKey 解密密钥
     * @param imgs 图片对象数组
     */
    ImageEncryptTask.prototype._decryptImage = function (decodeKey, files) {
        var key = CryptoJS.enc.Utf8.parse(decodeKey);
        // const iv = fs.readFileSync('iv.txt').toString();
        var iv = CryptoJS.enc.Hex.parse('abcdefghijklmnop');
        files.forEach(function (file) {
            var imgData = fs.readFileSync(file, 'utf8'); // 读取文件时指定 'utf8' 编码
            var decrypted = CryptoJS.AES.decrypt(imgData, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            });
            console.log('decrypted', decrypted); // 返回的是包含二进制数据的 WordArray 对象
            var decryptedData = Buffer.from(decrypted.toString(CryptoJS.enc.Utf8), 'base64'); // 将解密后的 base64 字符串转换回原始数据
            fs.writeFileSync(file, decryptedData);
        });
    };
    return ImageEncryptTask;
}());
exports.ImageEncryptTask = ImageEncryptTask;
