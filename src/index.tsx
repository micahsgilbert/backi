import './style.scss'
import React from 'react'
import { createRoot } from 'react-dom/client'
import backiConfig from './backi.yaml' 
import Backi from './Backi'
import { html } from '../README.md'

import {BackiConfig} from './types'

createRoot(document.getElementById("backi")!).render(
  <React.StrictMode>
  <Backi config={backiConfig as BackiConfig}/>
  </React.StrictMode>
)

window.addEventListener('load', () => {
  document.getElementById("readme")!.innerHTML = html
}) 
