<template>
    <div>
        <div class="A01-LoginPage-Container">
            <h2 class="LoginPage-Item">Login</h2>
            <p>Use your email and password to log in</p>
            <form class="Login-Form">
                <div class="Login-Form-Element">
                    <label for="email">Email</label><br>
                    <input type="email" id="email" v-model="email" autocomplete="email" placeholder="JohnSmith@example.com" required>
                </div>
                <div class="Login-Form-Element">
                    <label for="password">Password</label><br>
                    <input type="password" id="password" v-model="password" autocomplete="current-password" required>
                </div>
            </form>
            <button @click="User_SignIn()" class="LoginPage-Input-Button">Log In</button>
            <p v-if="invalidLogin">Email/Password is not correct. Try again.</p>
            <p v-if="Redirect">You have logged in, this page will be reloaded now.</p>
        </div>
     </div>
</template>

<script setup>
import {ref} from "vue";
import { supabase } from '@/supabase'

let email = ref("")
let password = ref("")
let invalidLogin = ref("")
let Redirect = ref("")

async function User_SignIn() {
    const {data, error} = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })
    if(error) {
        invalidLogin.value = true
    } else if(data) {
        Redirect.value = true
        await sleep(3000)
        // await GetMetaData()
        location.reload()

    } else {
        console.log("An unknown error occured")
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

</script>

<style scoped>
@media (min-width: 768px) {
    .A01-LoginPage-Container {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 2.5%;
        bottom: 2.5%;
        left: 2.5%;
        right: 2.5%;
        border: 0.2cqw solid black;
        border-radius: 1.5cqw;
    }
    .A01-LoginPage-Container p {
        text-transform: uppercase;
        font-size: 1cqw;
        padding: 0;
        margin: 0%;
    }
    .A01-LoginPage-Container h2 {
        text-transform: uppercase;
        font-size: 2cqw;
        padding: 0;
        margin: 0%;
    }
    .Login-Form-Element input {
        width: 90%;
    }
    .Login-Form-Element label {
        text-transform: uppercase;
        font-size: 1.25cqw
    }
    .A01-LoginPage-Container button {
        width: 50%;
        margin-left: 25%;
        margin-top: 1cqw;
        background-color: white;
        color: black;
        text-transform: uppercase;
        border-radius: 2cqw;
        border: 0.25vh solid black;
        font-size: 1.5vh;
    }
    .A01-LoginPage-Container button:hover {
        background-color: black;
        color: white;
    }
}
@media (max-width: 768px) {
    .A01-LoginPage-Container {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 2.5%;
        bottom: 2.5%;
        left: 2.5%;
        right: 2.5%;
    }
    .A01-LoginPage-Container p {
        text-transform: uppercase;
        font-size: 2.5cqw;
        font-weight: bold;
        padding: 0;
        margin: 0%;
    }
    .LoginPage-Container h2 {
        text-transform: uppercase;
        font-size: 4cqw;
        padding: 0;
        margin: 0%;
    }
    .Login-Form-Element input {
        width: 90%;
    }
    .Login-Form-Element label {
        text-transform: uppercase;
        font-size: 3cqw;
        font-weight: bold;
    }
    .A01-LoginPage-Container button {
        width: 50%;
        margin-left: 25%;
        margin-top: 1cqw;
        background-color: white;
        color: black;
        text-transform: uppercase;
        border-radius: 2cqw;
        border: 0.25vh solid black;
        font-size: 1.5vh;
    }
    .A01-LoginPage-Container button:hover {
        background-color: black;
        color: white;
    }
}


</style>