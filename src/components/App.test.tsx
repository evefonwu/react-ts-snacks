import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

beforeEach(() => {
  render(<App />);
})

/**
 * test: initial state, on step one
 * assert: text snack #1, text box, and continue button 
 */
test('initial state', () => {
  const title = screen.getByText(/snack #1/i);  
  const textBox = screen.getByRole('textbox')
  const continueButton = screen.getByRole('button', {name: /continue/i})  
    
  expect(title).toBeInTheDocument();
  expect(textBox).toBeInTheDocument()
  expect(continueButton).toBeInTheDocument();
});

/**
 * test: on step one, no input or blank input, click continue
 * assert: text stays at snack #1 (stays on step one without an entry)
 */
test('blank input', async () => {
  const invalidInput = ''
  userEvent.type(screen.getByRole('textbox'), invalidInput)
  userEvent.click(screen.getByRole('button', {name: /continue/i}))  
  const title = screen.getByText(/snack #1/i);  
  expect(title).toBeInTheDocument();
});

/**
 * test: from step one to step two, enter ‘apples’, click continue
 * assert: previous button appears, list item text ‘apples’ appears
 */
test('from step one to step two', async () => {    
  userEvent.type(screen.getByRole('textbox'), "apples")  
  userEvent.click(screen.getByRole('button', {name: /continue/i}))  

  const title = await screen.getByText(/snack #2/i);  
  expect(title).toBeInTheDocument();  
  const snack = await screen.getByText(/apples/i);  
  expect(snack).toBeInTheDocument();
  const previousButton = await screen.findByRole('button', {name: /previous/i})
  expect(previousButton).toBeInTheDocument();
})

/**
 * test: on step two, enter duplicate entry, ‘apples’, click continue 
 * assert: text is still snack #2 (stays on step two with duplicate entry) 
 */
test('duplicate entry', async () => {    
  userEvent.type(screen.getByRole('textbox'), "apples")  
  userEvent.click(screen.getByRole('button', {name: /continue/i})) 

  await screen.getByText(/apples/i);    
  userEvent.type(screen.getByRole('textbox'), "apples")  
  userEvent.click(screen.getByRole('button', {name: /continue/i})) 

  const title = await screen.getByText(/snack #2/i);  
  expect(title).toBeInTheDocument();
})

/**
 * test: from step two to three, enter second snack ‘oranges’, click continue 
 * assert: list items ‘apples’ and ‘oranges’ appear
 */
test('from step two to three', async () => {    
  userEvent.type(screen.getByRole('textbox'), "apples")  
  userEvent.click(screen.getByRole('button', {name: /continue/i})) 

  await screen.getByText(/apples/i);    
  userEvent.type(screen.getByRole('textbox'), "oranges")  
  userEvent.click(screen.getByRole('button', {name: /continue/i})) 

  const title = await screen.getByText(/snack #3/i);  
  expect(title).toBeInTheDocument();
  const snackA = await screen.getByText(/apples/i);  
  const snackB = await screen.getByText(/oranges/i);  
  expect(snackA).toBeInTheDocument();
  expect(snackB).toBeInTheDocument();
})

/**
 * test: on step three, click previous
 * assert: title to be snack #2 and list items ‘oranges’ disappears 
 */
test('go to previous step', async () => {    
  userEvent.type(screen.getByRole('textbox'), "apples")  
  userEvent.click(screen.getByRole('button', {name: /continue/i})) 
  await screen.getByText(/apples/i);      

  userEvent.type(screen.getByRole('textbox'), "oranges")  
  userEvent.click(screen.getByRole('button', {name: /continue/i})) 
  await screen.getByText(/oranges/i);      

  const previousButton = await screen.getByRole('button', {name: /previous/i})
  userEvent.click(previousButton) 
  const title = await screen.getByText(/snack #2/i);  
  expect(title).toBeInTheDocument(); 
  
  const snackA = await screen.getByText(/apples/i);  
  const snackB = screen.queryByText(/oranges/i) 
  expect(snackA).toBeInTheDocument();
  expect(snackB).toBeNull() 
})

/**
 * test: from step three to final step, enter third snack ‘grapes’, click ‘complete’ 
 * assert: list items ‘apples’ ‘oranges’ ‘grapes’ appear with a ‘replay’ button
 * 
 * test: replay, click ‘replay’ button
 * assert: text is ‘snack #1’ and 'apples', 'oranges', 'grapes' disappear
 */
test('from step three to final', async () => {    
  userEvent.type(screen.getByRole('textbox'), "apples")  
  userEvent.click(screen.getByRole('button', {name: /continue/i})) 

  await screen.getByText(/apples/i);    
  userEvent.type(screen.getByRole('textbox'), "oranges")  
  userEvent.click(screen.getByRole('button', {name: /continue/i})) 

  await screen.getByText(/oranges/i);    
  userEvent.type(screen.getByRole('textbox'), "grapes")  
  userEvent.click(screen.getByRole('button', {name: /complete/i})) 

  const snackA = await screen.getByText(/apples/i);  
  const snackB = await screen.getByText(/oranges/i);  
  const snackC = await screen.getByText(/grapes/i);  
  expect(snackA).toBeInTheDocument();
  expect(snackB).toBeInTheDocument();
  expect(snackC).toBeInTheDocument(); 
})

/**
 * test: replay
 * assert: text is ‘snack #1’ and 'apples', 'oranges', 'grapes' disappear
 */
test('replay', async () => {    
  userEvent.type(screen.getByRole('textbox'), "apples")  
  userEvent.click(screen.getByRole('button', {name: /continue/i})) 

  await screen.getByText(/apples/i);    
  userEvent.type(screen.getByRole('textbox'), "oranges")  
  userEvent.click(screen.getByRole('button', {name: /continue/i})) 

  await screen.getByText(/oranges/i);    
  userEvent.type(screen.getByRole('textbox'), "grapes")  
  userEvent.click(screen.getByRole('button', {name: /complete/i})) 

  const replayButton = await screen.getByRole('button', {name: /replay/i})  
  userEvent.click(replayButton)

  const title = await screen.getByText(/snack #1/i);
  expect(title).toBeInTheDocument(); 
  const snackA = await screen.queryByText(/apples/i);  
  const snackB = await screen.queryByText(/oranges/i);  
  const snackC = await screen.queryByText(/grapes/i);  
  expect(snackA).toBeNull();
  expect(snackB).toBeNull();
  expect(snackC).toBeNull();   
})

/**
 * test: toggle checkbox 
 * assert: checked/unchecked 
 */
test('toggle checkbox on and off', () => {
  const toggle = screen.getByTestId("ui-mode-toggle")
  expect(toggle).toBeInTheDocument()
  expect(toggle).toBeChecked()

  userEvent.click(toggle)
  expect(toggle).not.toBeChecked()

  userEvent.click(toggle)
  expect(toggle).toBeChecked()
})

/**
 * test: toggle changes UI mode
 * assert: initial dawn colors
 * test, assert: toggle once, night colors; toggle twice, dawn colors 
 */
test('toggle UI mode', () => {  
  const dawnMode = 'dawn'
  const nightMode = 'night'
  let uimode = document.body.dataset.uimode
  expect(uimode).toBe(dawnMode)

  const toggle = screen.getByTestId("ui-mode-toggle")
  userEvent.click(toggle)
  uimode = document.body.dataset.uimode
  expect(uimode).toBe(nightMode)

  userEvent.click(toggle)
  uimode = document.body.dataset.uimode
  expect(uimode).toBe(dawnMode)
})