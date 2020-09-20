const axios = require('axios');

async function getPokemons() {
  const { data: { results } } = await axios.get('https://pokeapi.co/api/v2/pokemon');

  return results;
}

async function getPokemon(url) {
  const { data: pokemon } = await axios.get(url);

  return {
    name: pokemon.name,
    id: pokemon.id,
    height: pokemon.height,
    weight: pokemon.weight,
    types: pokemon.types.map(type => type.type.name),
    sprite: pokemon.sprites.front_default,
    abilities: pokemon.abilities.map(ability => ability.ability.name),
  }
}

export {
  getPokemons,
  getPokemon
}
