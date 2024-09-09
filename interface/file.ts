export type FileType = 'image' | 'text' | 'av';
export type FileObject = {
  type: FileType;
  filePath: string;
};

export enum TaskType {
  None,
  Encrypt,
  Decrypt,
}
