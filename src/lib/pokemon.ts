import { translatePokemon } from "../util/translate_pokemon";

interface PokemonDetailResponse {
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  types: { type: { name: string } }[];
}

interface PokemonSpeciesResponse {
  habitat: { name: string } | null;
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
}

export const getRandomPokemon = async () => {
  try {
    const countRes = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');
    const countData = await countRes.json();
    const randomId = Math.floor(Math.random() * countData.count) + 1;

    const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const pokemonData = (await pokemonRes.json()) as PokemonDetailResponse;

    const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${randomId}`);
    const speciesData = (await speciesRes.json()) as PokemonSpeciesResponse;

    const flavorText = speciesData.flavor_text_entries
      .find((entry) => entry.language.name === 'en')
      ?.flavor_text.replace(/[\n\f]/g, ' ') || 'No description available';

    return {
      name: translatePokemon(pokemonData.name),
      en_name: pokemonData.name,
      image_url: pokemonData.sprites.front_default,
      shiny_image_url: pokemonData.sprites.front_shiny,
      types: pokemonData.types.map(t => t.type.name).join(', '),
      habitat: speciesData.habitat?.name || 'unknown',
      features: flavorText
    };
  } catch (error) {
    console.error("getRandomPokemon Error:", error);
    return null;
  }
};