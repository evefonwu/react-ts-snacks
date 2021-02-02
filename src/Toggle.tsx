import { useState, useEffect } from 'react'

const Dawn = "dawn"
const Night = "night"

const Toggle = () => {
  const [isDawn, setIsDawn] = useState(true)
 
  useEffect(() => {    
    document.body.dataset.uimode = isDawn ? Dawn : Night
  }, [isDawn])

  const handleToggle = () => {
    setIsDawn(prev => !prev)
  }

  return (
    <button onClick={handleToggle}>{isDawn ? Night : Dawn} Mode</button>
  )
}

export default Toggle;