<template>
    <div class="LoginPage">
        <div class="LoginPage-Container">
            <h2 class="LoginPage-Item">Login</h2>
            <form class="LoginPage-InputArea LoginPage-Item">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" placeholder="JohnSmith@example.com">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password">
                <button @click="User_LogIn()">Log In</button>
                <p v-if="LoggedIn">Logged In!</p>
                <p v-if="invalidLogin">Email/Password is not correct. Try again.</p>
            </form>
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

async function User_LogIn() {
    const { error} = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    })
    if (error) {
        console.log(error)
        invalidLogin.value = true
    } else {
        // location.reload();
        console.log("Logged In")
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
    .LoginPage-InputArea button {
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