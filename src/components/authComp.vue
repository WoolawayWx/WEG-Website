<template>
    <div>
        <h1>Sign In or Sign Up</h1>
        <div>
            <h3>Email</h3>
            <input type="email" id="email" v-model="email" placeholder="name@website.com">
        </div>
        <div>
            <h3>Password</h3>
            <input type="password" id="password" v-model="password">
        </div>
        <button @click="LogIn()">Log In</button>
        <button @click="SignUp()">Sign Up</button>
        <RouterLink to="/">
            <button>Check Auth</button>
        </RouterLink>

    </div>
    <div>
        <h3>Log Out</h3>
        <button @click="SignOut()"></button>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '@/supabase';
import { RouterLink } from 'vue-router';

let email = ref("")
let password = ref("")

// Log In
async function LogIn() {
    const { data, error} = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    })
    if (error) {
        console.log(error)
    } else {
        console.log(data)
    }
}
// Sign Up
async function SignUp() {
    const { data, error} = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
    })
    if (error) {
        console.log(error)
    } else {
        console.log(data)
    }
}
// Sign Out
async function SignOut() {

const { error } = await supabase.auth.signOut()
if (error) {
    console.log(error)
}
}

</script>

<style>

</style>