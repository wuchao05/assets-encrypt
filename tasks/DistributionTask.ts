const fs = require('fs')
const path = require('path')
// const { ImageEncryptTask } = require('./ImageEncryptTask')
// const { TextEncryptTask } = require('./TextEncryptTask')
// const { AVEncryptTask } = require('./AVEncryptTask')
import { AssetsEncryptTask } from './AssetsEncryptTask'
import { TaskConfig } from './TaskConfig'
import { FileObject, FileType, TaskType } from '../interface/file'

export class DistributionTask {
  // 常用音频文件格式
  // .mp3
  // .wav
  // .ogg
  // .flac
  // .aac

  // 常用视频文件格式
  // .mp4
  // .avi
  // .mov
  // .flv
  // .mkv
  // .wmv
  private readonly _imageExtNames: string[] = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp']
  private readonly _textExtNames: string[] = [
    '.json',
    '.txt',
    '.xml',
    '.fnt',
    '.atlas',
    '.tmx',
    '.tsx',
    '.vsh',
    '.fsh',
    '.plist',
  ]
  private readonly _audioExtNames: string[] = ['.mp3', '.wav', '.ogg', '.m4a']
  private readonly _videoExtNames: string[] = ['.mp4', '.avi', '.mov', '.mpg', '.mpeg', '.rm', '.rmvb']
  /**
   * 处理任务
   * @param taskConfig 任务配置
   */
  handle(taskConfig: TaskConfig, type: TaskType, outputDirPath: string) {
    const assetsFiles: FileObject[] = []
    this._getAssetsFilePaths(outputDirPath, assetsFiles)
    const imageFiles = assetsFiles.filter(file => file.type === 'image').map(item => item.filePath)
    const textFiles = assetsFiles.filter(file => file.type === 'text').map(item => item.filePath)
    const avFiles = assetsFiles.filter(file => file.type === 'av').map(item => item.filePath)
    console.log('找到所有图片', imageFiles)
    console.log('找到所有文本', textFiles)
    console.log('找到所有音视频', avFiles)
    // imageFiles.length > 0 && new ImageEncryptTask().handle(taskConfig, imageFiles)
    // textFiles.length > 0 && new TextEncryptTask().handle(taskConfig, textFiles)
    // avFiles.length > 0 && new AVEncryptTask().handle(taskConfig, avFiles)
    if (assetsFiles.length > 0) {
      new AssetsEncryptTask().handle(taskConfig, assetsFiles, type)
    }
  }
  /**
   * 获取所有资源文件路径
   * @param dirPath 资源文件目录路径
   * @param assetsFiles 资源文件对象数组
   */
  _getAssetsFilePaths(dirPath: string, assetsFiles: FileObject[] = []) {
    if (!fs.existsSync(dirPath)) {
      throw new Error(`${dirPath} 目录不存在`)
    }
    let files = fs.readdirSync(dirPath)

    for (const fileName of files) {
      const filePath = path.join(dirPath, fileName.toString())
      const stat: typeof fs.Stats = fs.statSync(filePath)
      if (stat.isDirectory()) {
        this._getAssetsFilePaths(filePath, assetsFiles)
      } else {
        const fileExtName = path.extname(filePath)
        const isImgFile = this._imageExtNames.includes(fileExtName)
        const isTextFile = this._textExtNames.includes(fileExtName)
        const isAVFile = [...this._audioExtNames, ...this._videoExtNames].includes(fileExtName)
        // if (!isImgFile && !isTextFile && !isAVFile) {
        //   continue
        // }
        if (!isImgFile) {
          continue
        }
        let fileType: FileType = 'image'
        if (isImgFile) {
          fileType = 'image'
        } else if (isTextFile) {
          fileType = 'text'
        } else if (isAVFile) {
          fileType = 'av'
        }
        assetsFiles.push({
          type: fileType,
          filePath,
        })
      }
    }
  }
}
