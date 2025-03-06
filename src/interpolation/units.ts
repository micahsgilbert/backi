import { Unit } from "./types"
import numberInterpolation from "./number";

const splitValue = value => {
    const match = value.match(/^(\d+)([a-z%]*)$/i);
    return match ? [match[1], match[2]] : [value, ""];
}

const unitsInterpolation = (item1: Unit, item2: Unit, progress: number) : Unit => {
  const [item1val, units] = splitValue(item1)
  const [item2val, _] = splitValue(item2)

  return numberInterpolation(Number(item1val), Number(item2val), progress) + units
}

export default unitsInterpolation
