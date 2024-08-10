<template>
    <div class="Page">
        <div class="Account-Edit-Main">
            <div class="Account-Edit-Info">
                <h1>Edit Account Infomation</h1>
                <p>You can edit your account infomation like name, department, and role.</p>
                <p><i>Note: Right now, password and email changes are not available.</i></p>
                <p>Your current infomation is displayed in the boxes so you can see what is set. Once you make the changes you want, click "Update Infomation". and your infomation will be updated.</p>
            </div>
            <div class="Account-Edit-Area">
                <div class="Info-Input-Container">
                    <h3>First Name</h3>
                    <input id="FirstName" v-model="FirstName">
                    <h3>Last Name</h3>
                    <input id="LastName" v-model="LastName">
                    <h3>Rank or Role</h3>
                    <input id="role" v-model="Role">
                    <h3>Department</h3>
                    <input id="department" v-model="Department">
                    <button class="submit-button" @click="UpdateInfomation()">Update Infomation</button>
                </div>
            </div>
            
        </div>

    </div>
</template>

<script setup>
import { supabase } from '@/supabase';
import { onMounted, ref } from 'vue';

let FirstName = ref("")
let LastName = ref("")
let Department = ref("")
let Role = ref("")
let UserID = ref("")



async function UpdateInfomation() {
    if(confirm('Confirm that you want to update your acccount infomation.')) {
        const UpdateData = await supabase.from('profiles').update({
            first_name: FirstName.value,
            last_name: LastName.value,
            department: Department.value,
            rank: Role.value
        }).eq('id', UserID.value) 
        if(UpdateData.status == "204") {
            alert("Your account infomation has been updated.")
        } else {
            alert("An error occured. Please try again. If you keep getting this error, please contact Cade at cade@woolawaywx.com")
        }
    }
    
}
async function LoadInfomation() {
    const SiteUser = await supabase.auth.getSession()
    UserID.value = SiteUser.data.session.user.id
    const UserProfile = await supabase.from('profiles').select()
    for(let i = 0; i < UserProfile.data.length; i++) {
        if(UserProfile.data[i].id == UserID.value) {
            const ProfileData = UserProfile.data[i]
            FirstName.value = ProfileData.first_name
            LastName.value = ProfileData.last_name
            Department.value = ProfileData.department
            Role.value = ProfileData.rank

        }
    }
}
onMounted(() => {
    LoadInfomation()
})
</script>

<style scoped>
@media (min-width: 768px) {
    .Page {
        background-image: url("https://rxvuigbyexdarrlusojh.supabase.co/storage/v1/object/public/weg_public/images/raychel-sanner-QMT9sUm6yPE-unsplash.jpg");
        width: 100%;
        aspect-ratio: 16/10;
        background-position: center center;
        background-repeat: no-repeat;
        background-clip: inherit;
        background-size: auto;
        background-size:     cover;
        margin: 0px;
        position: relative;
    }
    .Account-Edit-Main {
        position: absolute;
        background-color: white;
        height: 80%;
        width: 80%;
        top: 10%;
        bottom: 10%;
        right: 10%;
        left: 10%;
        border-radius: 2cqw;
        border: solid black 0.25cqw;
    }
    .Account-Edit-Info {
        position: absolute;
        height: 20%;
        top: 0%;
        width: 75%;
        left: 12.5%;
    }
    .Account-Edit-Info h1 {
        padding: 0;
        margin: 0;
        font-size: 2cqw;
    }
    .Account-Edit-Info p {
        padding: 0;
        margin: 0;
        font-size: 1cqw;
    }
    .Account-Edit-Area {
        position: absolute;
        height: 80%;
        top: 20%;
        width: 100%;
        left: 0%;
    }
    .Info-Input-Container {
        position: absolute;
        left: 20%;
        width: 60%;
        display: flex;
        flex-direction: column;
    }
    .Info-Input-Container h3 {
        padding: 0;
        margin: 0;
        font-size: 2cqw;
    }
    .submit-button {
        width: 50%;
        margin-left: 25%;
        margin-top: 2cqw;
        padding: 0.5cqw;
        border: 0.25cqw solid black;
        border-radius: 1cqw;
        background-color: white;
        color: black;
        text-transform: uppercase;
        font-size: 1.25cqw;
        font-family: 'Alegreya Sans', sans-serif;

    }
}
@media (max-width: 768px) {
    .Page {
        background-image: url("https://rxvuigbyexdarrlusojh.supabase.co/storage/v1/object/public/weg_public/images/raychel-sanner-QMT9sUm6yPE-unsplash.jpg");
        width: 100%;
        aspect-ratio: 16/10;
        background-position: center center;
        background-repeat: no-repeat;
        background-clip: inherit;
        background-size: auto;
        background-size:     cover;
        margin: 0px;
        position: relative;
    }
    .Account-Edit-Main {
        position: absolute;
        background-color: white;
        height: 95%;
        width: 80%;
        top: 2.5%;
        bottom: 10%;
        right: 10%;
        left: 10%;
        border-radius: 2cqw;
        border: solid black 0.25cqw;
    }
    .Account-Edit-Info {
        position: absolute;
        height: 30%;
        top: 0%;
        width: 75%;
        left: 12.5%;
    }
    .Account-Edit-Info h1 {
        padding: 0;
        margin: 0;
        font-size: 3cqw;
    }
    .Account-Edit-Info p {
        padding: 0;
        margin: 0;
        font-size: 1.5cqw;
    }
    .Account-Edit-Area {
        position: absolute;
        height: 70%;
        top: 35%;
        width: 100%;
        left: 0%;
    }
    .Info-Input-Container {
        position: absolute;
        left: 20%;
        width: 60%;
        display: flex;
        flex-direction: column;
    }
    .Info-Input-Container h3 {
        padding: 0;
        margin: 0;
        font-size: 2cqw;
    }
    .submit-button {
        width: 50%;
        margin-left: 25%;
        margin-top: 2cqw;
        padding: 0.5cqw;
        border: 0.25cqw solid black;
        border-radius: 1cqw;
        background-color: white;
        color: black;
        text-transform: uppercase;
        font-size: 1.75cqw;
        font-family: 'Alegreya Sans', sans-serif;

    }
}
</style>

