import './style.scss'
import React from 'react'
import { createRoot } from 'react-dom/client'
import backiConfig from './backi.yaml' 
import Backi from './Backi'

import {BackiConfig} from './types'

console.log(backiConfig)

createRoot(document.getElementById("backi")!).render(
  <React.StrictMode>
  <Backi config={backiConfig as BackiConfig}/>
  </React.StrictMode>
)
