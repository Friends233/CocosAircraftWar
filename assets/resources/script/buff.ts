import { buffTyps, BUFF_MAP, randomNum } from "./comm";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Buff extends cc.Component {
  @property(cc.Prefab)
  buff: cc.Prefab = null

  /** buff类型 */
  buffType:buffTyps = 'B'

  onLoad () {
    // this.getRandomBuff()
  }

  start() {

  }

  // update (dt) {}

  /**
   * 获取随机buff
   */
  getRandomBuff(){
    const buffs = Object.keys(BUFF_MAP)
    const idx = randomNum(0,buffs.length)
    console.log('子弹类型',buffs[idx])
    // this.buffType = buffs[idx]
    this.buffType = 'B'
    const label = this.node.getComponent(cc.Label)
    label.string = this.buffType
  }
}
