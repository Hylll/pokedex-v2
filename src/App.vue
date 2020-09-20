<template>
  <h1><router-link to="/">Pokedex</router-link></h1>
  <router-view/>
</template>

<style lang="scss">
@font-face {
  font-family: pokemon;
  src: url("./assets/fonts/Pokemon_GB.ttf");
}

body {
  margin: 0;
  background-color: #cbcbcb;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

p {
  margin: 10px 0;
}

a {
  color: black;
}

#app {
  font-family: pokemon, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 50px 20px;
  color: black;
}
</style>
