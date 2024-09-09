/**
 * 任务配置文件
 */
export class TaskConfig {
  // public readonly buildOutputResDirPath: string
  // 加密密钥
  public readonly encryptKey: string = 'onukD&5ITJeDJB3jV^0ZTlyPgEfdrSBJ'
  // 初始向量
  public readonly encryptIv: string = 'abcdefghijklmnop'

  constructor() {
    // console.log('当前命令行参数', process.argv)
    // this.buildOutputResDirPath = process.argv[2]
  }
}
