import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

beforeEach(() => {
  render(<App />);
})

/**
 * test: initial state, on step one
 * assert: text three favorite snacks, text box, and continue button 
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

  const textElement = await screen.getByText(/snack #2/i);  
  expect(textElement).toBeInTheDocument();
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