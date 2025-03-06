import CSS from "csstype"

interface Scene {
  name: string,
  position: number,
  style?: CSS.Properties
  sprites?: any
}

type Nullable<T> = T | null

interface BackiConfig {
  scenes: Scene[]
  sprites: Sprite[]
}

interface Sprite {
  width: number 
  height: number
  type: "image" | "box"
}

interface ImageSprite extends Sprite {
  src: string
}

interface BackiProps {
  config: BackiConfig
}

interface PagePosition {
  before: Nullable<Scene>
  exact: Nullable<Scene>
  after: Nullable<Scene>
  progressBetweenNeighbors: number
}

interface StyleBreakpoint {
  position: number 
  style: CSS.Properties
}

export type { Scene, Nullable, BackiConfig, BackiProps, PagePosition, Sprite, ImageSprite, StyleBreakpoint }
