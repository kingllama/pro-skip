/* An interface for canvas's context to be used as a base layer class */
import Point from '../cartesian/point'

function limit(value, min, max){
  if(value < min){
    return min
  } else if (value > max){
    return max
  }
  return value
}

export default class ContextInterface {
  constructor(canvas){
    this.canvas = canvas
    this.ctx = canvas.get2DContext();
    this.setup();
    window.addEventListener('resize', (e)=>{
      this.setup();
    });
  }

  setup(){
    this.setDefaultX()
    this.setDefaultY()
  }

  clear(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
  }

  setDefaultX(){
    this.minX = 0
    this.maxX = this.canvas.width
  }

  setDefaultY(){
    this.minY = 0
    this.maxY = this.canvas.height
  }

  setBackgroundColor(color){
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      this.minX, this.minY,
      this.width, this.height
    );
  }

  fill(color){
    this.ctx.fillStyle = color
    this.ctx.fill()
  }

  drawLine(origin, end, color, thickness){
    this.ctx.strokeStyle = color

    this.ctx.beginPath();
    this.ctx.moveTo(origin.x, origin.y);
    this.ctx.lineWidth = thickness
    this.ctx.lineTo(end.x, end.y);
    this.ctx.stroke();
  }

  drawCircle(origin, radius, color){
    this.ctx.beginPath();
    this.ctx.arc(
      origin.x,
      origin.y,
      radius, 0, Math.PI * 2
    );
    this.fill(color)
  }

  drawRectangle(origin, endpoint, color){
    const length = endpoint.x - origin.x
    const width = endpoint.y - origin.y
    this.ctx.rect(origin.x,origin.y,length,width);
    this.fill(color)
  }

  drawText(text, origin){
    this.ctx.font = "18px Arial";
    this.ctx.fillStyle = "white"
    this.ctx.fillText(text,origin.x, origin.y);
  }

  pointWithinBoundaries(x, y){
    x = limit(x, this.minX, this.maxX)
    y = limit(y, this.minY, this.maxY)

    return new Point(x, y)
  }

  get width(){
    return this.maxX - this.minX
  }

  get height(){
    return this.maxY - this.minY
  }

  get midY(){
    return (this.minY + this.maxY) / 2
  }

  get midX(){
    return (this.minX + this.maxX) / 2
  }
}
