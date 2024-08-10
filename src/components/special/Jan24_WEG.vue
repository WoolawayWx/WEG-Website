<template>
    <div class="InputArea">
        <h1 class="InputArea_Sub">RSVP for January 3rd, 2024 Command Meeting</h1>
        <p class="InputArea_Sub">The upcoming event is planned for Wednesday, January 3rd, 2024, beginning at 1800 hours (6:00 PM) at the Butterfield Fire Station. We kindly ask for your full name, department, rank, and an active email address to ensure smooth communication of important details.

This event is specifically for officers or higher-ranking members within WEG departments. Others may attend if they have been personally invited by Cade Woolaway or by the command staff following communication with Cade.</p>

    
        <div class="InputArea_Sub">
            <p>First Name</p>
            <input id="Name_First" v-model="Name_First" placeholder="First Name" class="textInput">
        </div>
        <div class="InputArea_Sub">
            <p>Last Name</p>
            <input id="Name_Last" v-model="Name_Last" placeholder="Last Name" class="textInput">
        </div>
        <div class="InputArea_Sub">
            <p>Department Name</p>
            <input id="Department" v-model="Department" placeholder="Department" class="textInput">
        </div>
        <div class="InputArea_Sub">
            <p>Rank/Role</p>
            <input id="Rank" v-model="Rank" placeholder="Rank and Role" class="textInput">
        </div>
        <div class="InputArea_Sub">
            <p>Email</p>
            <input type="email" id="email" v-model="email" placeholder="Email" class="textInput">
        </div>
        <div class="InputArea_Sub">
            <h3>Confirm your details</h3>
            <p>Name: {{ Name_First }} {{ Name_Last }}</p>
            <p>{{ Department }}, {{ Rank }}</p>
            <p>Email: {{ email }}</p>
        </div>
        <div class="InputArea_Sub">
            <button @click="addRSVP">Submit</button>
        </div>
        <div class="InputArea_Sub">
            <h1>Thank you for submitting your RSVP.</h1>
        </div>

    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'


let Rank = ref("")
let Department = ref("")
let Name_First = ref("")
let Name_Last = ref("")
let email = ref("")
let id = ref("")

async function addRSVP() {
    // window.confirm("Confirm RSVP");
    if (confirm("Confirm RSVP?")) {
        const { error } = await supabase.from('RSVPs')
        .insert({
            id: id.value,
            Name_First: Name_First.value,
            Name_Last: Name_Last.value,
            Rank_Role: Rank.value,
            Department: Department.value,
            email: email.value,

        })
        if(error) {
            console.log(error)
        }
        alert("RSVP Confirmed")
        location.reload()
    } else {
        alert("RSVP Canceled")
    }
}
async function checkNumbers() {
    const { data, error } = await supabase.from('RSVPs').select()
    id.value = data.length+1

    if(error) {
        console.log(error)
    }
}


onMounted(() =>{
    checkNumbers()
})
</script>

<style>
/* PC */
@media only screen and (min-width: 786px) {
    .InputArea {
        display: flex;
        flex-direction: column;
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
    }
    .InputArea_Sub {
        width: 100%;
    }
    h1 {
        font-size: 3cqw;
        text-align: center;
    }
    .textInput{
        width: 60%;    
        aspect-ratio: 15/1;
        font-size: larger;
    }
    p {
        font-size: 1.5cqw;
    }
    
}
/* Mobile */
@media only screen and (max-width: 786px) {
    .InputArea {
        display: flex;
        flex-direction: column;
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
    }
    .InputArea_Sub {
        width: 100%;
    }
    h1 {
        font-size: 6cqw;
        text-align: center;
    }
    .textInput{
        width: 95%;    
    }
    
}
</style>