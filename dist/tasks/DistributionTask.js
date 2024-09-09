"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistributionTask = void 0;
var fs = require('fs');
var path = require('path');
// const { ImageEncryptTask } = require('./ImageEncryptTask')
// const { TextEncryptTask } = require('./TextEncryptTask')
// const { AVEncryptTask } = require('./AVEncryptTask')
var AssetsEncryptTask_1 = require("./AssetsEncryptTask");
var DistributionTask = /** @class */ (function () {
    function DistributionTask() {
        // 常用音频文件格式
        // .mp3
        // .wav
        // .ogg
        // .flac
        // .aac
        // 常用视频文件格式
        // .mp4
        // .avi
        // .mov
        // .flv
        // .mkv
        // .wmv
        this._imageExtNames = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp'];
        this._textExtNames = [
            '.json',
            '.txt',
            '.xml',
            '.fnt',
            '.atlas',
            '.tmx',
            '.tsx',
            '.vsh',
            '.fsh',
            '.plist',
        ];
        this._audioExtNames = ['.mp3', '.wav', '.ogg', '.m4a'];
        this._videoExtNames = ['.mp4', '.avi', '.mov', '.mpg', '.mpeg', '.rm', '.rmvb'];
    }
    /**
     * 处理任务
     * @param taskConfig 任务配置
     */
    DistributionTask.prototype.handle = function (taskConfig, type, outputDirPath) {
        var assetsFiles = [];
        this._getAssetsFilePaths(outputDirPath, assetsFiles);
        var imageFiles = assetsFiles.filter(function (file) { return file.type === 'image'; }).map(function (item) { return item.filePath; });
        var textFiles = assetsFiles.filter(function (file) { return file.type === 'text'; }).map(function (item) { return item.filePath; });
        var avFiles = assetsFiles.filter(function (file) { return file.type === 'av'; }).map(function (item) { return item.filePath; });
        console.log('找到所有图片', imageFiles);
        console.log('找到所有文本', textFiles);
        console.log('找到所有音视频', avFiles);
        // imageFiles.length > 0 && new ImageEncryptTask().handle(taskConfig, imageFiles)
        // textFiles.length > 0 && new TextEncryptTask().handle(taskConfig, textFiles)
        // avFiles.length > 0 && new AVEncryptTask().handle(taskConfig, avFiles)
        if (assetsFiles.length > 0) {
            new AssetsEncryptTask_1.AssetsEncryptTask().handle(taskConfig, assetsFiles, type);
        }
    };
    /**
     * 获取所有资源文件路径
     * @param dirPath 资源文件目录路径
     * @param assetsFiles 资源文件对象数组
     */
    DistributionTask.prototype._getAssetsFilePaths = function (dirPath, assetsFiles) {
        if (assetsFiles === void 0) { assetsFiles = []; }
        if (!fs.existsSync(dirPath)) {
            throw new Error("".concat(dirPath, " \u76EE\u5F55\u4E0D\u5B58\u5728"));
        }
        var files = fs.readdirSync(dirPath);
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var fileName = files_1[_i];
            var filePath = path.join(dirPath, fileName.toString());
            var stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                this._getAssetsFilePaths(filePath, assetsFiles);
            }
            else {
                var fileExtName = path.extname(filePath);
                var isImgFile = this._imageExtNames.includes(fileExtName);
                var isTextFile = this._textExtNames.includes(fileExtName);
                var isAVFile = __spreadArray(__spreadArray([], this._audioExtNames, true), this._videoExtNames, true).includes(fileExtName);
                // if (!isImgFile && !isTextFile && !isAVFile) {
                //   continue
                // }
                if (!isImgFile) {
                    continue;
                }
                var fileType = 'image';
                if (isImgFile) {
                    fileType = 'image';
                }
                else if (isTextFile) {
                    fileType = 'text';
                }
                else if (isAVFile) {
                    fileType = 'av';
                }
                assetsFiles.push({
                    type: fileType,
                    filePath: filePath,
                });
            }
        }
    };
    return DistributionTask;
}());
exports.DistributionTask = DistributionTask;
