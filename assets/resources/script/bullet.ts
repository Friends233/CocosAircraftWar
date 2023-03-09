// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  /** 屏幕宽度 */
  viewWidth: number = 375
  /** 屏幕高度 */
  viewHeight: number = 667

  /** 子弹速度 */
  bulletSpeed: number = 300

  onLoad() {
    this.viewWidth = cc.view.getCanvasSize().width
    this.viewHeight = cc.view.getCanvasSize().height
  }

  start() {

  }

  update(dt) {
    this.node.y += this.bulletSpeed * dt
    if(this.node.y >= this.viewHeight){
      this.node.destroy()
    }
  }
}
