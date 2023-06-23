'use client';

import MarvelCharacters from '../app/components/marvelCharacters';

import '../app/styles/globals.css';

export default function Home() {
  return (
    <>
      <h1>Select two characters to get a story</h1>
      <MarvelCharacters />
    </>
  );
}
