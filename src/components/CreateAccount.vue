<template>
    <div class="loginArea">
        <h2>Sign Up for WEG</h2>
        <h3>First Name:</h3>
        <div class="inputArea">
            <input type="text" id="nameFirst" v-model="nameFirst">
        </div>
        <h3>Last Name:</h3>
        <div class="inputArea">
            <input type="text" id="nameLast" v-model="nameLast">
        </div>
        <h3>Email: </h3>
        <div class="inputArea">
            <input type="email" id="email" v-model="email">
        </div>

        <h3>Password</h3>
        <div class="inputArea">
            <input type="password" id="password" v-model="password">
        </div>
        <button @click="createAccount()">Create Account</button>
        <br>
        <div>
            <RouterLink to="/">
                <button>Log In</button>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { RouterLink} from 'vue-router';
import {ref} from "vue";
import { supabase } from '@/supabase';




let email = ref("")
let password = ref("")
let nameFirst = ref("")
let nameLast = ref("")

// create account
async function createAccount() {
    console.log("Create Account")
    const {data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,

    })
    if (error) {
        console.log(error)
    }
    else {
        console.log(data)
    }
}

</script>

<style>
.loginArea{
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    border: 2px black solid;
    padding-bottom: 10px;
    margin-bottom: 10px;
}
.inputArea{
    width: 60%;
    margin-left: 20%;
    margin-right: 20%;
}

</style>