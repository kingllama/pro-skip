import SheetPosition from './position'
import SheetDimensions from './dimensions'

export function feetPlusOffsetX(value){
  return SheetPosition.applyOffsetX(SheetDimensions.feet(value))
}

export function feetPlusOffsetY(value){
  return SheetPosition.applyOffsetY(SheetDimensions.feet(value))
}
