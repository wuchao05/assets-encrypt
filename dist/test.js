"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var taskType = Number(process.env.TASK_TYPE || 0);
new index_1.AssetsEncrypt().start(taskType, '/Users/wuchao/workspace/reinforce/project/minigame/cocos-game/2.4.12/HelloWorld-tencent-test/build/wechatgame');
