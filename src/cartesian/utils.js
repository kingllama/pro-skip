import Point from './point'

export function angleBetweenTwoPoints(pointA,pointB){
  let theta = Math.atan2(pointB.x - pointA.x, pointB.y - pointA.y) + (Math.PI / 2)
  if(theta < 0){
    theta = Math.abs(theta)
  }

  const RAD_TO_DEG = 57.2957795130823209;
  return theta * RAD_TO_DEG
}

export function distanceBetweenTwoPoints(pointA, pointB){
  const differenceX = Math.abs(pointA.x - pointB.x)
  const differenceY = Math.abs(pointA.y - pointB.y)
  return (differenceX + differenceY)
}

export function pointOffsetInDirection(point, distance, direction){
  const percentOfDirection = (direction / 180) - 0.5
  return new point.constructor(
    point.x + (distance * percentOfDirection),
    point.y + (distance * (1 - percentOfDirection))
  )
}
