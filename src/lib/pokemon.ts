import { pokemonDict } from "../util/pokemonDict";

type dataType = {
  count: number;
  next: string;
  previous: string | null;
  results: {name: string; url: string} []
}

export const getRandomPokemon = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1')
  const data = await res.json() as dataType
  const count = data.count
  const pokemonIdx = 1 + Math.floor(Math.random() * count) 
  const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pokemonIdx - 1}&limit=20`)
  const pokemonData = await pokemonRes.json() as dataType
  return translatePokemon(pokemonData.results[0].name)
};


export const translatePokemon = (enName: string):string => {
  const name = enName.toLowerCase();
  return pokemonDict[name];
}
