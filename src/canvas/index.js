export default class Canvas {
  constructor(){
    this.container = document.getElementById('canvas-container');
    this.canvas = document.createElement('canvas')
    this.container.appendChild(this.canvas)
    this.setCanvasSizeToWindowSize();

    window.addEventListener('resize', (e)=>{
      this.setCanvasSizeToWindowSize();
    });
  }

  setCanvasSizeToWindowSize(){
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  get2DContext(){
    if(!this.twoDContext){
      this.twoDContext = this.canvas.getContext("2d")
    }
    return this.twoDContext
  }

  get width(){
    return this.canvas.width
  }

  get height(){
    return this.canvas.height
  }
}
