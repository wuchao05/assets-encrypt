import { TaskConfig } from './TaskConfig';
import { TaskInterface } from '../interface/TaskInterface';
import { FileObject } from '../interface/file';
export declare class ImageEncryptTask implements TaskInterface {
    /**
     * 处理任务
     * @param taskConfig 配置参数
     */
    handle(taskConfig: TaskConfig, files: FileObject[]): void;
    /**
     * 加密图片
     * @param encodeKey 加密密钥
     * @param imgs 图片文件路径数组
     */
    private _encryptImage;
    /**
     * 解密图片
     * @param decodeKey 解密密钥
     * @param imgs 图片对象数组
     */
    private _decryptImage;
}
