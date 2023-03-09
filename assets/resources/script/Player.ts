// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component {
  /** 屏幕宽度 */
  viewWidth: number = 375
  /** 屏幕高度 */
  viewHeight: number = 667

  /** 是否选中玩家 */
  selected: boolean = false

  /** 玩家子弹 */
  @property(cc.Prefab)
  bullet:cc.Prefab = null


  /** 子弹发射间隔 */

  bulletCd: number = 0.5

  onLoad() {
    this.viewWidth = cc.view.getCanvasSize().width
    this.viewHeight = cc.view.getCanvasSize().height
  }

  start() {
    this.addNodeListener()
    this.schedule(() => {
      this.shoot()
    }, this.bulletCd)
  }

  /** 添加节点的监听事件 */
  addNodeListener() {
    const player = this.node
    player.on(cc.Node.EventType.TOUCH_START, () => {
      this.selected = true
    }, true)
    player.on(cc.Node.EventType.TOUCH_END, () => {
      this.selected = false
    }, true)
    player.on(cc.Node.EventType.TOUCH_MOVE, (e: cc.Event.EventTouch) => {
      if (this.selected) {
        const pos: cc.Vec2 = e.getPreviousLocation()
        const posX = Math.min(Math.max(pos.x, player.width / 2), this.viewWidth - player.width / 2)
        const posY = Math.min(Math.max(pos.y, player.height / 2), this.viewHeight - player.height / 2)
        player.setPosition(posX, posY)
      }
    }, true)
  }

  update(dt) {

  }

  /** 发射子弹 */
  shoot() {
    const bullet = cc.instantiate(this.bullet)
    bullet.y = this.node.y
    bullet.x = this.node.x
    bullet.setParent(cc.director.getScene())
  }

  onCollisionEnter(other:cc.Collider,self:cc.Collider) {
    /** 与敌机碰撞 */
    if(other.tag == 2){
      console.log('game over')
      cc.game.pause()
    }
  }

  onCollisionStay(other:cc.Collider,self:cc.Collider) {
  }

  onCollisionExit(other:cc.Collider,self:cc.Collider) {
    // cc.log("|on collision Exit");
  }
}
