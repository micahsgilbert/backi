import './backi.scss'
import { useEffect, useState } from 'react'
import getVerticalScrollPercentage from './helpers/getVerticalScrollPercentage'
import { generateBackiStyle } from './style'
import generateSprites from './sprites'
import { BackiProps } from './types'

declare module 'csstype' {
  interface Properties {
    [index: string]: any;
  }
}

const Backi = (props:BackiProps) => {
  const [style, setStyle] = useState({})
  const [sprites, setSprites] = useState([] as React.ReactElement[])
  const [progress, setProgress] = useState(getVerticalScrollPercentage(document.body))

  useEffect(() => {
    const handleScroll = () => {
      setProgress(getVerticalScrollPercentage(document.body))
    } 

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setStyle(generateBackiStyle(props.config, progress))
    setSprites(generateSprites(props.config, progress))
  }, [progress])

  return (
    <div id="backi-main" style={style}>
    {sprites.map((sprite, idx) => <div key={idx}>{sprite}</div>)}
    </div>
  )
}

export default Backi
