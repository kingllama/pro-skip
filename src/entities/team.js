export default class Team {
  constructor(color){
    this.color = color
    this.endScores = [] //The score per end
    this.stonesRemainingThisEnd = 8
    this.hasLastStone = false //determine player order
  }

  get score(){
    return this.endScores.reduce((points, acc)=>{return points + acc},0)
  }

  awardPoints(points){
    this.endScores.push(points)
  }

  awardNoPoints(){
    this.endScores.push(0)
  }

  goesFirst(){
    return !this.hasLastStone
  }
}
