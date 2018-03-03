import Canvas from './canvas'
import LayerBase from './layers/base'
import SheetLayer from './layers/sheet'
import StonesLayer from './layers/stones'
import ScoreBoardLayer from './layers/scoreboard'
import Team from './entities/team'
import StoneManager from './managers/stone'
import EndManager from './managers/end'
import CollisionManager from './managers/collision'

export default class Game {
  setup(){
    this.canvas = new Canvas()
    this.mainLayer = new LayerBase(this.canvas)
    this.sheetLayer = new SheetLayer(this.canvas)
    this.stonesLayer = new StonesLayer()
    this.scoreBoardLayer = new ScoreBoardLayer()

    const team1 = new Team("darkred")
    const team2 = new Team("yellow")

    this.teams = [team1, team2]

    this.determineFirstPlayer()

    this.stoneManager = new StoneManager()
    this.endManager = new EndManager(team1, team2, this.stoneManager)

    this.initialRender();
  }

  determineFirstPlayer(){
    this.teams[Math.round(Math.random())].hasLastStone = true
  }

  initialRender(){
    this.mainRender()
    this.auxilaryRender()
  }

  auxilaryRender(){
    // Layers that don't need to be rendered 60 times a second
    // such as UI components and static backgrounds.
    this.mainLayer.setBackgroundColor("#222641")
    this.sheetLayer.render()
  }

  mainRender(){
    this.stonesLayer.render(this.stoneManager.stonesInPlay)
    this.scoreBoardLayer.render(this.teams[0], this.teams[1], this.endManager.currentEnd)
  }

  start(){
    this.bindEvents()
    this.lastFrameTime = 0
    window.requestAnimationFrame(this.loop.bind(this))
  }

  bindEvents(){
    document.addEventListener('click', (e)=>{
      const newPoint = this.stonesLayer.pointWithinBoundaries(e.clientX, e.clientY)
      this.endManager.takeTurn(newPoint)
    })

    window.addEventListener('resize', (e)=>{
      this.auxilaryRender();
      this.mainRender()
    })
  }

  loop(frameTime){
    const timeSinceLastFrame = this.handleDroppedFrames(frameTime - this.lastFrameTime)
    this.updateGameState(timeSinceLastFrame)
    this.mainRender()

    this.lastFrameTime = frameTime
    window.requestAnimationFrame(this.loop.bind(this))
  }

  updateGameState(timeSinceLastFrame){
    for(let stone of this.stoneManager.stonesInPlay){
      stone.move(timeSinceLastFrame)
      this.stoneManager.removeOutOfBoundsStones()
      CollisionManager.collideAll(this.stoneManager.stonesInPlay)
    }
  }

  handleDroppedFrames(timeSinceLastFrame){
    const defaultFrameLength = 15
    return timeSinceLastFrame < 1000 ? timeSinceLastFrame : defaultFrameLength
  }
}
