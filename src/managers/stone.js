import Stone from '../entities/stone'

export default class StoneManager {
  constructor(){
    this.stonesInPlay = []
  }

  noMovingStones(){
    for(let stone of this.stonesInPlay){
      if(stone.isMoving()){
        return false
      }
    }
    return true
  }

  addStone(newStonePoint, team){
    if(this.noMovingStones()){
      const stone = new Stone(newStonePoint, team)
      this.stonesInPlay.push(stone)
    }
  }

  clearStones(){
    this.stonesInPlay = []
  }

  removeOutOfBoundsStones(){
    this.stonesInPlay = this.stonesInPlay.filter( stone => stone.inBounds() )
  }
}
