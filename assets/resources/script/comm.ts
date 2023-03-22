/** 自定义事件 */
export const CUSTOM_EVENT = {
  /** 增加分数 */
  ADD_SCORE:'ADD_SCORE',
  /** 游戏结束 */
  GAME_OVER:'GAME_OVER',
}

/** buff类型 */
export const BUFF_MAP = {
  /** 默认子弹 */
  A:'A',
  /** 激光 */
  L:'L',
  /** 三发直射 */
  B:'B',
  /** 散弹 */
  S:'S'
}
type BUFF_TYPE = {
  /** 默认子弹 */
  A:'A',
  /** 激光 */
  L:'L',
  /** 三发直射 */
  B:'B',
  /** 散弹 */
  S:'S'
}

// export type buffTyps = keyof BUFF_TYPE
export type buffTyps = 'L' | 'B' | 'S' | 'A'

/**
 *  获取区间随机数 [min,max)
 * @export
 * @param {*} min
 * @param {*} max
 * @return {*} 
 */
export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}