import SheetDimensions from './dimensions'

export default class SheetPosition {
  static verticalOffset(){
    return 0
  }

  static horizontalOffset(){
    return 0
  }

  static centerPositionX(){
    return this.horizontalOffset() + (window.innerWidth / 2)
  }

  static centerPositionY(){
    return this.verticalOffset() + (SheetDimensions.playAreaPixels() / 2)
  }

  static originX(){
    return this.centerPositionX() - SheetDimensions.halfWidth()
  }

  static maxX(){
    return this.centerPositionX() + SheetDimensions.halfWidth()
  }

  static originY(){
    return this.centerPositionY() - SheetDimensions.halfLength()
  }

  static maxY(){
    return this.centerPositionY() + SheetDimensions.halfLength()
  }

  static applyOffsetX(xValue){
    return this.horizontalOffset() + xValue
  }

  static applyOffsetY(yValue){
    return this.verticalOffset() + yValue
  }
}
