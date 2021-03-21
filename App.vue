<template>
  <div id="app">
    <mainGame/>
  </div>
</template>

<script>
import mainGame from './components/mainGame.vue'

export default {
  name: 'App',
  components: {
    mainGame
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
