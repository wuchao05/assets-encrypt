export type FileType = 'image' | 'text' | 'av';
export type FileObject = {
    type: FileType;
    filePath: string;
};
export declare enum TaskType {
    None = 0,
    Encrypt = 1,
    Decrypt = 2
}
