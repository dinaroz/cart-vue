<template>

  <div id="app">

    <Navbar />

  </div>
</template>

<script>

import Navbar from "./components/Navbar.vue";
export default {
  name: "app",

  components: {
    Navbar
  }

};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons");
#app {
  font-family: "Roboto", sans-serif;
  text-align: center;
  color:#ffff;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
  .md-tabs-navigation .md-button {
      color: white !important;
  }
  
</style>
