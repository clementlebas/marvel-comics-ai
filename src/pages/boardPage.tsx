'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';

import { getScenario } from '../app/APIcalls';
import { loading } from '../app/redux/appSlice';
import '../app/styles/boardPage.css';

interface SelectedCharacter {
  id: number;
  name: string;
  description: string;
  urlImage: string;
}

type SelectedCharacters = Array<SelectedCharacter>;

export default function BoardPage() {
  const dispatch = useDispatch();
  const narratorName = 'Narrator';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [dialogues, setDialogue] = useState('');

  const handleClick = () => {
    if (currentIndex < dialogues.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // @ts-ignore
  const selectedCharacters = useSelector((state): SelectedCharacters => state?.app.selectedCharacters);

  useEffect(() => {
    getScenario(selectedCharacters[0].name, selectedCharacters[1].name).then((response) => {
      dispatch(loading(false));
      setDialogue(response.split('\n'));
    });
  }, [dispatch, selectedCharacters]);

  if (!dialogues) return <div>Loading...</div>;

  const characterOneName = selectedCharacters[0].name;
  const characterTwoName = selectedCharacters[1].name;

  return (
    <div className="board-page">
      <h1>Click on the board to run the story</h1>
      <article className="board-page__comic" onClick={handleClick}>
        <div className="board-page__panel">
          <div className="board-page__characters">
            <div className="board-page__section board-page__section--top">
              <p className="board-page__speech board-page__speech--right">
                {dialogues[currentIndex].trimStart().startsWith(characterOneName)
                  ? dialogues[currentIndex].split(characterOneName + ':').join('')
                  : '...'}
              </p>
              <p className="board-page__speech board-page__speech--left">
                {dialogues[currentIndex].trimStart().startsWith(characterTwoName)
                  ? dialogues[currentIndex].split(characterTwoName + ':')
                  : '...'}
              </p>
            </div>
            <div className="board-page__section">
              <Image
                className="board-page__image"
                src={selectedCharacters[0].urlImage}
                width={300}
                height={300}
                alt="Picture of the first character"
              />
              <Image
                className="board-page__image"
                src={selectedCharacters[1].urlImage}
                width={300}
                height={300}
                alt="Picture of the second character"
              />
            </div>
          </div>

          <p className="board-page__text board-page__bottom-right">
            {dialogues[currentIndex].trimStart().startsWith('Narrator')
              ? dialogues[currentIndex].split(narratorName + ':')
              : '...'}
          </p>
        </div>
      </article>
    </div>
  );
}
