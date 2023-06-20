export const fetchCharacters = async () => {
    try {
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters?apikey=${process.env.NEXT_PUBLIC_API_KEY_MARVEL}&orderBy=-modified&limit=100`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching characters:', error);
    }
  };