import React, { useState, useRef, useEffect } from 'react'
import SnacksList from './SnacksList'
import { Snack } from './snack.model'

type StepProps = { 
  onAddSnack: (name: string) => void;
  snacks: Snack[];
  title: string;
  children: JSX.Element | JSX.Element[]
}

const initSnack = ''
function Step({ onAddSnack, snacks, title, children }: StepProps) {
  const [snack, setSnack] = useState(initSnack)
  const snackInput = useRef<HTMLInputElement | null>(null)

  useEffect(() => {    
    snackInput?.current?.focus()
  }, [])
  
  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const value = event.currentTarget.value           
    setSnack(value)
  }

  const handleContinue = (event: React.FormEvent) => {
    event.preventDefault()    
    onAddSnack(snack)    
    setSnack(initSnack)    
  }
  
  return (
    <section>
      <p>Sweet, savory, fruits, anything you like for snacks, enter here:</p>        
      <SnacksList snacks={snacks} />
      <form onSubmit={handleContinue}>      
        <label htmlFor="name"><h3>{title}</h3></label>
        <input 
          id="name" 
          ref={snackInput} 
          type="text" 
          name="snack" 
          value={snack} 
          onChange={handleChange} 
          onKeyPress={event => {
            if (event.key === 'Enter') event.preventDefault();
          }}
          />      
        <div className="action-panel">
          {children}
        </div>
      </form>
    </section>
  )
}

export default Step;