const numberInterpolation = (item1: number, item2: number, progress: number) : number => (
  item1 + (item2 - item1) * progress
)

export default numberInterpolation
