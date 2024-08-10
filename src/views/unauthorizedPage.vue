<template>
    <div class="main">
        <h1>unauthorized</h1>
        <p>You are not logged in, or your account does not meet the requirements for the page that you are trying to access. Please make sure you are logged in, with the proper account, and try again. If you believe that you should have access to the page you are trying to reach, please contact Cade at <a href="mailto:cade@wooalwaywx.com">cade@wooalwaywx.com</a>.</p>
        <RouterLink to="/login"><button>Go to Login Page</button></RouterLink>
        
    </div>

</template>

<script setup>

</script>

<style>
.main {
    width: 90%;
    margin: 5%;
}
.main h1 {
    text-transform: uppercase;
}
.main button {
    background-color: white;
    color: black;
    border: solid black 0.5cqw;
    width: 30%;
    height: 3/1;
    border-radius: 0.75cqw;
}
.main button:hover {
    background-color: black;
    color: white;
}
</style>