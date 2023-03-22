// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { buffTyps, BUFF_MAP } from "./comm";

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
  bullet: cc.Prefab = null


  /** 子弹发射间隔 */
  bulletCd: number = 0.3

  /** 子弹类型 */
  bulletType: buffTyps = 'A'

  onLoad() {
    this.viewWidth = cc.view.getVisibleSize().width
    this.viewHeight = cc.view.getVisibleSize().height
  }

  start() {
    this.addNodeListener()
    this.refreshShootSchedule()
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

  /** 发射子弹计时器 */
  shootSchedule() {
    console.log('发射', this.bulletCd, this.bulletType)
    this.shoot()
  }

  /** 刷新子弹发射计时器 */
  refreshShootSchedule() {
    this.unschedule(this.shootSchedule)
    console.log('刷新', this.bulletCd)
    this.schedule(this.shootSchedule, this.bulletCd)
  }

  /** 发射子弹 */
  shoot() {
    switch (this.bulletType) {
      /** 普通子弹 */
      case BUFF_MAP.A:
        const bullet = cc.instantiate(this.bullet)
        bullet.y = this.node.y
        bullet.x = this.node.x
        bullet.setParent(cc.director.getScene())
        this.node.getComponent(cc.AudioSource).play()
        this.bulletCd = 0.3
        break;
      /** 齐射弹 */
      case BUFF_MAP.B:
        const maxnum = 5
        const offsetX = 10
        const copy = cc.instantiate(this.bullet)
        let posx = Math.floor((copy.width + offsetX) * maxnum / 2) + offsetX - 2
        for (let i = 1; i <= maxnum; i++) {
          const bullet = cc.instantiate(this.bullet)
          bullet.y = this.node.y
          bullet.x = this.node.x + (i * (bullet.width + offsetX)) - posx
          bullet.setParent(cc.director.getScene())
          this.node.getComponent(cc.AudioSource).play()
        }
        this.bulletCd = 0.3
        break;
      /** 散弹 TODO 待实现 */
      case BUFF_MAP.S:
        const bullet:cc.Node = cc.instantiate(this.bullet)
        bullet.y = this.node.y
        bullet.x = this.node.x
        bullet.setParent(cc.director.getScene())
        this.node.getComponent(cc.AudioSource).play()
        this.bulletCd = 0.3
        break;
      /** 激光（假的，快速子弹） */
      case BUFF_MAP.L:
        const bullet = cc.instantiate(this.bullet)
        bullet.y = this.node.y
        bullet.x = this.node.x
        bullet.setParent(cc.director.getScene())
        this.node.getComponent(cc.AudioSource).play()
        this.bulletCd = 0.1
        break;
    }

  }

  /**
   * 设置buff
   * @param buff 
   */
  setBuff(buff: buffTyps) {
    this.bulletType = buff
    this.scheduleOnce(() => {
      this.refreshShootSchedule()
    }, 0.3)

  }

  onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    /** 与敌机碰撞 */
    if (other.tag == 2 && other.node.getComponent('enemy').blood > 0) {
      console.log('game over')
      cc.game.pause()
    }

    /** 与buff碰撞 */
    if (other.tag == 99) {
      const buff = other.node.getComponent(cc.Label).string
      other.node.destroy()
      this.setBuff(buff)
    }
  }

  onCollisionStay(other: cc.Collider, self: cc.Collider) {
  }

  onCollisionExit(other: cc.Collider, self: cc.Collider) {
    // cc.log("|on collision Exit");
  }
}
