<template>
    <div>
        <div class="A02-LoginPage-Container">
            <h2 class="LoginPage-Item">Sign Up</h2>
            <p>Use your email and password to create an account</p>
            <form class="Login-Form">
                <div class="Login-Form-Element">
                    <label for="email">Email</label><br>
                    <input type="email" id="email" v-model="email" autocomplete="email" placeholder="JohnSmith@example.com" required>
                </div>
                <div class="Login-Form-Element">
                    <label for="password">Password</label><br>
                    <input type="password" id="password" v-model="password" autocomplete="new-password" required>
                </div>
                <div class="Login-Form-Element">
                    <label for="check">What is {{ Value1 }} + {{ Value2 }}</label>
                    <input type="number" id="check" v-model="UserTot" required>
                </div>
            </form>
            <button @click="SignUserUp()" class="LoginPage-Input-Button" v-if="UserTot == TotValue">Sign Up</button>
            <p v-if="Redirect">You have logged in, this page will be reloaded now.</p>
        </div>
     </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import { supabase } from '@/supabase'

let email = ref("")
let password = ref("")
let Redirect = ref("")
let siteKey = ref("")
let Value1 = ref()
let Value2 = ref()
let TotValue = ref()
let UserTot= ref()
siteKey.value = process.env.VUE_APP_GOOGLESITEKEY

async function User_SignUp() {

    const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
    })
    if(error) {
        console.log(error)
    }if(data) (
        window.alert("An email has been sent to the email you provided to authenticate your email.")
    )

}
function LoadQuestions() {
    var NUM1 =  Math.floor(Math.random() * 6);
    var NUM2 =  Math.floor(Math.random() * 6);
    var TOT = NUM1 + NUM2
    TotValue.value = TOT
    Value1.value = NUM1
    Value2.value = NUM2

}
onMounted(() => {
    LoadQuestions()
})
// async function AddUserToGroup() {
//     const gid = 'dfc1f42f-0fb1-413e-b02d-87950c6063ac'
//     const group_role = 'members'
//     const user_email = email.value
//     let assignGroup = await supabase
//     .rpc('add_group_user_by_email', {
//         gid, 
//         group_role, 
//         user_email
//     })
//     console.log(assignGroup)
// }

async function SignUserUp() {
    await User_SignUp()
    await sleep(100)
    
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

</script>

<style scoped>
@media (min-width: 768px) {
    .A02-LoginPage-Container {
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
    .A02-LoginPage-Container p {
        text-transform: uppercase;
        font-size: 1cqw;
        padding: 0;
        margin: 0%;
    }
    .A02-LoginPage-Container h2 {
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
    .A02-LoginPage-Container button {
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
    .A02-LoginPage-Container button:hover {
        background-color: black;
        color: white;
    }
}
@media (max-width: 768px) {
    .A02-LoginPage-Container {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 2.5%;
        bottom: 2.5%;
        left: 2.5%;
        right: 2.5%;
    }
    .A02-LoginPage-Container p {
        text-transform: uppercase;
        font-size: 2.5cqw;
        font-weight: bold;
        padding: 0;
        margin: 0%;
    }
    .A02-LoginPage-Container h2 {
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
    .A02-LoginPage-Container button {
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
    .A02-LoginPage-Container button:hover {
        background-color: black;
        color: white;
    }
}

</style>