const { ccclass, property } = cc._decorator;

@ccclass
export default class Bg extends cc.Component {
  /** 屏幕宽度 */
  viewWidth: number = 375
  /** 屏幕高度 */
  viewHeight: number = 667

  bgs: cc.Node[] = []

  /** 速度 */
  @property
  speed: number = 133.4

  onLoad() {
    this.viewWidth = cc.view.getCanvasSize().width
    this.viewHeight = cc.view.getCanvasSize().height
    this.bgs = this.node.children
    console.log(this.bgs[0].y,this.bgs[1].y)
  }

  start() {

  }

  update(dt) {
    const bg1 = this.bgs[0]
    const bg2 = this.bgs[1]
    const ary = [bg2,bg1]
    ary.forEach((bg, i) => {
    
      bg.y -= this.speed * dt
      if(bg.y <= -this.viewHeight){
        bg.y += this.viewHeight * 2
      }
    })
  }
}
