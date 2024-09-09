import { TaskConfig } from './TaskConfig';
import { TaskInterface } from '../interface/TaskInterface';
import { FileObject } from '../interface/file';
export declare class AVEncryptTask implements TaskInterface {
    /**
     * 处理任务
     * @param taskConfig 配置参数
     */
    handle(taskConfig: TaskConfig, files: FileObject[]): void;
    /**
     * 加密音视频文件
     * @param encodeKey 加密密钥
     * @param AVs 音视频文件路径数组
     */
    private _encryptAVs;
    /**
     * 解密音视频文件(只适用于本项目运行)
     * @param decodeKey 解密密钥
     * @param AVs 音视频对象数组
     */
    private _decryptAVs;
}
