import './style.scss'
import React from 'react'
import { createRoot } from 'react-dom/client'
import backiConfig from './backi.yaml' 
import { Backi } from '../lib/Backi'
import { BackiConfig } from '../lib/types'

createRoot(document.getElementById("backi")!).render(
  <React.StrictMode>
  <Backi config={backiConfig as BackiConfig}/>
  </React.StrictMode>
)
