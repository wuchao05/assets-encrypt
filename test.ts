import { AssetsEncrypt } from './index'

const taskType = Number(process.env.TASK_TYPE || 0)
new AssetsEncrypt().start(
  taskType,
  '/Users/wuchao/workspace/reinforce/project/minigame/cocos-game/2.4.12/HelloWorld-tencent-test/build/wechatgame'
)
