<template>
    <NotAuth v-if="!auth"></NotAuth>
    <div v-if="auth">
        <h2>Update WEG Packets</h2>
       <table v-if="PacketData" class="table">
        <tr>
            <th>ID</th>
            <th>updateTime</th>
            <th>PacketName</th>
            <th>Packet_URL</th>
            <th>Packet_Active</th>
        </tr>
        <tr v-for="(item, index) in PacketArray" :key="index" class="row">
            <td class="cell">{{ item.id }}</td>
            <td class="cell">{{ item.updateTime }}</td>
            <td class="cell">{{ item.PacketName }}</td>
            <td class="cell"><a :href="item.Packet_URL" target="_blank">{{ item.Packet_URL }}</a></td>
            <td  class="cell">
                <!-- <span class="material-symbols-outlined green" v-if="item.Packet_Active">check_box</span> -->
                <p class="material-symbols-outlined green" v-if="item.Packet_Active">select_check_box</p>
                <span class="material-symbols-outlined red" v-if="!item.Packet_Active">check_box_outline_blank</span>
            </td>
        </tr>
    </table>
    <div class="inputArea">
        <div class="inputAreaChild">
            <p>Packet ID:  <select @change="packetID($event)">
                <option v-for="(item, index) in PacketArray" :key="index" :value="item.id">{{ item.id }}</option>
            </select> </p>
           
        </div>
        <div class="inputAreaChild">
            <p>Link to Packet: <input type="text" id="Packet_URL" placeholder="Packet Link" v-model="Update_Packet_URL"></p>
        </div>
        <div class="inputAreaChild">
            <button @click="Update_Packet_Status=true" v-if="!Update_Packet_Status">Activate Packet</button>
            <button @click="Update_Packet_Status=false" v-if="Update_Packet_Status">De-Activate Packet</button>
        </div>
        
    </div>
    <div>
            <table class="table">
                <tr>
                    <th>ID</th>
                    <th>updateTime</th>
                    <th>PacketName</th>
                    <th>Packet_URL</th>
                    <th>Packet_Active</th>
                </tr>
                <tr>
                    <td>{{ Update_Packet_ID }}</td>
                    <td>Updated via Supabase</td>
                    <td>{{ Update_Packet_PacketName }}</td>
                    <td>{{ Update_Packet_URL }}</td>
                    <td>{{ Update_Packet_Status }}</td>
                </tr>
            </table>
        </div>
        <div>
            <button @click="updatePackets()">Update Packets</button>
        </div> 
    </div>
    
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { supabase } from '@/supabase';
import NotAuth from '@/views/NotAuth.vue';
let PacketData = ref("")
let PacketArray = []
let Update_Packet_ID = ref("")
let Update_Packet_PacketName = ref("")
let Update_Packet_URL = ref("")
let Update_Packet_Status = ref("false")
let auth = ref("")
// let PacketID = ref("")
async function updatePackets() {
    Update_Packet_URL.value = Update_Packet_URL.value.toString()
    const { error} = await supabase.from('packets').update({
        Packet_Active: Update_Packet_Status.value,
        Packet_URL: Update_Packet_URL.value,
    })
    .eq('id', Update_Packet_ID.value)
    if (error) {
        console.log(error)
    }

}
function packetID(event) {
    Update_Packet_ID.value = event.target.value
    if (event.target.value == 1) {
        Update_Packet_PacketName.value = "Fire Weather Bulletin"
    } else if (event.target.value == 2) {
        Update_Packet_PacketName.value = "Situation Report"
    } else if (event.target.value == 3) {
        Update_Packet_PacketName.value = "Winter Weather Bulletin"
    } else if (event.target.value == 4) {
        Update_Packet_PacketName.value = "Special Packet"
    } else if (event.target.value == 5) {
        Update_Packet_PacketName.value = "Drought Packet"
    } else {
        Update_Packet_PacketName.value = "Not Listed"
    }

}
async function getPackets() {
    // Update_Packet_Status = false
  const { data } = await supabase.from('packets').select()
//   BannerInfo.value = data
    PacketArray = data
    PacketData.value = true
//   const bannervalues = BannerInfo.value[0]
//   BannerVis.value = bannervalues.banner_vis
//   BannerColor.value = bannervalues.color
//   BoldText.value = bannervalues.boldText
//   BODY.value =bannervalues.message
}
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
onMounted(()=>{
    checkLoginStatus()
    getPackets()

})
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 24
}
.green {
    color: green;
}
.red {
    color: red;
}
.cell  {
    padding: 5px;
}
.inputArea {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 30%;
    margin-left: 35%;
    margin-right: 35%;
}
.inputAreaChild {
    padding-left: 1em;
    padding-right: 1em;
}
</style>