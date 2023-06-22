'use client';

import { useEffect } from 'react';
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

interface SelectedCharacters extends Array<SelectedCharacter> {}

export default function BoardPage() {
  const dispatch = useDispatch();
  // @ts-ignore
  // const selectedCharacters = useSelector((state): SelectedCharacters => state?.app.selectedCharacters);
  const selectedCharacters = [
    {
      id: 1009515,
      name: 'Punisher',
      description: '',
      urlImage: 'http://i.annihil.us/u/prod/marvel/i/mg/3/90/5261675f6b22f/standard_fantastic.jpg',
    },
    {
      id: 1009666,
      name: 'Thunderbird (John Proudstar)',
      description:
        'An exceptionally strong and vigorous athlete in his youth, John Proudstar&rsquo;s mutant abilities first manifested when he wrestled a charging bison to save a young girl.',
      urlImage: 'http://i.annihil.us/u/prod/marvel/i/mg/a/f0/4c003aa43b1ec/standard_fantastic.jpg',
    },
  ];

  console.log('selectedCharacters', selectedCharacters);

  useEffect(() => {
    dispatch(loading(true));
    // getScenario('Spider-man', 'Iron-man').then((response) => {
    //   console.log('response', response);
    //   dispatch(loading(false));
    // });
  }, []);

  return (
    <div className="board-page">
      <article className="board-page__comic">
        <div className="board-page__panel">
          <div className="board-page__character">
            <div className="board-page__character--left">
              <p className="board-page__speech board-page__speech--right">A speech bubble</p>
              <Image
                className="board-page__image"
                src={selectedCharacters[0].urlImage}
                width={300}
                height={300}
                alt="Picture of the first character"
              />
            </div>
            <div className="board-page__character--right">
              <Image
                className="board-page__image"
                src={selectedCharacters[1].urlImage}
                width={300}
                height={300}
                alt="Picture of the first character"
              />
              <p className="board-page__speech board-page__speech--left">A speech bubble</p>
            </div>
          </div>

          <p className="board-page__text board-page__bottom-right">...something amazing happened</p>
        </div>
      </article>
    </div>
  );
}
