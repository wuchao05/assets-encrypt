import { DistributionTask } from './tasks/DistributionTask'
import { TaskConfig } from './tasks/TaskConfig'
import { TaskType } from './interface/file'
import { InjectDecryptTask } from './tasks/injectDecryptTask'
export class AssetsEncrypt {
  start(type: TaskType, outputDirPath: string) {
    const taskConfig = new TaskConfig()
    console.log(`开始${type === 1 ? '加密' : '解密'}资源`, outputDirPath)
    new DistributionTask().handle(taskConfig, type, outputDirPath)
    console.log('恭喜，资源处理成功！')
    new InjectDecryptTask().handle(type, outputDirPath)
  }
}

export { TaskType } from './interface/file'