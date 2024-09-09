declare const TaskConfig: any;
type FileType = 'image' | 'text' | 'av';
type FileObject = {
    type: FileType;
    filePath: string;
};
export interface TaskInterface {
    /**
     * 处理任务
     * @param taskConfig 配置参数
     */
    handle(taskConfig: typeof TaskConfig, files: FileObject[]): void;
}
export {};
