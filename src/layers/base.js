import ContextInterface from '../canvas/contextInterface'
import Canvas from '../canvas'

export default class LayerBase extends ContextInterface {
  constructor(canvas){
    // Optionally pass a canvas in.
    // This can help with performance as creating lots of canvases
    // might slow things down.

    if(canvas === undefined){
      // Generate a new canvas.
      canvas = new Canvas()
    }
    super(canvas)
  }
}
