// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {
  /** 屏幕宽度 */
  viewWidth: number = 375
  /** 屏幕高度 */
  viewHeight: number = 667

  /** 子弹速度 */
  bulletSpeed: number = 200

  isDie:boolean = false

  onLoad() {
    this.viewWidth = cc.view.getVisibleSize().width
    this.viewHeight = cc.view.getVisibleSize().height
  }

  start() {

  }

  update(dt) {
    if(this.isDie) return
    this.node.y += this.bulletSpeed * dt
    if (this.node.y >= this.viewHeight) {
      this.node.destroy()
    }
  }

  onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    /** 与敌机碰撞 */
    if (other.tag == 2) {
      const aui = this.node.getComponent(cc.AudioSource)
      aui.play()
      this.isDie = true
      this.node.opacity = 0
      
      this.schedule(() => {
        this.die()
      }, aui.getDuration(), 1)
      // this.die()
    }
  }

  onCollisionStay(other: cc.Collider, self: cc.Collider) {

  }

  onCollisionExit(other: cc.Collider, self: cc.Collider) {
    // cc.log("|on collision Exit");
  }

  die() {
    this.node.destroy()
  }
}
