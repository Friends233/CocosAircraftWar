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
  maxBlood: number = 5
  /** 血量 */
  blood: number = this.maxBlood

  bloodIns: cc.Node = null

  @property(cc.Prefab)
  bloodStatic: cc.Prefab = null


  addScore: cc.Event.EventCustom = null

  onLoad() {
    this.viewWidth = cc.view.getVisibleSize().width
    this.viewHeight = cc.view.getVisibleSize().height
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
  addBlood() {
    this.bloodIns = cc.instantiate(this.bloodStatic)
    this.bloodIns.y = this.node.height + 5
    this.bloodIns.x = this.node.width / 2
    this.bloodIns.setParent(this.node)
  }

  /** 扣血 */
  buckleBlood(damage = 1) {
    this.node.color = new cc.color(161, 161, 161, 255)
    this.schedule(() => {
      this.node.color = new cc.color(255, 255, 255, 255)
    }, 0.1, 1)
    this.blood -= damage
    const range = (this.blood / this.maxBlood).toFixed(3)
    const bloodScript = this.bloodIns.getComponent('blood')
    bloodScript.buckleBlood(range)
  }

  onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    /** 与子弹碰撞 */
    if (other.tag == 1) {
      /** 已经去世了 */
      if (this.blood <= 0) {
        return
      }
      this.buckleBlood()
      if (this.blood <= 0) {
        this.die()
      }
    }
  }


  /** 去世 */
  die() {
    const ani: cc.AnimationState = this.node.getComponent(cc.Animation).play('enemyDie')
    this.schedule(() => {
      const events = new cc.Event.EventCustom(CUSTOM_EVENT.GET_BUFF, true)
      events.detail = {
        x: this.node.x,
        y: this.node.y
      }
      cc.find('Background').dispatchEvent(events)
      this.node.destroy()
    }, ani.duration, 1)

    this.bloodIns.opacity = 0
    // this.node.destroy()
    cc.find('Background').dispatchEvent(this.addScore)

    this.node.getComponent(cc.AudioSource).play()

  }
}
