<template>
  <div id="app">
    <header>
      <h1>My Task Manager</h1>
      <nav>
        <router-link to="/">Home</router-link> | 
        <router-link to="/tasks">Tasks</router-link>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
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
nav a {
  margin: 10px;
  text-decoration: none;
  color: #42b983;
}
</style>
