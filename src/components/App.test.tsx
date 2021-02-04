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
  const textElement = screen.getByText(/three favorite snacks/i);  
  const continueButton = screen.getByRole('button', {name: /continue/i})  
  const textBox = screen.getByRole('textbox')
  expect(textElement).toBeInTheDocument();
  expect(textBox).toBeInTheDocument()
  expect(continueButton).toBeInTheDocument();
});

/**
 * test: on step one, no input or blank input, click continue
 * assert: text stays at snack #1 (stays on step one without an entry)
 */
test('step one, blank input', async () => {
  const invalidInput = ''
  userEvent.type(screen.getByRole('textbox'), invalidInput)
  userEvent.click(screen.getByRole('button', {name: /continue/i}))  
  const textElement = screen.getByText(/snack #1/i);  
  expect(textElement).toBeInTheDocument();
});

/**
 * test: valid input, click continue
 * assert: text is now snack #2 
 */
test('step one, non-blank input', async () => {  
  userEvent.type(screen.getByRole('textbox'), 'apples')
  userEvent.click(screen.getByRole('button', {name: /continue/i}))  
  const textElement = screen.getByText(/snack #2/i);  
  expect(textElement).toBeInTheDocument();
});
