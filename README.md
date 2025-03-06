# Backi

Make beautiful website backgrounds by declaratively interpolating styles, positions, and canvases.

## Setup 
As a very bare proof of concept, this is currently a bit more baked into the Vite site that this is hosted on. However, this will hopefully get more neatly packaged in the future.

```typescript
// index.tsx
import backiConfig from './backi.yaml' 
import Backi from './Backi'
import React from 'react'
import {BackiConfig} from './types'

createRoot(document.getElementById("backi")!).render(
  <React.StrictMode>
  <Backi config={backiConfig as BackiConfig}/>
  </React.StrictMode>
)
```
The `Backi` component will fill up whatever it is placed in, by being absolutely positioned and having `top,left,bottom,right` all set to `0`. In this example, the `#backi` element is set to fill up the background of the page, but you could also just throw it as the first thing in the body and in most situations, it will fill up the background automatically. Or, you could deliberately make it fill a certain area by positioning its container how you want.

## Configuration

All configuration for Backi's style and positioning of sprites takes place in `backi.yaml`. Example content is below: 

```yaml
scenes:
  - name: scroll-top
    position: 0
    style:
      backgroundColor: "#ff0000"
      opacity: 1
    sprites:
      test:
        top: 400px
        left: "0%"

  - name: scroll-middle
    position: 0.5
    style:
      backgroundColor: "#00ff00"
    sprites:
      test:
        top: 0px
        left: "20%"

  - name: scroll-bottom
    position: 1
    style:
      backgroundColor: "#0000ff"
      opacity: 0.2
    sprites:
      test:
        top: 100px
        left: "100%"

sprites:
  test:
    type: image
    width: 100
    height: 100
    src: "placeholder.jpg"
```

There are two core elements to Backi -- sprites and scenes. 

### Sprites 
**ONLY IMAGE HAS BEEN IMPLEMENTED SO FAR**

Sprites are individual "objects" that all live inside the `Backi` component. Each sprite has a type defining what it is -- text, image, etc. 

Each type of sprite has some different properties that define things about it that will never change during its lifetime -- such as `src` for an image or the font for  text.

Aspects of sprites that should be interpolated as the user scrolls through the page should be in scenes.

### Scenes
Scenes are defined points on the page where interpolated properties are always moving to or from. The location at which they happen is determined by their `position`, a real number between 0 and 1 which corresponds to the scrolling progress through the page. 0 is the top, 1 is the bottom. 

Each scene is also named, though this is more just for organizational purposes. 

Within each scene is optional definition for `sprites` and `styles`. In the `sprites`, you can define the desired state of the style for whatever sprites you want. It's fine if a sprite style isn't defined for all scenes -- For any given style of any sprite, Backi will interpolate between the two scenes closest to before and after that position for which that style is defined. 

For `styles`, think of all of the Backi component being a big sprite. The styles here apply to a `<div>` that contains all the other sprites, so you can set things like opacity or a global `background-color` here.


## Todos
- More in-depth configuration for the `position` aspect, such as allowing for scenes to position themselves based on when an element first appears? 
- Presets and effects
- Support more arbitrary canvases
- Make it possible to hook into the backend so other components could take advantage of Backi's state, or configure non-style variables to change as defined by the yaml scenes.
- Non-linear interpolation! Each scene/sprite would have to define to interpolate each of its styles at each point tho...
- Give sprites class names or ids so they can be externally styled
- Use TSX instead of `createElement` for sprites
- Make typing better
- GIF/image animation support
- Implement interpolation for parameters, such as `calc` and `transform: translate(x, y)`
- Generate a static map, or at least static piece of JS, from which styles at any given point (to some degree of granularity) are all computed
- Zones around scenes that guarantee their appearance within a range of their defined position
- make home page code reflect the actual yaml instead of just me copying and pasting it
- Allow 0 to interpolate with pixels and percents
