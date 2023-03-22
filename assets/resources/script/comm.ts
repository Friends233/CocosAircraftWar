/** 自定义事件 */
export const CUSTOM_EVENT = {
  /** 增加分数 */
  ADD_SCORE:'ADD_SCORE',
  /** 游戏结束 */
  GAME_OVER:'GAME_OVER',
  /** 获得buff */
  GET_BUFF:'GET_BUFF'
}

/** buff类型 */
export const BUFF_MAP = {
  /** 默认子弹 */
  A:'A',
  /** 激光(速射) */
  L:'L',
  /** 多发直射 */
  B:'B',
  /** 放大穿透 */
  K:'K'
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
  S:'S',
  /** 放大穿透 */
  K:'K'
}

// export type buffTyps = keyof BUFF_TYPE
export type buffTyps = 'L' | 'B' | 'S' | 'A' | 'K'

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

/**
 * 获取概率
 * @param pro 1-100
 */
export function getProbability(pro) {
  const randomAry = [
    ...Array(100-pro).fill(false),
    ...Array(pro).fill(true)
  ]
  const num = Math.floor(randomNum(0,99))
  return randomAry[num]
}