"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextEncryptTask = void 0;
var fs = require('fs');
var CryptoJS = require('crypto-js');
var TextEncryptTask = /** @class */ (function () {
    function TextEncryptTask() {
    }
    /**
     * 处理任务
     * @param taskConfig 配置参数
     */
    TextEncryptTask.prototype.handle = function (taskConfig, files) {
        // 加密文本文件
        this._encryptText(taskConfig.encryptKey, files);
        // 解密文本文件
        // this._decryptText(taskConfig.encryptKey, files)
    };
    /**
     * 加密文本文件
     * @param encodeKey 加密密钥
     * @param texts 文本文件路径数组
     */
    TextEncryptTask.prototype._encryptText = function (encodeKey, files) {
        var key = CryptoJS.enc.Utf8.parse(encodeKey);
        // const iv = CryptoJS.lib.WordArray.random(16);
        var iv = CryptoJS.enc.Hex.parse('abcdefghijklmnop');
        files.forEach(function (file) {
            var textData = fs.readFileSync(file).toString();
            var encrypted = CryptoJS.AES.encrypt(textData, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            });
            fs.writeFileSync(file, encrypted.toString());
        });
        // fs.writeFileSync('iv.txt', iv.toString());
    };
    /**
     * 解密文本文件
     * @param decodeKey 解密密钥
     * @param texts 文本对象数组
     */
    TextEncryptTask.prototype._decryptText = function (decodeKey, files) {
        var key = CryptoJS.enc.Utf8.parse(decodeKey);
        // const iv = fs.readFileSync('iv.txt').toString();
        var iv = CryptoJS.enc.Hex.parse('abcdefghijklmnop');
        files.forEach(function (file) {
            var textData = fs.readFileSync(file, 'utf8');
            var decrypted = CryptoJS.AES.decrypt(textData, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            });
            var decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
            fs.writeFileSync(file, decryptedData);
        });
    };
    return TextEncryptTask;
}());
exports.TextEncryptTask = TextEncryptTask;
