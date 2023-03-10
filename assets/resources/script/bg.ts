import { CUSTOM_EVENT, randomNum } from "./comm";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Bg extends cc.Component {
  /** 屏幕宽度 */
  viewWidth: number = 375
  /** 屏幕高度 */
  viewHeight: number = 667

  bgs: cc.Node[] = []

  /** 顶部背景 */
  topBg: cc.Node = null

  /** 速度 */
  @property
  speed: number = 133.4

  /** 敌机模板 */
  @property(cc.Prefab)
  enemy: cc.Prefab = null

  @property(cc.Label)
  scoreLable:cc.Label = null

  /** 得分 */
  scoreNum:number = 0

  /** 出现敌人的间隔 */
  addEnemySpeed: number = 2


  onLoad() {
    this.viewWidth = cc.view.getFrameSize().width
    this.viewHeight = cc.view.getFrameSize().height
    this.bgs = this.node.children
    this.topBg = this.bgs[this.bgs.length - 1]

    /** 开启碰撞检测 */
    const cm = cc.director.getCollisionManager()
    cm.enabled = true
  }

  start() {
    this.schedule(() => {
      this.addEnemy()
    }, this.addEnemySpeed)
    this.node.on(CUSTOM_EVENT.ADD_SCORE,({detail}) => {
      this.scoreNum += detail.score
      this.scoreLable.string = "得分："+ this.scoreNum 
    })
  }

  update(dt) {
    this.bgs.forEach((bg) => {
      bg.y -= this.speed * dt
      if (bg.y <= -bg.height) {
        bg.y = this.topBg.y + bg.height - this.speed * dt
        this.topBg = bg
      }
    })
  }

  /** 添加敌人 */
  addEnemy() {
    const enemy = cc.instantiate(this.enemy)
    enemy.y = this.viewHeight
    enemy.x = randomNum(0, this.viewWidth - enemy.width)
    enemy.setParent(cc.director.getScene())
  }
}
