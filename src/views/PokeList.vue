<template>
  <div class="pokelist">
    <label
      class="pokelist__sort"
      for="sort">
      Filter :
      <select
        @change="sortPokedex"
        name="sort"
        id="sort">
        <option value="id">Id</option>
        <option value="name">Name</option>
        <option value="type">Type</option>
      </select>
    </label>

    <label
      class="pokelist__search"
      for="search">
      Search :
      <input
        type="text"
        @input="searchInPokedex"
        value=""
        placeholder="search"
        id="search">
    </label>

    <p class="pokelist__pokemons-weight">Total Weight: {{ totalWeight }}</p>
    <ul class="pokelist__list">
      <li
        class="pokelist__item"
        :key="pokemonIndex"
        v-for="(pokemon, pokemonIndex) in displayedPokemons">
        <router-link
          :to="`${pokemon.id}`"
          :title="pokemon.name"
          :class="`pokelist__pokemon--${pokemon.types[0]}`"
          class="pokelist__pokemon">
          <img
            class="pokelist__pokemon-sprite"
            :src="pokemon.sprite"
            :alt="`${pokemon.name}-sprite`">
          <div class="pokelist__pokemon-infos">
            <div class="pokelist__pokemon-infos-wrapper">
              <p class="pokelist__pokemon-name">{{ pokemon.name }}</p>
              <ul class="pokelist__pokemon-types">
                <li
                  class="pokelist__pokemon-types-name"
                  :key="typeIndex"
                  v-for="(type, typeIndex) in pokemon.types">
                  {{ type }}
                </li>
              </ul>
            </div>
            <p class="pokelist__pokemon-id">
              {{ pokemon.id }}
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getPokemons, getPokemon } from '@/api';

export default {
  name: 'PokeList',
  data() {
    return {
      pokemons: [],
      displayedPokemons: [],
    };
  },
  computed: {
    totalWeight() {
      if (this.displayedPokemons.length > 0) {
        return this.displayedPokemons.reduce((acc, pokemon) => acc + pokemon.weight, 0);
      } else {
        return 0;
      }
    },
  },
  async mounted() {
    const pokemons = await getPokemons();

    const formattedPokemons = await Promise.all(pokemons.map(pokemon => {
      return getPokemon(pokemon.url);
    }));

    this.pokemons = formattedPokemons;
    this.displayedPokemons = formattedPokemons;
  },
  methods: {
    sortPokedex($event) {
      const value = $event.target.value;

      const sortBy = {
        id: this.sortById,
        name: this.sortByName,
        type: this.sortByTypes,
      };

      this.displayedPokemons = this.pokemons.sort(sortBy[value]);
    },
    sortById(poke1, poke2) {
      return poke1.id > poke2.id ? 1 : -1;
    },
    sortByName(poke1, poke2) {
      return poke1.name > poke2.name ? 1 : -1;
    },
    sortByTypes(poke1, poke2) {
      return poke1.types[0] > poke2.types[0] ? 1 : -1;
    },

    searchInPokedex($event) {
      const value = $event.target.value;

      if (value) {
        const filteredPokemons = this.pokemons.filter(pokemon => {
          const searchByName = pokemon.name.includes(value);
          const searchByType = pokemon.types.some(typeName => typeName.includes(value));

          return searchByName || searchByType;
        });

        this.displayedPokemons = filteredPokemons;
      } else {
        this.displayedPokemons = this.pokemons;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables';
@import '../styles/types';

.pokelist {
  display: flex;
  flex-direction: column;

  &__sort, &__search {
    margin: 10px 0 20px;
  }

  &__sort {
    & select {
      font-size: 16px;
      border: 2px solid #2c3e50;
      border-radius: 4px;
      color: #2c3e50;
      padding: 3px 6px;
      background: none;
      outline: none;
    }

    & option {
      color: #2c3e50;
    }
  }

  &__search {
    & input {
      font-size: 16px;
      border: 2px solid #2c3e50;
      border-radius: 4px;
      color: #2c3e50;
      padding: 3px 6px;
      background: none;
      outline: none;
    }
  }

  &__pokemons-weight {
    margin: 30px 0;
  }

  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__pokemon {
    display: flex;
    align-items: center;
    width: 500px;
    border-radius: 20px;
    margin-bottom: 20px;
    text-decoration: none;
    transition: 0.2s;

    &:hover {
      margin-left: 25px;
    }

    &-infos {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 10px;

      &-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }

    &-name {
      text-transform: capitalize;
    }

    &-types {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;

      &-name {
        background-color: rgba(white, 0.3);
        margin-right: 5px;
        padding: 5px 10px;
        border-radius: 10px;
      }
    }

    @include setup-style(
      $normal: 'normal',
      $fire: 'fire',
      $water: 'water',
      $electric: 'electric',
      $grass: 'grass',
      $ice: 'ice',
      $fighting: 'fighting',
      $poison: 'poison',
      $ground: 'ground',
      $flying: 'flying',
      $psychic: 'psychic',
      $bug: 'bug',
      $rock: 'rock',
      $ghost: 'ghost',
      $dragon: 'dragon',
      $dark: 'dark',
      $steel: 'steel',
      $fairy: 'fairy',
    )
  }
}
</style>
