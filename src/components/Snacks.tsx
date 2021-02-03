import { useState } from 'react';
import styled from '@emotion/styled'

import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFinal from './StepFinal'
import { Snack } from '../models/snack.model'
import Toggle from './Toggle'

const MainContent = styled.div({
  color: 'var(--mode-text)',
  background: 'var(--mode-background)',
})

function Snacks() {  
  const [step, setStep] = useState(1)  
  const [snacks, setSnacks] = useState<Snack[]>([])

  const restart = () => {
    setSnacks([])
    setStep(1)
  }
  const nextStep = () => setStep(prev => prev + 1)

  const prevStep = () => {
    if (step >= 2) {
      setSnacks(prev => {
        const oneLessSnack = [...prev]
        oneLessSnack.pop()
        return oneLessSnack;
      })
      setStep(prev => prev - 1)
    }
  }

  function isDuplicate(name: string): boolean {    
    for (let item of snacks) {
      if (item.name == name) return true
    }    
    return false 
  }

  function addSnack(name: string): void {
    console.log(name)
    if (name && name.trim() && !isDuplicate(name)) {
      const newSnack = {
        name
      }
      setSnacks(prev => [
        ...prev, 
        newSnack
      ])
      nextStep() 
    }
  }

  function multistep(n: number) {
    switch(n) {
      case 1: 
        return <StepOne onAddSnack={addSnack} snacks={snacks}/>
      case 2: 
        return <StepTwo onAddSnack={addSnack} onPreviousStep={prevStep} snacks={snacks}/>
      case 3: 
        return <StepThree onAddSnack={addSnack} onPreviousStep={prevStep} snacks={snacks}/>        
      case 4: 
        return <StepFinal snacks={snacks} onRestart={restart}/>
      default:
        setStep(1)        
    }
  }

  return (
    <div className="container">      
      <MainContent className="main-content">                                
        <div className="snacks-entry">       
          <div className="heading">
            <h3 className="title">Favorite Snacks</h3>        
            <Toggle />            
          </div>                
          <p>Three Favorite Snacks – a fully typed React application with TypeScript</p>        
        {multistep(step)}                
        </div>                  
      </MainContent>
  </div>    
  )
}

export default Snacks;