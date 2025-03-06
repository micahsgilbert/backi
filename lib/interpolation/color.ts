import { ColorType } from './types'

const colorInterpolation = (color1: ColorType, color2: ColorType, progress: number) : ColorType => {
  return color1.mix(color2, progress)
}


export default colorInterpolation
