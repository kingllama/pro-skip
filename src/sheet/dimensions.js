import {
  HOG_PADDING,
  HOG_TO_TEE,
  TEE_TO_BACK,
  BACK_PADDING
} from './constants'

export default class SheetDimensions {
  static playAreaPixels(){
    return window.innerHeight
  }

  static playAreaFeet(){
    return HOG_PADDING + HOG_TO_TEE + TEE_TO_BACK + BACK_PADDING
  }

  static get foot(){
    return this.playAreaPixels() / this.playAreaFeet()
  }

  static get meter(){
    return this.playAreaPixels() / (this.playAreaFeet() * 0.3048)
  }

  static meters(n){
    return this.meter * n
  }

  static feet(n){
    return this.foot * n
  }

  static width(){
    return this.foot * 14
  }

  static halfWidth(){
    return this.width() / 2
  }

  static length(){
    return this.playAreaPixels()
  }

  static halfLength(){
    return this.length() / 2
  }
}
