"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskConfig = void 0;
/**
 * 任务配置文件
 */
var TaskConfig = /** @class */ (function () {
    function TaskConfig() {
        // public readonly buildOutputResDirPath: string
        // 加密密钥
        this.encryptKey = 'onukD&5ITJeDJB3jV^0ZTlyPgEfdrSBJ';
        // 初始向量
        this.encryptIv = 'abcdefghijklmnop';
        // console.log('当前命令行参数', process.argv)
        // this.buildOutputResDirPath = process.argv[2]
    }
    return TaskConfig;
}());
exports.TaskConfig = TaskConfig;
