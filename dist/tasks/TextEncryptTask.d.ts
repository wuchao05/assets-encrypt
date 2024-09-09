import { TaskConfig } from './TaskConfig';
import { TaskInterface } from '../interface/TaskInterface';
import { FileObject } from '../interface/file';
export declare class TextEncryptTask implements TaskInterface {
    /**
     * 处理任务
     * @param taskConfig 配置参数
     */
    handle(taskConfig: TaskConfig, files: FileObject[]): void;
    /**
     * 加密文本文件
     * @param encodeKey 加密密钥
     * @param texts 文本文件路径数组
     */
    private _encryptText;
    /**
     * 解密文本文件
     * @param decodeKey 解密密钥
     * @param texts 文本对象数组
     */
    private _decryptText;
}
