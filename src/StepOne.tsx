import React from 'react'
import Step from './Step'
import { Snack } from './snack.model'

type StepOneProps = {
  onAddSnack: (name: string) => void;
  snacks: Snack[];
}
function StepOne({ onAddSnack, snacks }: StepOneProps) {
  return (
    <Step title="Favorite Snack #1:" onAddSnack={onAddSnack} snacks={snacks}>
      <button className="button primary" type="submit">Continue</button>
    </Step>
  )
}

export default StepOne;