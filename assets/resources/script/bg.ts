const { ccclass, property } = cc._decorator;

@ccclass
export default class Bg extends cc.Component {
  /** 屏幕宽度 */
  viewWidth: number = 375
  /** 屏幕高度 */
  viewHeight: number = 667

  bgs: cc.Node[] = []

  /** 顶部背景 */
  topBg:cc.Node = null

  /** 速度 */
  @property
  speed: number = 133.4

  onLoad() {
    this.viewWidth = cc.view.getCanvasSize().width
    this.viewHeight = cc.view.getCanvasSize().height
    this.bgs = this.node.children
    this.topBg = this.bgs[this.bgs.length-1]
  }

  start() {

  }

  update(dt) {
    this.bgs.forEach((bg) => {
      bg.y -= this.speed * dt
      if(bg.y <= -bg.height){
        bg.y = this.topBg.y + bg.height - this.speed*dt
        this.topBg = bg
      }
    })
  }
}
