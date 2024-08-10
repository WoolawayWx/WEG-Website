<template>
    <div>
        <div class="A03-LoginPage-Container">
            <h2 class="LoginPage-Item">Your Account Information</h2>
            <div class="Info-Display-Area">
                <h3>{{ firstName }} {{ lastName }}</h3>
                <p>{{ email }}</p>
                <p>Member Since: {{ accountCreate }}</p>
                <p>{{ Role }} at {{ Department }}</p>
            </div>
            

            <button class="LoginPage-Input-Button" @click="PushPage('Edit Account Infomation')">Edit Account Info</button>
            <button @click="AddUserToGroup()">Add Member Role</button>
            <button @click="SignOut()">Sign Out</button>
        </div>
    </div>
</template>

<script setup>
import { supabase } from '@/supabase';
import { ref, onMounted} from 'vue';
import router, { SignOut } from '@/router';

let accountCreate = ref("")
let Department = ref("")
let lastName = ref("")
let email = ref("")
let firstName = ref("")
let Role = ref("")

function PushPage(params) {
    router.push({ name: params})
}

async function getUserInfo() {
        let SiteUser = await supabase.auth.getSession()
        const a = new Date(SiteUser.data.session.user.created_at)
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        const months = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
        accountCreate.value = dayNames[a.getDay()].toString()+", "+months[a.getMonth()].toString()+" "+a.getDate().toString()+", "+a.getFullYear().toString()
        const UserData = SiteUser.data.session.user.user_metadata
        if(Object.prototype.hasOwnProperty.call(UserData, 'FirstName')) {firstName.value = (SiteUser.data.session.user.user_metadata.FirstName).toString()}
        if(Object.prototype.hasOwnProperty.call(UserData, 'LastName')) {lastName.value = (SiteUser.data.session.user.user_metadata.LastName).toString()}
        if(Object.prototype.hasOwnProperty.call(UserData, 'Department')) {Department.value = (SiteUser.data.session.user.user_metadata.Department).toString()}
        if(Object.prototype.hasOwnProperty.call(UserData, 'Role')) {Role.value = (SiteUser.data.session.user.user_metadata.Role).toString()}
        email.value = SiteUser.data.session.user.email
  }

async function AddUserToGroup() {
    const gid = 'dfc1f42f-0fb1-413e-b02d-87950c6063ac'
    const group_role = 'members'
    const user_email = email.value
    let { data, error } = await supabase
    .rpc('add_group_user_by_email', {
        gid, 
        group_role, 
        user_email
    })
    if(error) {
        console.log(error)
    } else if(data) {
        alert("Member role has been added")
    }
}
onMounted(() => {
    getUserInfo()
})
</script>

<style scoped>
@media (min-width: 768px) {
    .Info-Display-Area h3{
        padding: 0%;
        margin: 0;
    }
    .A03-LoginPage-Container {
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
    .A03-LoginPage-Container p {
        text-transform: uppercase;
        font-size: 1cqw;
        padding: 0;
        margin: 0%;
    }
    .A03-LoginPage-Container h2 {
        text-transform: uppercase;
        font-size: 2cqw;
        padding: 0;
        margin: 0%;
    }
    .A03-LoginPage-Container button {
        width: 50%;
        margin-left: 25%;
        margin-top: 1cqw;
        background-color: white;
        border-radius: 2cqw;
        border: 0.25vh solid black;
        font-size: 1.5vh;
    }
    .A03-LoginPage-Container button:hover {
        background-color: black;
        color: white;
    }
    .Login-Form-Element input {
        width: 90%;
    }
    .Login-Form-Element label {
        text-transform: uppercase;
        font-size: 1.25cqw
    }
}
@media (max-width: 768px) {
    .Info-Display-Area h3{
        padding: 0%;
        margin: 0;
        text-transform: uppercase;
    }
    .Info-Display-Area p{
        padding: 0%;
        margin: 0;
    }
    .A03-LoginPage-Container {
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
    .A03-LoginPage-Container p {
        text-transform: uppercase;
        font-size: 3cqw;
        padding: 0;
        margin: 0%;
    }
    .A03-LoginPage-Container h2 {
        text-transform: uppercase;
        font-size: 3cqw;
        padding: 0;
        margin: 0%;
    }
    .A03-LoginPage-Container button {
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
    .A03-LoginPage-Container button:hover {
        background-color: black;
        color: white;
    }
    .Login-Form-Element input {
        width: 90%;
    }
    .Login-Form-Element label {
        text-transform: uppercase;
        font-size: 1.25cqw
    }
}

</style>