import { BackiConfig, ImageSprite, StyleBreakpoint } from "../types";
import { computeStyleInterpolations } from "../style";
import { createElement } from 'react'

const generateSprites = (config: BackiConfig , progress:number) : React.ReactElement[] => {
  const spriteList = config.sprites 
  if (!spriteList) { return [] }

  return Object.keys(spriteList as Object).map(spriteName => {
    const sprite = spriteList[spriteName]

    const spriteBreakpoints:StyleBreakpoint[] = []
    for (const scene of config.scenes) {
      if (scene.sprites) {
        if (scene.sprites[spriteName]) {
          spriteBreakpoints.push({
            position: scene.position,
            style: scene.sprites[spriteName]
          } as StyleBreakpoint)
        }
      }
    }
    
    const style = computeStyleInterpolations(spriteBreakpoints, progress)
    style.position = "absolute"

    let elem

    if (sprite.type == "image") {
      const src = (sprite as ImageSprite).src
      const width = sprite.width
      const height = sprite.height
      elem = createElement("img", {src, width, height, style})
    }

    if (sprite.type == "div") {
      elem = createElement("div", {style})
    }

    if (elem) {
      return elem 
    }

    return createElement("")
  })
}

export default generateSprites
