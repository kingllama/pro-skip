import SheetPosition from './position'
import SheetDimensions from './dimensions'
import Point from '../cartesian/point'

export default class SheetRelativePoint extends Point {
  generateRelativeX(absoluteX){
    this.relativeX = (absoluteX - SheetPosition.originX()) / SheetDimensions.width()
  }

  generateRelativeY(absoluteY){
    this.relativeY = (absoluteY - SheetPosition.originY()) / SheetDimensions.length()
  }

  get x(){
    return (this.relativeX * SheetDimensions.width()) + SheetPosition.originX()
  }

  get y(){
    return (this.relativeY * SheetDimensions.length()) + SheetPosition.originY()
  }

  set x(newAbsoluteX){
    this.generateRelativeX(newAbsoluteX)
  }

  set y(newAbsoluteY){
    this.generateRelativeY(newAbsoluteY)
  }
}
