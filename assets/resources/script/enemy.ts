// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { CUSTOM_EVENT } from "./comm";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {
  /** 屏幕宽度 */
  viewWidth: number = 375
  /** 屏幕高度 */
  viewHeight: number = 667
  /** 敌机移动速度 */
  moveSpeed: number = 50
  /** 最大血量 */
  maxBlood:number = 3
  /** 血量 */
  blood: number = this.maxBlood

  bloodIns: cc.Node = null

  @property(cc.Prefab)
  bloodStatic: cc.Prefab = null

  addScore: cc.Event.EventCustom = null

  onLoad() {
    this.viewWidth = cc.view.getCanvasSize().width
    this.viewHeight = cc.view.getCanvasSize().height
  }

  start() {
    this.addScore = new cc.Event.EventCustom(CUSTOM_EVENT.ADD_SCORE, true)
    this.addScore.detail = {
      score: 1
    }
    this.addBlood()
  }

  update(dt) {
    this.node.y -= this.moveSpeed * dt
    if (this.node.y <= -this.viewHeight - this.node.height) {
      this.node.destroy()
    }
  }

  /** 添加血条 */
  addBlood(){
    this.bloodIns = cc.instantiate(this.bloodStatic)
    this.bloodIns.y = this.node.height + 5
    this.bloodIns.x = this.node.width / 2
    this.bloodIns.setParent(this.node)
  }

  /** 扣血 */
  buckleBlood(damage=1) {
    this.blood -= damage
    const range = (this.blood / this.maxBlood).toFixed(3)
    const bloodScript = this.bloodIns.getComponent('blood')
    bloodScript.buckleBlood(range)
  }

  onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    /** 与子弹碰撞 */
    if (other.tag == 1) {
      this.buckleBlood()
      if (this.blood <= 0) {
        this.die()
      }
    }
  }

  /** 去世 */
  die() {
    this.node.destroy()
    cc.find('Background').dispatchEvent(this.addScore)
  }
}
