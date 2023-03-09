// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Blood extends cc.Component {
  onLoad() { }

  start() {
  }

  // update (dt) {}

  /** 扣血 */
  buckleBlood(fillRange = 1) {
    const blood: cc.Sprite = this.node.getChildByName('blood')
    blood.getComponent(cc.Sprite).fillRange = fillRange
  }
}
