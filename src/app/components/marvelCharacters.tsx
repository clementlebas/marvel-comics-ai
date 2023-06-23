'use client';

import React, { useEffect, useState } from 'react';
import { FiInfo } from 'react-icons/fi';
import { Tooltip, Button, Grid, Checkbox } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

import { loading, setSelectedCharactersReducer } from '../redux/appSlice';
import { fetchCharacters } from '../APIcalls';
import styles from '../styles/page.module.css';
import '../styles/marvelCharacters.css';

interface Character {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  description: string;
}

const MarvelCharacters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loading(true));
    fetchCharacters().then((response) => {
      setCharacters(response.data.results);
      dispatch(loading(false));
    });
  }, []);

  const [selectedCharacters, setSelectedCharacters] = useState<number[]>([]);

  const handleCharacterSelect = (characterId: number) => {
    if (selectedCharacters.includes(characterId)) {
      setSelectedCharacters(selectedCharacters.filter((id) => id !== characterId));
    } else {
      if (selectedCharacters.length < 2) {
        setSelectedCharacters([...selectedCharacters, characterId]);
      }
    }
  };

  return (
    <>
      <div className="marvel-characters__container">
        <div className="marvel-characters__tab">
          <div className="marvel-characters__header">
            <div className="marvel-characters__column">Select</div>
            <div className="marvel-characters__column">Image</div>
            <div className="marvel-characters__column">Name</div>
            <div className="marvel-characters__column">Description</div>
          </div>
          {characters.map((character) => {
            const imageIsNotFound = character.thumbnail.path.includes('image_not_available');

            if (imageIsNotFound) return;
            // if (!character.description) return;

            return (
              <div
                className="marvel-characters__row"
                key={character.id}
                onClick={() => handleCharacterSelect(character.id)}
              >
                <div className="marvel-characters__column">
                  <Checkbox
                    onChange={() => handleCharacterSelect(character.id)}
                    size="lg"
                    color="gradient"
                    isSelected={selectedCharacters.includes(character.id)}
                    isDisabled={selectedCharacters.length >= 2 && !selectedCharacters.includes(character.id)}
                  />
                </div>
                <div className="marvel-characters__column">
                  <img
                    src={`${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`}
                    alt={character.name}
                    className="marvel-characters__img"
                  />
                </div>
                <div className="marvel-characters__column">{character.name}</div>
                <div className="marvel-characters__column">
                  <Grid>
                    <Tooltip content={character.description || 'No description found'}>
                      <Button light auto>
                        <FiInfo className="info-icon" />
                      </Button>
                    </Tooltip>
                  </Grid>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={`${styles.grid} ${styles.center}`}>
        <Link
          href="/boardPage"
          className={`${styles.card} ${styles.button}`}
          rel="noopener noreferrer"
          onClick={() => {
            const selectedCharactersFormated = selectedCharacters
              .map((id) => characters.find((character) => character.id === id))
              .map((character) => {
                if (!character) return;
                const { id, description } = character;
                const name = character.name.replace(/\([^()]*\)/g, '').trim();
                const urlImage = `${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`;
                return { id, name, description, urlImage };
              });

            dispatch(setSelectedCharactersReducer({ selectedCharacters: selectedCharactersFormated }));
          }}
        >
          <h2 className={`${styles.center}`}>
            Start <span>-&gt;</span>
          </h2>
        </Link>
      </div>
    </>
  );
};

export default MarvelCharacters;
