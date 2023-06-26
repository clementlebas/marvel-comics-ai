export const fetchCharacters = async () => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY_MARVEL;
    const apiUrl = 'https://gateway.marvel.com/v1/public/characters';

    const response = await fetch(`${apiUrl}?apikey=${apiKey}&orderBy=-modified&limit=100`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching characters:', error);
  }
};

export const getScenario = async (charactersOne: String, characterTwo: String) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    const apiUrl = 'https://api.openai.com/v1/completions';

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `Act as Stan Lee.
          Give me a story with conversation between ${charactersOne} and ${characterTwo} based on the characteristics of each super hero.
          The narrator should speack at least 3 times.
          Write the name of the speaker before each chat. If it's the narrator, write "Narrator:"
          `,
        max_tokens: 1000,
        temperature: 0,
      }),
    };

    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();

    return data.choices[0].text;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
