<template>
    <NotAuth v-if="!auth"></NotAuth>
    <dailyMsgUpdate v-if="auth"></dailyMsgUpdate>
    
</template>

<script setup>
import NotAuth from '../NotAuth.vue';
import dailyMsgUpdate from '@/components/dailyMsgUpdate.vue';
import { supabase } from '@/supabase';
import { ref, onMounted } from 'vue'



let auth = ref("")


async function checkLoginStatus() {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
        console.log(error)
        console.log("Error")
    } else {
        if (data.session == null) {
            console.log("Session is Invalid")
            auth.value = false

        } else if (data.session.user.aud == "authenticated") {
          auth.value = true
          console.log("Authenticated: "+auth.value)
        } else {
          auth.value = false
        }
    }
}
onMounted(() => {
  checkLoginStatus()
})
</script>