<template>
  <appHeader></appHeader>
  <router-view/>
  <appFooter></appFooter>
</template>

<script setup>
import appHeader from './components/Header/appHeader.vue';
import appFooter from './components/Footer/appFooter.vue';
</script>

<style>
@import url(@/components/styles/main.css);

</style>
