import { TaskConfig } from './TaskConfig';
import { TaskInterface } from '../interface/TaskInterface';
import { FileObject, TaskType } from '../interface/file';
export declare class AssetsEncryptTask implements TaskInterface {
    /**
     * 处理任务
     * @param taskConfig 配置参数
     */
    handle(taskConfig: TaskConfig, files: FileObject[], type: TaskType): void;
    /**
     * 加密资源文件
     * @param encodeKey 加密密钥
     * @param files 文件对象数组
     */
    private _encryptFiles;
    /**
     * 解密资源文件
     * @param decodeKey 解密密钥
     * @param files 文件对象数组
     */
    private _decryptFiles;
}
