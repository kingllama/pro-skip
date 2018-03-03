import Point from './point'

export function windowSize(){
  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

export default class WindowRelativePoint extends Point {
  /* A point bound to a relative position on the window.
   * Use sparingly as too many events can slow things down.
   */
  constructor(x, y){
    super(x, y)
    this.windowBefore = windowSize()
    window.addEventListener('resize', (e)=>{
      const windowNow = windowSize()

      this.x = (this.x / this.windowBefore.width) * (windowNow.width)
      this.y = (this.y / this.windowBefore.height) * (windowNow.height)
      this.windowBefore = windowNow
    });
  }
}
