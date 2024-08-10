<template>
    <div class="Page">
        <div class="LogIn-UI" v-if="!LoggedIn">
            <div class="Mode-Switch">
                <div class="Button-Area" @click="InputArea_LogIn()" >
                    <button class="ModeButton" :class="{ buttonActive: LogIn_Active}" >Log In</button>
                </div>
                <div class="Button-Area" @click="InputArea_SignUp()" >
                    <button class="ModeButton" :class="{buttonActive: SignUp_Active}" >Sign Up</button>
                </div>
            </div>
            <div class="Info-Area">
                <div v-if="LogIn_Active">
                    <LogInTemplate></LogInTemplate>
                </div>
                <div v-if="SignUp_Active">
                    <SignUp_Ele></SignUp_Ele>
                </div>
            </div>
        </div>
        <div class="Account-UI" v-if="LoggedIn">
            <div class="Info-Area" >
                <accountInfoPage></accountInfoPage>
            </div>
        </div>
        
    </div>
    
    
</template>

<script setup>
import { supabase } from '@/supabase';
import { onMounted, ref} from 'vue';
import { useHead } from '@unhead/vue'
import LogInTemplate from '@/components/account/elements/LogInTemplate.vue'
import SignUp_Ele from '@/components/account/elements/SignUp_Ele.vue';
import accountInfoPage from '@/components/account/elements/accountInfoPage.vue';
useHead({
  title: 'Account - WEG',
  
})
let LogIn_Active = ref("")
let SignUp_Active = ref("")
let LoggedIn = ref("")

let invalidLogin = ref("")

let firstName = ref("")
let lastName = ref("")
let job = ref("")
let role = ref("")
let accountCreate = ref("")
let email = ref("")


async function SesstionStatus() {
    const {data, error} = await supabase.auth.getSession()
    if(data.session == null) {
        LoggedIn.value = false
    } else if(error) {
        console.log(error)
    } else {
        LoggedIn.value = true
    }
}
function InputArea_SignUp() {
    LogIn_Active.value = false
    SignUp_Active.value = true
}
function InputArea_LogIn() {
    LogIn_Active.value = true
    SignUp_Active.value = false
}       

async function getUserInfo() {
    if(LoggedIn.value == true) {
        let SiteUser = await supabase.auth.getSession()
        const a = new Date(SiteUser.data.session.user.created_at)
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        const months = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
        accountCreate.value = dayNames[a.getDay()].toString()+", "+months[a.getMonth()].toString()+" "+a.getDate().toString()+", "+a.getFullYear().toString()
        email.value = SiteUser.data.session.user.email
        firstName.value = SiteUser.data.session.user.user_metadata.FirstName
        lastName.value = SiteUser.data.session.user.user_metadata.LastName
        role.value = SiteUser.data.session.user.user_metadata.Role
        job.value = SiteUser.data.session.user.user_metadata.Department 
    }
  

}
onMounted(() => {
    invalidLogin.value = false
    SesstionStatus()
    InputArea_LogIn()
    getUserInfo()
    
})
</script>

<style>
@media (min-width: 768px) {
    .Page {
        background-image: url("https://rxvuigbyexdarrlusojh.supabase.co/storage/v1/object/public/weg_public/images/raychel-sanner-QMT9sUm6yPE-unsplash.jpg");
        width: 100%;
        aspect-ratio: 16/8;
        background-position: center center;
        background-repeat: no-repeat;
        background-clip: inherit;
        background-size: auto;
        background-size:     cover;
        margin: 0px;
        position: relative;
    }
    .LogIn-UI {
        position: absolute;
        width: 30%;
        height: 50%;
        top: 25%;
        left: 35%;
        background-color: white;
        border-radius: 5%;
        display: flex;
        flex-direction: column;
    }
    .Account-UI {
        width: 30%;
        height: 50%;
        position: absolute;
        top: 25%;
        left: 35%;
        background-color: white;
        border-radius: 5%;
    }

    .Mode-Switch {
        display: flex;
        flex-direction: row;
        position: relative;
        height: 15%;
        width: 100%;
    }
    .Button-Area {
        width: 50%;
        position: relative;
    }
    .Button-Area button {
        position: absolute;
        width: 80%;
        left: 10%;
        height: 80%;
        top: 10%;
        font-size: 1.5cqw;
        text-transform: uppercase;
        border-radius: 1cqw;
    }
    .ModeButton {
        background-color: white;
    }
    .buttonActive {
        background-color: rgb(139, 24, 26);
        border: 0.1cqw solid black;
        color: white;
    }
    .Info-Area {
        position: relative;
        width: 100%;
        height: 100%;

    }
    .Input-Area {
        position: absolute;
        border: 0.25cqw solid black;
        top: 2.5%;
        left: 2.5%;
        bottom: 2.5%;
        right: 2.5%;
        border-radius: 2cqw;
        display: flex;
        flex-direction: column;
    }
    .Input-Area-Input h4 {
        margin: 4px;
        padding: 0%;
        text-transform: uppercase;
        color: black;
    }
    .Input-Area-Input input {
        width: 90%;
    }
    .Input-Area button {
        background-color: black;
        border: 0.25cqw solid rgb(139, 24, 26);
        width: 40%;
        color: white;
        text-transform: uppercase;
        border-radius: 1cqw;
        margin-top: 1cqw;
    }
    
}
@media (max-width: 768px) {
    .Page {
        background-image: url("https://rxvuigbyexdarrlusojh.supabase.co/storage/v1/object/public/weg_public/images/raychel-sanner-QMT9sUm6yPE-unsplash.jpg");
        width: 100%;
        aspect-ratio: 16/14;
        background-position: center center;
        background-repeat: no-repeat;
        background-clip: inherit;
        background-size: auto;
        background-size:     cover;
        margin: 0px;
        position: relative;
    }
    .LogIn-UI {
        position: absolute;
        width: 80%;
        height: 90%;
        top: 5%;
        bottom: 5%;
        left: 10%;
        background-color: white;
        border-radius: 2cqw;
        display: flex;
        flex-direction: column;
    }
    .Account-UI {
        width: 80%;
        height: 80%;
        position: absolute;
        top: 10%;
        left: 10%;
        background-color: white;
        border-radius: 2cqw;
    }

    .Mode-Switch {
        display: flex;
        flex-direction: row;
        position: relative;
        height: 40px;
        width: 100%;
    }
    .Button-Area {
        width: 50%;
        position: relative;
    }
    .Button-Area button {
        position: absolute;
        width: 80%;
        left: 10%;
        height: 100%;
        top: 10%;
        font-size: 3cqw;
        text-transform: uppercase;
        border-radius: 1cqw;
        border: 1cqw solid black;
    }
    .ModeButton {
        background-color: white;
        color: black;
    }
    .buttonActive {
        background-color: rgb(139, 24, 26);
        border: 0.1cqw solid black;
        color: white;
    }
    .Info-Area {
        margin-top: 2cqw;
        position: relative;
        width: 100%;
        left: 0;
        top: 0%;
        bottom: 0%;
        overflow: hidden;
        height: 70%;

    }
    .Input-Area {
        position: absolute;
        border: 0.25cqw solid black;
        top: 2.5%;
        left: 2.5%;
        bottom: 2.5%;
        right: 2.5%;
        border-radius: 2cqw;
        display: flex;
        flex-direction: column;
    }
    .Input-Area-Input h4 {
        margin: 4px;
        padding: 0%;
        text-transform: uppercase;
        color: black;
    }
    .Input-Area-Input input {
        width: 90%;
    }
    .Input-Area button {
        background-color: black;
        border: 0.25cqw solid rgb(139, 24, 26);
        width: 40%;
        color: white;
        text-transform: uppercase;
        border-radius: 1cqw;
        margin-top: 1cqw;
    }
    
}

</style>