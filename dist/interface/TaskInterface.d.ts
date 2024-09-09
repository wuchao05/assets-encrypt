import { TaskConfig } from '../tasks/TaskConfig';
import { FileObject, TaskType } from './file';
export interface TaskInterface {
    /**
     * 处理任务
     * @param taskConfig 配置参数
     */
    handle(taskConfig: TaskConfig, files: FileObject[], type: TaskType, outputDirPath: string): void;
}
