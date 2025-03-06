import { BackiConfig, ImageSprite, Sprite, StyleBreakpoint } from "../types";
import { computeStyleInterpolations } from "../style";
import { createElement } from 'react'

const generateSprites = (config: BackiConfig , progress:number) : ReactElement[] => {
  const spriteList = config.sprites 
  return Object.keys(spriteList as Object).map(spriteName => {
    const sprite = spriteList[spriteName] as Sprite

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

    let elem

    if (sprite.type == "image") {
      const src = (sprite as ImageSprite).src
      const width = sprite.width
      const height = sprite.height
      style.position = "absolute"
      elem = createElement("img", {src, width, height, style})

    }

    if (elem) {
      return elem 
    }

    return createElement("")
  })
}

export default generateSprites
