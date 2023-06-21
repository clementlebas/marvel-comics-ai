import React from 'react';
import { render } from '@testing-library/react';
import Page from '../pages';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const { getByText } = render(<Page />);

  const pageTitle = getByText('Home page');
  expect(pageTitle).toBeInTheDocument();
});
