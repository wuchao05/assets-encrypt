"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskType = exports.AssetsEncrypt = void 0;
var DistributionTask_1 = require("./tasks/DistributionTask");
var TaskConfig_1 = require("./tasks/TaskConfig");
var injectDecryptTask_1 = require("./tasks/injectDecryptTask");
var AssetsEncrypt = /** @class */ (function () {
    function AssetsEncrypt() {
    }
    AssetsEncrypt.prototype.start = function (type, outputDirPath) {
        var taskConfig = new TaskConfig_1.TaskConfig();
        console.log("\u5F00\u59CB".concat(type === 1 ? '加密' : '解密', "\u8D44\u6E90"), outputDirPath);
        new DistributionTask_1.DistributionTask().handle(taskConfig, type, outputDirPath);
        console.log('恭喜，资源处理成功！');
        new injectDecryptTask_1.InjectDecryptTask().handle(type, outputDirPath);
    };
    return AssetsEncrypt;
}());
exports.AssetsEncrypt = AssetsEncrypt;
var file_1 = require("./interface/file");
Object.defineProperty(exports, "TaskType", { enumerable: true, get: function () { return file_1.TaskType; } });
