import React from 'react';
import {render, screen} from '@testing-library/react';
import ReactDOM from 'react-dom';
import Page from '../app/page';


it('renders without crashing', () => {
  const div = document.createElement('div');
  const { getByText } = render(<Page />);

  const pageTitle = getByText('Home page');
  expect(pageTitle).toBeInTheDocument();
});
