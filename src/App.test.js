import React from 'react';
import { render } from '@testing-library/react';
import HomePage from './components/Homepage'; 

describe('MyComponent', () => {

  it('shows up correctly', () => {

    render(<HomePage />);
  
  });

}); 
