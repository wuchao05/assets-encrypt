const fs = require('fs')
const CryptoJS = require('crypto-js')
import { TaskConfig } from './TaskConfig'
import { TaskInterface } from '../interface/TaskInterface'
import { FileObject } from '../interface/file'
export class AVEncryptTask implements TaskInterface {
  /**
   * 处理任务
   * @param taskConfig 配置参数
   */
  handle(taskConfig: TaskConfig, files: FileObject[]) {
    // 加密音视频文件
    this._encryptAVs(taskConfig.encryptKey, files)
    // 解密音视频文件
    // this._decryptAVs(taskConfig.encryptKey, files)
  }

  /**
   * 加密音视频文件
   * @param encodeKey 加密密钥
   * @param AVs 音视频文件路径数组
   */
  private _encryptAVs(encodeKey: string, files: FileObject[]) {
    const key = CryptoJS.enc.Utf8.parse(encodeKey)
    // const iv = CryptoJS.lib.WordArray.random(16);
    const iv = CryptoJS.enc.Hex.parse('abcdefghijklmnop')

    files.forEach(file => {
      const avData = fs.readFileSync(file).toString('base64')
      const encrypted = CryptoJS.AES.encrypt(avData, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      })
      fs.writeFileSync(file, encrypted.toString())
    })
    // fs.writeFileSync('iv.txt', iv.toString());
  }

  /**
   * 解密音视频文件(只适用于本项目运行)
   * @param decodeKey 解密密钥
   * @param AVs 音视频对象数组
   */
  private _decryptAVs(decodeKey: string, files: FileObject[]) {
    const key = CryptoJS.enc.Utf8.parse(decodeKey)
    // const iv = fs.readFileSync('iv.txt').toString();
    const iv = CryptoJS.enc.Hex.parse('abcdefghijklmnop')

    files.forEach(file => {
      const avData = fs.readFileSync(file, 'utf8') // 读取文件时指定 'utf8' 编码
      const decrypted = CryptoJS.AES.decrypt(avData, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      })
      console.log('decrypted', decrypted) // 返回的是包含二进制数据的 WordArray 对象
      const decryptedData = Buffer.from(decrypted.toString(CryptoJS.enc.Utf8), 'base64') // 将解密后的 base64 字符串转换回原始数据
      fs.writeFileSync(file, decryptedData)
    })
  }
}
