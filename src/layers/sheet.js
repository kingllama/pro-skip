import LayerBase from './base'
import SheetDimensions from '../sheet/dimensions'
import SheetPosition from '../sheet/position'
import {HOG_PADDING, HOG_TO_TEE, HOG_TO_BACK} from '../sheet/constants'
import {feetPlusOffsetY} from '../sheet/utils'
import Point from '../cartesian/point'

export default class SheetLayer extends LayerBase {
  setDefaultX(){
    this.minX = SheetPosition.originX()
    this.maxX = SheetPosition.maxX()
  }

  setDefaultY(){
    this.minY = SheetPosition.originY()
    this.maxY = SheetPosition.maxY()
  }

  feet(n){
    return SheetDimensions.feet(n)
  }

  render(){
    this.setBackgroundColor("white")
    this.drawBackground()
  }

  drawBackground(){
    this.drawHouse()
    this.drawCenterLine()
    this.drawHogLine()
    this.drawTeeLine()
    this.drawBackLine()
  }

  drawCenterLine(){
    const topMid = new Point(this.midX, this.minY)
    const bottomMid = new Point(this.midX, this.maxY)
    this.drawLine(topMid, bottomMid, "black", 2)
  }

  drawHogLine(){
    const hogLineY = feetPlusOffsetY(HOG_PADDING)
    this.drawLine(
      new Point(this.minX, hogLineY),
      new Point(this.maxX, hogLineY),
      "black", 5
    )
  }

  drawTeeLine(){
    const teeLineY = feetPlusOffsetY(HOG_PADDING + HOG_TO_TEE)
    this.drawLine(
      new Point(this.minX, teeLineY),
      new Point(this.maxX, teeLineY),
      "black", 2
    )
  }

  drawBackLine(){

    const backLineY = feetPlusOffsetY(HOG_PADDING + HOG_TO_BACK)
    this.drawLine(
      new Point(this.minX, backLineY),
      new Point(this.maxX, backLineY),
      "black", 2
    )
  }

  drawHouse(){
    const teeLineY = feetPlusOffsetY(HOG_PADDING + HOG_TO_TEE)
    const centerPoint = new Point(this.midX, teeLineY)
    this.drawCircle(
      centerPoint,
      this.feet(6),
      "blue"
    )

    this.drawCircle(
      centerPoint,
      this.feet(4),
      "white"
    )

    this.drawCircle(
      centerPoint,
      this.feet(2),
      "red"
    )

    this.drawCircle(
      centerPoint,
      this.feet(0.75),
      "white"
    )
  }
}
