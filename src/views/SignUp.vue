<template>
    <div>
        <h1>Sign Up</h1>
        <div>
            <p>Email</p>
            <label for="email"></label>
            <input type="email" id="email" v-model="email">
        </div>
        <div>
            <p>Password</p>
            <input type="password" id="password" v-model="password">
        </div>
        <button @click="createAccount()">Sign Up</button>
    </div>
</template>

<script setup>
import { supabase } from '@/supabase';
import { ref} from 'vue'

let email = ref("")
let password = ref("")

async function createAccount() {
    const { data, error} = await supabase.auth.signUp({
        email: email.value,
        password: password.value
    })
    if (error) {
        console.log(error)
    } else {
        console.log(data)
    }
}


</script>