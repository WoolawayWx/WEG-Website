<template>
    <div class="LoginPage">
        <div v-if="LoggedIn">
            <div class="LoginPage-Container">
                <p>You are already logged in, so no need to log in again.</p>
                <RouterLink to="/"><p>Return Home</p></RouterLink>
                <RouterLink to="/account"><p>View Account</p></RouterLink>

            </div>
        </div>
        <div class="LoginPage-Container" v-if="!LoggedIn">
            <h2 class="LoginPage-Item">Login</h2>
            <form class="LoginPage-InputArea LoginPage-Item">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" autocomplete="email" placeholder="JohnSmith@example.com" required>
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" autocomplete="current-password" required>
            </form>
            <button @click="User_SignIn()" class="LoginPage-Input-Button">Log In</button>
            <p v-if="invalidLogin">Email/Password is not correct. Try again.</p>
        </div>
     </div>
</template>

<script setup>
import {ref} from "vue";
import { supabase } from '@/supabase'
import { LoggedIn } from "@/router";

let email = ref("")
let password = ref("")
let invalidLogin = ref("")

async function User_SignIn() {
    const {data, error} = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })
    if(error) {
        console.log(error)
        invalidLogin.value = true
    } else if(data) {
        console.log(data)
        LoggedIn.value = true
    } else {
        console.log("An unknown error occured")
    }
}

</script>

<style>
@media only screen and (max-width: 768px) {
    .inputArea {
        font-size: large;
    }
}
@media (min-width: 768px) {
    .LoginPage {
        background-image: url("https://rxvuigbyexdarrlusojh.supabase.co/storage/v1/object/public/weg_public/images/raychel-sanner-QMT9sUm6yPE-unsplash.jpg");
        width: 100%;
        aspect-ratio: 16/8;
        background-position: center center;
        background-repeat: no-repeat;
        background-clip: inherit;
        background-size: auto;
        background-size:     cover;
        margin: 0px;
    }
    .LoginPage-Container {
        width: 30%;
        margin-right: 35%;
        margin-left: 35%;
        margin-top: auto;
        background-color: white;
        height: fit-content;
        vertical-align: middle;
        padding: 2cqw;
        border: 2px solid black;
        border-radius: 2cqw;
        transform: translateY(50%);
    }
    .LoginPage-Item {
        display: flex;
        flex-direction: column;
    }
    .LoginPage-Item h2 {
        margin: 0px;
        padding: 0px;
    }
    .LoginPage-Input-Button {
        width: 30%;
        margin: 10px;
        margin-left: 35%;
        margin-right: 35%;
        background-color: white;
        border: 0.1cqw solid black;
        border-radius: 0.5cqw;
        text-transform: uppercase;
        
    }
}
@media (max-width: 768px) {
    
}
</style>