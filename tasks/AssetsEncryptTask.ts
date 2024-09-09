const fs = require('fs')
// const CryptoJS = require('../ASE.js')
const CryptoJS = require('crypto-js')

import { TaskConfig } from './TaskConfig'
import { TaskInterface } from '../interface/TaskInterface'
import { FileObject, TaskType } from '../interface/file'
// const { createCipheriv, createDecipheriv, randomBytes } = require('crypto');
export class AssetsEncryptTask implements TaskInterface {
  /**
   * 处理任务
   * @param taskConfig 配置参数
   */
  handle(taskConfig: TaskConfig, files: FileObject[], type: TaskType): void {
    if (type === TaskType.Encrypt) {
      // 加密资源文件
      console.log('开始加密资源文件')
      this._encryptFiles(taskConfig, files)
    } else if (type === TaskType.Decrypt) {
      // 解密资源文件
      console.log('开始解密资源文件')

      this._decryptFiles(taskConfig, files)
    }
  }

  /**
   * 加密资源文件
   * @param encodeKey 加密密钥
   * @param files 文件对象数组
   */
  private _encryptFiles(taskConfig: TaskConfig, files: FileObject[]) {
    const { encryptKey, encryptIv } = taskConfig
    const key = CryptoJS.enc.Utf8.parse(encryptKey)
    // const iv = CryptoJS.lib.WordArray.random(16);
    const iv = CryptoJS.enc.Hex.parse(encryptIv)

    files.forEach(({ filePath, type }) => {
      const fileData = fs.readFileSync(filePath)
      const encrypted = CryptoJS.AES.encrypt(fileData.toString('base64'), key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      })
      fs.writeFileSync(filePath, encrypted.toString())
    })
  }

  /**
   * 解密资源文件
   * @param decodeKey 解密密钥
   * @param files 文件对象数组
   */
  private _decryptFiles(taskConfig: TaskConfig, files: FileObject[]) {
    const { encryptKey, encryptIv } = taskConfig
    const key = CryptoJS.enc.Utf8.parse(encryptKey)
    const iv = CryptoJS.enc.Hex.parse(encryptIv)

    files.forEach(({ filePath, type }) => {
      const fileData = fs.readFileSync(filePath, 'utf8') // 读取文件时指定 'utf8' 编码
      const decrypted = CryptoJS.AES.decrypt(fileData, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      })
      console.log('decrypted', decrypted) // 返回的是包含二进制数据的 WordArray 对象
      const decryptedData = Buffer.from(decrypted.toString(CryptoJS.enc.Utf8), 'base64') // 将解密后的 base64 字符串转换回原始数据
      console.log('decryptedData', decryptedData)

      fs.writeFileSync(filePath, decryptedData)
    })
  }
}
