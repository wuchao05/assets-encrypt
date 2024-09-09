import { TaskConfig } from './TaskConfig';
import { FileObject, TaskType } from '../interface/file';
export declare class DistributionTask {
    private readonly _imageExtNames;
    private readonly _textExtNames;
    private readonly _audioExtNames;
    private readonly _videoExtNames;
    /**
     * 处理任务
     * @param taskConfig 任务配置
     */
    handle(taskConfig: TaskConfig, type: TaskType, outputDirPath: string): void;
    /**
     * 获取所有资源文件路径
     * @param dirPath 资源文件目录路径
     * @param assetsFiles 资源文件对象数组
     */
    _getAssetsFilePaths(dirPath: string, assetsFiles?: FileObject[]): void;
}
