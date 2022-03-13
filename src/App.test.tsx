import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders WordleSolver heading', () => {
  render(<App />);
  const pageHeader = screen.getByText(/Wordle Solver/i);
  screen.debug()
  expect(pageHeader).toBeInTheDocument();
});
