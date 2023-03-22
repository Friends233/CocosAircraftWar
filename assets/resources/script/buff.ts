import { buffTyps, BUFF_MAP, getProbability, randomNum } from "./comm";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Buff extends cc.Component {
  /** 屏幕宽度 */
  viewWidth: number = 375
  /** 屏幕高度 */
  viewHeight: number = 667
  /** buff类型 */
  buffType: buffTyps = 'B'

  /** 速度 */
  speed: number = 30

  speedX: number = 15

  isLeft = false

  onLoad() {
    this.viewWidth = cc.view.getVisibleSize().width
    this.viewHeight = cc.view.getVisibleSize().height
    this.getRandomBuff()
    this.isLeft = this.node.x > this.viewWidth / 2
  }

  start() {

  }

  update(dt) {
    this.node.y -= this.speed * dt
    this.node.x -= this.speedX * dt * (this.isLeft ? 1 : -1)
    if (this.node.y <= -this.viewHeight - this.node.height
      || this.node.x <= -this.node.width
      || this.node.x >= this.viewWidth + this.node.width) {
      this.node.destroy()
    }
  }

  /**
   * 获取随机buff
   */
  getRandomBuff() {
    const buffs = Object.keys(BUFF_MAP)
    const idx = randomNum(1, buffs.length)
    // console.log('子弹类型',buffs[idx])
    this.buffType = buffs[idx]
    const label = this.node.getComponent(cc.Label)
    label.string = this.buffType
  }
}
