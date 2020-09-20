<template>
  <div class="pokeinfos">
    <img
      class="pokeinfos__sprite"
      :src="pokemon.sprite"
      :alt="`${pokemon.name}-sprite`">
    <div class="pokeinfos__container">
      <p class="pokeinfos__name">{{ pokemon.name }}</p>

      <ul class="pokeinfos__types">
        <li
          class="pokeinfos__types-name"
          :key="typeIndex"
          v-for="(type, typeIndex) in pokemon.types">
          {{ type }}
        </li>
      </ul>

      <p class="pokeinfos__height">height: {{ pokemon.height }}</p>
      <p class="pokeinfos__weight">weight: {{ pokemon.weight }}</p>

      <ul class="pokeinfos__abilities">
        <li
          class="pokeinfos__abilities-name"
          :key="abilityIndex"
          v-for="(ability, abilityIndex) in pokemon.abilities">
          {{ ability }}
        </li>
      </ul>

      <p class="pokeinfos__id">
        {{ pokemon.id }}
      </p>
    </div>
  </div>
</template>

<script>
import { getPokemon } from '@/api';

export default {
  name: 'PokeInfos',
  data() {
    return {
      pokemon: {},
    };
  },
  async mounted() {
    const id = this.$route.params.id;

    this.pokemon = await getPokemon(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables';
@import '../styles/types';

.pokeinfos {
  display: flex;
  width: 600px;
  margin: auto;

  &__sprite {
    width: 200px;
    height: 200px;
    flex-shrink: 0;
  }

  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 10px;
  }

  &__name {
    text-transform: capitalize;
    font-size: 24px;
    margin-bottom: 20px;
  }

  &__types {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin-bottom: 30px;

    &-name {
      background-color: #696969;
      margin-right: 5px;
      padding: 5px 10px;
      border-radius: 10px;
    }
  }

  &__abilities {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 2px;
    margin-top: 20px;

    &-name {
      border: 2px solid #1a252f;
      padding: 10px 20px;
      margin-bottom: 10px;
      text-transform: capitalize;
    }
  }

  &__id {
    font-size: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
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
</style>
