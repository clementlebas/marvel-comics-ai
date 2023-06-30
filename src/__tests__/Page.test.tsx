import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Home from '../pages/index';
import MarvelCharacters from '../app/components/marvelCharacters';
import { store } from '../app/redux/store';

const apiKey = process.env.NEXT_PUBLIC_API_KEY_MARVEL;
const apiUrl = 'https://gateway.marvel.com/v1/public/characters';

const server = setupServer(
  rest.get(`${apiUrl}?apikey=${apiKey}&orderBy=-modified&limit=100`, async (_req, res, ctx) => {

    return res(
      ctx.delay(1500),
      ctx.status(200, 'Ok'),
      ctx.json({
        data: '',
      }),
    );
  }),
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

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
