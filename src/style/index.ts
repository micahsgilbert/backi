import { Nullable, BackiConfig, PagePosition, StyleBreakpoint } from '../types'
import merge from '../helpers/merge'
import interpolate from '../interpolation'
import CSS from "csstype"

const computeStyleInterpolations = (styleBreakpoints: StyleBreakpoint[], progress: number) : (CSS.Properties) => {
  const finalStyle:CSS.Properties = {}
  const sortedBreakpoints = styleBreakpoints.sort((a: StyleBreakpoint, b:StyleBreakpoint) => a.position - b.position)
  const stylesToCompute:string[] = styleBreakpoints.reduce((a:string[], b:StyleBreakpoint) => merge(a, Object.keys(b.style as Object)), [])

  for (const styleToCompute of stylesToCompute) {

    const { before, exact, after, progressBetweenNeighbors } = getNearestNeighborsForStyle(sortedBreakpoints, styleToCompute, progress)

    if (exact) {
      finalStyle[styleToCompute] = exact.style![styleToCompute]
    }
    else if (!before && after) {
      finalStyle[styleToCompute] = after.style![styleToCompute]
    }
    else if (!after && before) {
      finalStyle[styleToCompute] = before.style![styleToCompute]
    }
    else if (after && before){
      const interpolated = interpolate(before.style![styleToCompute], after.style![styleToCompute], progressBetweenNeighbors)
      finalStyle[styleToCompute] = interpolated
    }
    else {
      throw Error(`Invalid state for before, current, and after when computing style ${styleToCompute}`)
    }
  }

  return finalStyle
}

const getNearestNeighborsForStyle = (styleBreakpoints: StyleBreakpoint[], style:string, progress:number) : PagePosition => {

  let before: Nullable<StyleBreakpoint> = null
  let exact: Nullable<StyleBreakpoint> = null
  let after: Nullable<StyleBreakpoint> = null
  let progressBetweenNeighbors: number = 0

  styleBreakpoints.forEach(breakpoint => {
    if (breakpoint.style) {
      if (breakpoint.position < progress && style in breakpoint.style) {
        before = breakpoint
      }
      if (breakpoint.position == progress && style in breakpoint.style) {
        exact = breakpoint
      }
      if (breakpoint.position > progress && style in breakpoint.style && after == null) {
        after = breakpoint
      }
    }
  })

  if (after != null && before != null) {
    progressBetweenNeighbors = (progress - (before as StyleBreakpoint).position) / ((after as StyleBreakpoint).position - (before as StyleBreakpoint).position)
  }

  return { before, exact, after, progressBetweenNeighbors } 
}

const generateBackiStyle = (config: BackiConfig, progress: number):(CSS.Properties) => {
  return computeStyleInterpolations(config.scenes as StyleBreakpoint[], progress)
}

export { generateBackiStyle, computeStyleInterpolations }
