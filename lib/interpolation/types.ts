import Color from 'color'

type ColorType = InstanceType<typeof Color>

type Unit = `${number}px` | `${number}%`

type Interpolatable = number | ColorType | Unit

export type { ColorType, Interpolatable, Unit }
