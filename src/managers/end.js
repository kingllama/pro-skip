export default class EndManager {
  constructor(team1, team2, stoneManager){
    this.team1 = team1
    this.team2 = team2
    this.stoneManager = stoneManager
    this.currentEnd = 1
    this.setupEnd()
  }

  setCurrentTeam(){
    this.currentTeam = this.team1.goesFirst() ? this.team1 : this.team2
  }

  changeTeam(){
    if(this.currentTeam == this.team1){
      this.currentTeam = this.team2
    } else {
      this.currentTeam = this.team1
    }
  }

  setupEnd(){
    this.setCurrentTeam()
    this.stoneManager.clearStones()
    this.team1.stonesRemainingThisEnd = 8
    this.team2.stonesRemainingThisEnd = 8
  }

  noTurnsRemain(){
    return !(this.team1.stonesRemainingThisEnd + this.team2.stonesRemainingThisEnd)
  }

  takeTurn(point){
    if(this.stoneManager.noMovingStones()){
      if(this.noTurnsRemain()){
        this.completeEnd()
      }

      this.stoneManager.addStone(point, this.currentTeam)
      if(this.currentTeam === this.team1){
        this.team1.stonesRemainingThisEnd--
      } else {
        this.team2.stonesRemainingThisEnd--
      }

      this.changeTeam()
    }
  }

  completeEnd(){
    this.scoreEnd()
    this.setupEnd()
    this.currentEnd++
  }

  scoreEnd(){
    const sontesInHouse = this.stonesInHouse()

    if(sontesInHouse.length === 0){
      this.blankEnd()
      return
    }

    let scoringStones = 1
    while(sontesInHouse[scoringStones - 1].team === sontesInHouse[scoringStones].team){
      scoringStones++
    }

    this.awardPoints(sontesInHouse[0].team, scoringStones)
  }

  stonesInHouse(){
    return this.stoneManager.stonesInPlay
      .filter((s) => s.inHouse())
      .sort((a,b)=> a.distanceToButton() - b.distanceToButton())
  }

  blankEnd(){
    this.team1.awardNoPoints()
    this.team2.awardNoPoints()
  }

  awardPoints(winningTeam, points){
    winningTeam.awardPoints(points)
    winningTeam.hasLastStone = false

    const losingTeam = winningTeam === this.team1 ? this.team2 : this.team1
    losingTeam.awardNoPoints()
    losingTeam.hasLastStone = true
  }
}
