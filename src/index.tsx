import './style.scss'
import React from 'react'
import { createRoot } from 'react-dom/client'
import backiConfig from './backi.yaml' 
import Backi from './Backi'
import ReactMarkdown from "react-markdown"
import readme from '../README.md'

import {BackiConfig} from './types'

createRoot(document.getElementById("backi")!).render(
  <React.StrictMode>
  <Backi config={backiConfig as BackiConfig}/>
  </React.StrictMode>
)

createRoot(document.getElementById("readme")!).render(
  <React.StrictMode>
  <ReactMarkdown>{readme}</ReactMarkdown>
  </React.StrictMode>
)
