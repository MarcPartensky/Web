<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <counter></counter>
    <alert></alert>
    <alert></alert>
    <alert></alert>
    <alert></alert>
    <alert></alert>
    <alert></alert>
    <alert></alert>
    <alert></alert>
    <alert></alert>

  </div>
</template>

<script>
import Counter from './Counter.vue'
import Alert from './Alert.vue'

export default {
  components: { Counter, Alert },
  name: 'App',
  data () {
    return {
      msg: 'Hello Vue 2.0!'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
