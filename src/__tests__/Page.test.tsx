import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';

import Home from '../pages/index';
import MarvelCharacters from '../app/components/marvelCharacters';
import { store } from '../app/redux/store';

// Disabled nprogress test
jest.mock('nprogress', () => ({
  start: jest.fn(),
  done: jest.fn(),
  configure: jest.fn(),
  set: jest.fn(),
}));

it('renders home page without crashing', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Home />
    </Provider>,
  );

  const pageTitle = getByTestId('home');
  expect(pageTitle).toBeInTheDocument();
});

describe('MarvelCharacters', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <MarvelCharacters />
      </Provider>,
    );
  });

  it('should disable the start button if selectedCharacters length is less than 2', () => {
    const { getByTestId } = component;
    const startButton = getByTestId('start-button');

    expect(startButton).toHaveClass('marvel-characters__button--disable');
  });
});
