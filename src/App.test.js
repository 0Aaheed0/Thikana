import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Report Missing link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Report Missing/i);
  expect(linkElement).toBeInTheDocument();
});
