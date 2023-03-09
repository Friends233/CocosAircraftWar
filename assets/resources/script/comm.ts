/** 自定义事件 */
export const CUSTOM_EVENT = {
  /** 增加分数 */
  ADD_SCORE:'ADD_SCORE',
  /** 游戏结束 */
  GAME_OVER:'GAME_OVER',
}

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