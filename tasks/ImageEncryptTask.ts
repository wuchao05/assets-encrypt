const fs = require('fs')
const CryptoJS = require('crypto-js')
import { TaskConfig } from './TaskConfig'
import { TaskInterface } from '../interface/TaskInterface'
// const { createCipheriv, createDecipheriv, randomBytes } = require('crypto');
import { FileObject } from '../interface/file'
export class ImageEncryptTask implements TaskInterface {
  /**
   * 处理任务
   * @param taskConfig 配置参数
   */
  handle(taskConfig: TaskConfig, files: FileObject[]): void {
    // 加密图片文件
    this._encryptImage(taskConfig.encryptKey, files)
    // 解密图片文件
    // this._decryptImage(taskConfig.encryptKey, files)
  }

  /**
   * 加密图片
   * @param encodeKey 加密密钥
   * @param imgs 图片文件路径数组
   */
  private _encryptImage(encodeKey: string, files: FileObject[]) {
    const key = CryptoJS.enc.Utf8.parse(encodeKey)
    // const iv = CryptoJS.lib.WordArray.random(16);
    const iv = CryptoJS.enc.Hex.parse('abcdefghijklmnop')

    files.forEach((file: FileObject) => {
      const imgData = fs.readFileSync(file).toString('base64')
      const encrypted = CryptoJS.AES.encrypt(imgData, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      })
      fs.writeFileSync(file, encrypted.toString())
    })
    // fs.writeFileSync('iv.txt', iv.toString());
  }

  /**
   * 解密图片
   * @param decodeKey 解密密钥
   * @param imgs 图片对象数组
   */
  private _decryptImage(decodeKey: string, files: FileObject[]) {
    const key = CryptoJS.enc.Utf8.parse(decodeKey)
    // const iv = fs.readFileSync('iv.txt').toString();
    const iv = CryptoJS.enc.Hex.parse('abcdefghijklmnop')

    files.forEach((file: FileObject) => {
      const imgData = fs.readFileSync(file, 'utf8') // 读取文件时指定 'utf8' 编码
      const decrypted = CryptoJS.AES.decrypt(imgData, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      })
      console.log('decrypted', decrypted) // 返回的是包含二进制数据的 WordArray 对象
      const decryptedData = Buffer.from(decrypted.toString(CryptoJS.enc.Utf8), 'base64') // 将解密后的 base64 字符串转换回原始数据
      fs.writeFileSync(file, decryptedData)
    })
  }

  // private _encryptImage(encodeKey: string, imgs: ImageObject[]) {
  //     const key: Buffer = Buffer.from(encodeKey);
  //     const iv: Buffer = randomBytes(16);
  //     // const iv: Buffer = Buffer.from('abcdefghijklmnop');

  //     imgs.forEach(img => {
  //         const imgData = fs.readFileSync(img.filePath);
  //         const cipher = createCipheriv('aes-256-cbc', key, iv);
  //         const encrypted = Buffer.concat([cipher.update(imgData), cipher.final()]);
  //         const base64Encrypted = encrypted.toString('base64');
  //         fs.writeFileSync(img.filePath, base64Encrypted);
  //     });
  //     fs.writeFileSync('iv.txt', iv);
  // }

  //     private _decryptImage(decodeKey: string, imgs: ImageObject[]) {
  //         const key: Buffer = Buffer.from(decodeKey);
  //         const iv: Buffer = fs.readFileSync('iv.txt');
  //         // const iv: Buffer = Buffer.from('abcdefghijklmnop');
  //         console.log('img', imgs);

  //         imgs.forEach(img => {
  //             const imgData = fs.readFileSync(img.filePath);
  //             const decodeData = Buffer.from(imgData.toString('utf-8'), 'base64');
  //             const decipher = createDecipheriv('aes-256-cbc', key, iv);
  //             const decrypted = Buffer.concat([decipher.update(decodeData), decipher.final()]);
  //             fs.writeFileSync(img.filePath, decrypted);
  //         });
  //     }
}
