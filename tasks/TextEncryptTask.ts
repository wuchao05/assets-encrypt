const fs = require('fs')
const CryptoJS = require('crypto-js')
import { TaskConfig } from './TaskConfig'
import { TaskInterface } from '../interface/TaskInterface'
import { FileObject } from '../interface/file'
export class TextEncryptTask implements TaskInterface {
  /**
   * 处理任务
   * @param taskConfig 配置参数
   */
  handle(taskConfig: TaskConfig, files: FileObject[]) {
    // 加密文本文件
    this._encryptText(taskConfig.encryptKey, files)
    // 解密文本文件
    // this._decryptText(taskConfig.encryptKey, files)
  }

  /**
   * 加密文本文件
   * @param encodeKey 加密密钥
   * @param texts 文本文件路径数组
   */
  private _encryptText(encodeKey: string, files: FileObject[]) {
    const key = CryptoJS.enc.Utf8.parse(encodeKey)
    // const iv = CryptoJS.lib.WordArray.random(16);
    const iv = CryptoJS.enc.Hex.parse('abcdefghijklmnop')
    files.forEach((file: FileObject) => {
      const textData = fs.readFileSync(file).toString()
      const encrypted = CryptoJS.AES.encrypt(textData, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      })
      fs.writeFileSync(file, encrypted.toString())
    })
    // fs.writeFileSync('iv.txt', iv.toString());
  }

  /**
   * 解密文本文件
   * @param decodeKey 解密密钥
   * @param texts 文本对象数组
   */
  private _decryptText(decodeKey: string, files: FileObject[]) {
    const key = CryptoJS.enc.Utf8.parse(decodeKey)
    // const iv = fs.readFileSync('iv.txt').toString();
    const iv = CryptoJS.enc.Hex.parse('abcdefghijklmnop')
    files.forEach((file: FileObject) => {
      const textData = fs.readFileSync(file, 'utf8')
      const decrypted = CryptoJS.AES.decrypt(textData, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      })
      const decryptedData = decrypted.toString(CryptoJS.enc.Utf8)
      fs.writeFileSync(file, decryptedData)
    })
  }
}
