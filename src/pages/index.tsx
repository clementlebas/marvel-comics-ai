'use client';

import MarvelCharacters from '../app/components/marvelCharacters';

import '../app/styles/globals.css'

export default function Home() {
  return (
      <>
        <h1>Hi, select two characters to get a stories between them</h1>
        <MarvelCharacters />
      </>
  );
}
