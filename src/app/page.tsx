'use client';

import { Provider } from 'react-redux';

import { store } from './redux/store';
import styles from './page.module.css';
import MarvelCharacters from './marvelCharacters';

export default function Home() {
  return (
    <main className={styles.main}>
      <Provider store={store}>
        <div className={`${styles.description}`}>
          <p>Marvel Project by Clément Le Bas</p>
        </div>

        <MarvelCharacters />
      </Provider>
    </main>
  );
}
