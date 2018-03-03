import LayerBase from './base'
import SheetDimensions from '../sheet/dimensions'
import SheetPosition from '../sheet/position'
import {STONE_RADIUS} from '../sheet/constants'

export default class StonesLayer extends LayerBase {
  setDefaultX(){
    const stoneRadius = SheetDimensions.feet(STONE_RADIUS)
    this.minX = SheetPosition.originX() - stoneRadius
    this.maxX = SheetPosition.maxX() + stoneRadius
  }

  setDefaultY(){
    this.minY = SheetPosition.originY()
    this.maxY = SheetPosition.maxY()
  }

  render(stones){
    this.clear()
    for(let stone of stones){
      this.drawStone(stone.position, stone.color)
    }
  }

  drawStone(origin, color){
    this.drawCircle(
      origin,
      SheetDimensions.feet(STONE_RADIUS),
      "grey"
    )

    this.drawCircle(
      origin,
      SheetDimensions.feet(STONE_RADIUS - 0.15),
      color
    )
  }
}
