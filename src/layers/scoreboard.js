import LayerBase from './base'
import Point from '../cartesian/point'

export default class ScoreBoardLayer extends LayerBase {
  render(team1, team2, currentEnd){
    const scoreBoardOrigin = new Point(15,15)
    const scoreBoardEnd = new Point(260,100)
    this.drawRectangle(scoreBoardOrigin,scoreBoardEnd,'#2e3fab')
    const team1Y = 40
    const team2Y = 65

    this.drawStones(team1, team1Y - 6)
    this.drawStones(team2, team2Y - 6)

    this.drawText(`team1 - ${team1.score} ${team1.hasLastStone ? '✓' : ''}`,new Point(25,team1Y))
    this.drawText(`team2 - ${team2.score} ${team2.hasLastStone ? '✓' : ''}`,new Point(25,team2Y))

    this.drawText(`end ${currentEnd}`,new Point(25,90))
  }

  drawStones(team, y){
    const stoneSpacing = 15
    for (let i = 0; i < team.stonesRemainingThisEnd; i++) {
      this.drawCircle(new Point(130 + i*stoneSpacing, y), 5, team.color)
    }
  }
}
