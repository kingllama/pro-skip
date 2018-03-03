import SheetDimensions from '../sheet/dimensions'
import {STONE_RADIUS} from '../sheet/constants'
import {angleBetweenTwoPoints, distanceBetweenTwoPoints} from '../cartesian/utils'

const STONE_DIAMETER_IN_PX = SheetDimensions.feet(STONE_RADIUS * 2)

export default class CollisionManager {
  static collideAll(stonesInPlay){
    for(let stoneA of stonesInPlay){
      if(stoneA.isMoving()){
        for(let stoneB of stonesInPlay){
          if(this.canCollide(stoneA, stoneB)){
            new CollisionHandler(stoneA, stoneB)
          }
        }
      }
    }
  }

  static canCollide(stoneA, stoneB){
    // At the moment, only collide moving stones with stationary stones.
    // as the collision code gets more sophisticated, this shouldn't be an issue.
    return (stoneA !== stoneB && !stoneB.isMoving())
  }
}

class CollisionHandler {
  // There are a lot of issues here as I have tried to do this based off of intuition
  // Rather than coding the physics proper.
  // Most notibly is how velocity is handled, as there is only velocity in 1D.

  setDistanceBetweenStones(){
    this.distanceBetweenStones = distanceBetweenTwoPoints(
      this.movingStone.position,
      this.stationaryStone.position
    )
  }

  setAngleBetweenStones(){
    this.angleBetweenStones = angleBetweenTwoPoints(
      this.movingStone.position,
      this.stationaryStone.position
    )
  }

  constructor(movingStone, stationaryStone){
    this.movingStone = movingStone
    this.stationaryStone = stationaryStone
    this.setDistanceBetweenStones()

    this.collision = this.checkIfStonesAreTouching()

    if(this.collision){
      this.collideStones()
    }
  }

  checkIfStonesAreTouching(){
    return this.distanceBetweenStones <= STONE_DIAMETER_IN_PX
  }

  collideStones(){
    this.moveStoneForSolidImpact()

    this.setValuesForCollision()
    this.effectVelocity()
    this.effectDirection()
  }

  moveStoneForSolidImpact(){
    if(this.distanceBetweenStones < STONE_DIAMETER_IN_PX){
      const distanceToMove = STONE_DIAMETER_IN_PX - this.distanceBetweenStones
      const oppositeDirection = (this.movingStone.direction - 180) * -1

      this.movingStone.movePixelsInDirection(distanceToMove, oppositeDirection)
    }
  }

  setValuesForCollision(){
    this.setDistanceBetweenStones()
    this.setAngleBetweenStones()
  }

  effectVelocity(){
    const collisionPercent = this.percentOfCollision()
    this.stationaryStone.velocity = this.movingStone.velocity * (1 - collisionPercent)
    this.movingStone.velocity = this.movingStone.velocity * collisionPercent
  }

  percentOfCollision(){
    const angle = ((this.angleBetweenStones - 90 + this.movingStone.direction))
    const radians = angle / 180 * Math.PI
    const offset = Math.cos(radians) * this.distanceBetweenStones

    return Math.abs(offset) / STONE_DIAMETER_IN_PX
  }

  effectDirection(){
    this.stationaryStone.direction = this.angleBetweenStones
    this.movingStone.direction = 180 - this.angleBetweenStones
  }
}
