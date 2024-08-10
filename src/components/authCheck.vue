<template>
    <site_header></site_header>
    <div class="loggedIn" v-if="Sitestatus">
        <h1>You are Logged In</h1>
        <p>User Email: {{ UserEmail }}</p>
    </div>
    <div class="404" v-if="!Sitestatus">
        <h1>You are not Logged In</h1>
    </div>
    <RouterLink to="/account" v-if="!Sitestatus"><button>Log In</button></RouterLink>
    <button @click="SignOut()" v-if="Sitestatus">Sign Out</button>


    <site_footer></site_footer>
</template>

<script setup>
import site_header from './site_header.vue';
import site_footer from './site_footer.vue';
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router';
import { supabase } from '@/supabase';

let Sitestatus = ref("")
let UserEmail = ref("")

async function getSession() {
    console.clear
    const { data, error } = await supabase.auth.getSession()
    if (error) {
        console.log(error)
        console.log("Error")
    } else {
        if (data.session == null) {
            console.log("Session is Invalid")
            Sitestatus.value = false
        } else if (data.session.user.aud == "authenticated") {
            Sitestatus.value = true
            UserEmail.value = data.session.user.email
        }
    }
    // UserEmail.value = data.session.user.email

}
async function SignOut() {

const { error } = await supabase.auth.signOut()
if (error) {
    console.log(error)
}
}

onMounted(() => {
  getSession()
})

</script>


<style>

</style>