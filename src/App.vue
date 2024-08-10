<template>
  <!-- <site_header class="mobile"></site_header> -->
  <!-- <siteHeaderNew></siteHeaderNew> -->
  <!-- <HomeView></HomeView> -->
  <appHeader></appHeader>
  <router-view/>
  <site_footer></site_footer>
</template>

<script setup>
import site_footer from './components/site_footer.vue';
/* import siteHeaderNew from '@/components/Header/siteHeaderNew.vue'; */
import appHeader from './components/Header/appHeader.vue';
</script>

<style>
@import url(@/components/styles/main.css);
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
@media only screen and (min-width: 768px) {
  .mobile {
    display: none;
  }
}
</style>
