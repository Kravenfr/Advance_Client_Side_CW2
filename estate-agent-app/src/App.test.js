import { render } from '@testing-library/react';
import App from './App';

/* just updated this to a simple test*/
test('renders without crashing', () => {
  render(<App />);
});