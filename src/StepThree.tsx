import React from 'react'
import Step from './Step'

import { Snack } from './snack.model'

type StepNProps = {
  onAddSnack: (name: string) => void;
  onPreviousStep: () => void;
  snacks: Snack[];
}
function StepThree({ onAddSnack, onPreviousStep, snacks }: StepNProps) {
  return (
    <Step 
      title="Favorite Snack #3:" 
      onAddSnack={onAddSnack} 
      snacks={snacks}>              
        <button className="button secondary" onClick={onPreviousStep}>Previous</button>
        <button className="button primary" type="submit">Complete</button>        
    </Step>
  )
}

export default StepThree;
