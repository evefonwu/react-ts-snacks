import { useState } from 'react';
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFinal from './StepFinal'
import { Snack } from './snack.model'

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
    snacks.forEach(item => {
      if (item.name === name) return true
    })
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
      <div className="snacks-entry">      
        <p>Three Favorite Snacks – a fully typed React application with TypeScript</p>        
        {multistep(step)}
      </div>
    </div>
    
  )
}

export default Snacks;