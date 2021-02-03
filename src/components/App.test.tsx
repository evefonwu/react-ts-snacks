import { render, screen } from '@testing-library/react';
import App from './App';

test('renders text three favorite snacks', () => {
  render(<App />);
  const textElement = screen.getByText(/three favorite snacks/i);
  expect(textElement).toBeInTheDocument();
});
