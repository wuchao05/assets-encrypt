import { TaskType } from '../interface/file';
export declare class InjectDecryptTask {
    private outputDirPath;
    private type;
    handle(type: TaskType, outputDirPath: string): void;
    /**
     * 复制解密脚本到小游戏项目中
     */
    _copyPluginToProject(): void;
    /**
     * 注入导入脚本的方法
     * @returns
     */
    _injectCCRequire(): void;
    /**
     * 注入解密脚本到main.js
     * @returns
     */
    _injectMainJS(): void;
}
