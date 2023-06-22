'use client';

import { useEffect } from 'react';

import { getScenario } from '../app/APIcalls';

export default function SecondPage() {
  function generatePrompt(charactersOne?: String, characterTwo?: String) {
    return 'Test';
  }

  useEffect(() => {
    getScenario('Spider-man', 'Iron-man').then((response) => {
      console.log('response', response);
    });
  }, []);

  return <div>{}</div>;
}
