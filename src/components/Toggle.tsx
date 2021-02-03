import { useState, useEffect } from 'react'
import Switch from './Switch'

const Dawn = "dawn"
const Night = "night"
const NightBackground = "grey"

const Toggle = () => {
  const [isDawn, setIsDawn] = useState(true)
 
  useEffect(() => {    
    document.body.dataset.uimode = isDawn ? Dawn : Night
  }, [isDawn])

  const handleToggle = () => {
    setIsDawn(prev => !prev)
  }

  return (    
    <Switch isOn={isDawn} handleToggle={handleToggle} onColor={NightBackground}></Switch>  
  )
}

export default Toggle;