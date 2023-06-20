'use client'

import React, { useEffect, useState } from 'react';
import { FiInfo } from 'react-icons/fi';
import { Tooltip, Button, Grid, Checkbox } from "@nextui-org/react";

import './marvelCharacters.css';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://gateway.marvel.com/v1/public/characters?apikey=45ee98c5639f56f2d772fe53c1ab716e&orderBy=-modified&limit=100'
        );
        const data = await response.json();
        setCharacters(data.data.results);
      } catch (error) {
        console.log('Error fetching characters:', error);
      }
    };

    fetchData();
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
    <div className="marvel-characters__container">
      <h1>Marvel Characters</h1>
      <div className="marvel-characters__tab">
        <div className="marvel-characters__header">
          <div className="marvel-characters__column">Select</div>
          <div className="marvel-characters__column">Image</div>
          <div className="marvel-characters__column">Name</div>
          <div className="marvel-characters__column">Description</div>
        </div>
        {characters.map((character) => {
          const imageIsNotFound = 
            character.thumbnail.path.includes('image_not_available');

          if (imageIsNotFound ) return;
          // if (!character.description) return;


          return (
          <div className="marvel-characters__row" key={character.id} onClick={() => handleCharacterSelect(character.id)}>
            <div className="marvel-characters__column">
              <Checkbox
                onChange={() => handleCharacterSelect(character.id)}
                size='lg'
                color='gradient'
                isSelected={selectedCharacters.includes(character.id)}
                isDisabled={selectedCharacters.length >= 2 && !selectedCharacters.includes(character.id)} />
            </div>
            <div className="marvel-characters__column">
              <img
                src={`${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`}
                alt={character.name}
                className='marvel-characters__img'
              />
            </div>
            <div className="marvel-characters__column">{character.name}</div>
            <div className="marvel-characters__column">
            <Grid>
              <Tooltip content={character.description || "No description found"} >
                <Button light auto>
                  <FiInfo className="info-icon" />
                </Button>
              </Tooltip>
            </Grid>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

export default MarvelCharacters;
