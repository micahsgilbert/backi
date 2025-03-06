import numberInterpolation from './number'
import colorInterpolation from './color'
import unitsInterpolation from './units'
import { Interpolatable, Unit } from './types'
import Color from 'color'

const interpolate = (item1: any, item2: any, progress: number) : Interpolatable | undefined => {
  if (!isNaN(item1) && !isNaN(item2)) {
    return numberInterpolation(item1 as number, item2 as number, progress)
  }
  else if (typeof item1 == "string" && typeof item2 == "string") {
    if ((item1.endsWith("px") && item2.endsWith("px")) || (item1.endsWith("%") && item2.endsWith("%"))) {
      return unitsInterpolation((item1 as Unit), (item2 as Unit), progress)
    }
    else {
      return colorInterpolation(Color(item1), Color(item2), progress)
    }
  } 
  throw Error(`Cannot interpolate ${item1} and ${item2}`)
}

export default interpolate
