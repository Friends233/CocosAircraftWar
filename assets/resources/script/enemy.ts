// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {
  /** 屏幕宽度 */
  viewWidth: number = 375
  /** 屏幕高度 */
  viewHeight: number = 667
  /** 敌机移动速度 */
  moveSpeed: number = 50
  /** 血量 */
  blood: number = 3

  addScore: cc.Event.EventCustom = null

  onLoad() {
    this.viewWidth = cc.view.getCanvasSize().width
    this.viewHeight = cc.view.getCanvasSize().height
    this.addScore = new cc.Event.EventCustom('addScore', true)
    this.addScore.detail = {
      score: 1
    }
  }

  start() {

  }

  update(dt) {
    this.node.y -= this.moveSpeed * dt
    if (this.node.y <= -this.viewHeight - this.node.height) {
      this.node.destroy()
    }
  }

  onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    /** 与子弹碰撞 */
    if (other.tag == 1) {
      this.blood--
      if (this.blood <= 0) {
        this.die()
      }
    }
  }

  /** 去世 */
  die() {
    console.log('111')
    this.node.destroy()
    cc.find('Background').dispatchEvent(this.addScore)
  }
}
