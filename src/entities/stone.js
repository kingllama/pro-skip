import SheetRelativePoint from '../sheet/relativePoint'
import SheetPosition from '../sheet/position'
import SheetDimensions from '../sheet/dimensions'
import {feetPlusOffsetY} from '../sheet/utils'
import {pointOffsetInDirection, distanceBetweenTwoPoints} from '../cartesian/utils'
import Point from '../cartesian/point'
import {HOG_PADDING, HOG_TO_TEE, HOG_TO_BACK, STONE_RADIUS} from '../sheet/constants'


const STONE_ACCELERATION = -0.15
const BUTTON = new Point(SheetPosition.centerPositionX(), feetPlusOffsetY(HOG_TO_TEE))

function intendedDistanceToVelocity(distanceInMeters){
  // A = (v_f^2 - v_i^2) / 2d
  // But solving for 'v_i'
  return Math.sqrt(STONE_ACCELERATION * -1 * 2 * distanceInMeters)
}


export default class Stone {
  constructor(intendedPosition, team){
    this.intendedPosition = new SheetRelativePoint(intendedPosition.x, intendedPosition.y)
    this.position = new SheetRelativePoint(intendedPosition.x, SheetPosition.originY())
    this.color = team.color
    this.team = team
    this.direction = 90

    //Pixels / Second
    this.velocity = intendedDistanceToVelocity((this.intendedPosition.y - feetPlusOffsetY(HOG_PADDING)) / SheetDimensions.meter) * SheetDimensions.meter
  }

  isMoving(){
    return this.velocity > 0
  }

  move(elapsedTime){
    if(this.isMoving()){
      const amountToMove = this.pixelsPerSecondToMS(this.velocity, elapsedTime)
      this.movePixelsInDirection(amountToMove)

      if(this.position.y > feetPlusOffsetY(HOG_PADDING)){
        this.slowDown(elapsedTime)
        this.rotate(elapsedTime)
      }
    }
  }

  slowDown(elapsedTime){
    const mps = this.velocity / SheetDimensions.meter
    const accelleration = this.pixelsPerSecondToMS(STONE_ACCELERATION, elapsedTime)
    this.velocity = (mps + accelleration) * SheetDimensions.meter
    if(this.velocity < 0){
      this.velocity = 0
    }
  }

  rotate(elapsedTime){ this.direction } // TODO: implement curling.

  pixelsPerSecondToMS(pixelsPerSecond, timeInMS){
    return (pixelsPerSecond / 1000) * timeInMS
  }

  movePixelsInDirection(pixelsToMove, direction = this.direction){
    this.position = pointOffsetInDirection(this.position, pixelsToMove, direction)
  }

  inBounds(){
    const stoneRadiusInPx = SheetDimensions.feet(STONE_RADIUS)

    // After Hog
    if(this.position.y - stoneRadiusInPx < feetPlusOffsetY(HOG_PADDING) && !this.isMoving()){
      return false
    }

    // Before backline
    if(this.position.y + stoneRadiusInPx > feetPlusOffsetY(HOG_PADDING + HOG_TO_BACK)){
      return false
    }

    if(this.position.x - stoneRadiusInPx <= SheetPosition.originX()){
      return false
    }

    if(this.position.x + stoneRadiusInPx >= SheetPosition.maxX()){
      return false
    }

    return true
  }

  inHouse(){
    return this.distanceToButton() + SheetDimensions.feet(STONE_RADIUS) < SheetDimensions.feet(12)
  }

  distanceToButton(){
    return distanceBetweenTwoPoints(this.position, BUTTON)
  }

}
