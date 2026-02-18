import { pokemonDict } from "./pokemonDict";

export const translatePokemon = (enName: string):string => {
  const name = enName.toLowerCase();
  return pokemonDict[name];
}