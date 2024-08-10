<template>
    <h1>You are not logged in, or your account has been suspended.</h1>
    <p>Please attempt to log in again. If you have arrived on this page by mistake, please return to home and contiune your visit on the site.</p>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/account">Login</RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router';

</script>

<style>
</style>