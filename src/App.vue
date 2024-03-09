<template>
  <div id="app">
    <header>
      <h1>My Task Manager</h1>
      <nav>
        <router-link to="/">Home</router-link> 
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

body {
  background-color: #abd0f3d8;
}

#app {
  font-family: "JetBrains Mono",monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #11181fad;
  margin-top: 60px;
}
nav a {
  margin: 10px;
  text-decoration: none;
  color: #ffffff;
  font-size: 32px;
}

nav a:hover {
  color: #055e0891;
}
</style>
