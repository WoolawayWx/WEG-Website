<template>
    <div class="packet">
        <div v-if="Packet_Status">
            <h3><i class="material-symbols-outlined titleParts">Warning</i> Active Packet <i class="material-symbols-outlined titleParts">Warning</i></h3>
            <h3>{{ PacketTitle }}</h3>
            <button @click="goToLink()">Click to view Packet</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/supabase';

let PacketTitle = ref("")
let PacketLink = ref("")
let Packet_Status = ref("")
let Packet_ID = ref("")

function goToLink() {
    window.open(PacketLink.value)
}
async function loadPackets() {
    console.clear
    const { data, error} = await supabase.from('packets').select()
    if(data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].Packet_Active) {
                console.log("ID: "+data[i].id)
                Packet_ID.value = data[i].id
                console.log("Yes")
                Packet_Status.value = data[i].Packet_Active
                PacketTitle.value = data[i].PacketName
                PacketLink.value = data[i].Packet_URL
                break;
            }
        }
    } else if (error) {
        console.log(error)
    }


}

onMounted(() => {
    loadPackets()
})

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ysabeau+SC:wght@1;100;200;300;400;500;600;700;800;900;1000&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@0,100;0,300;0,400;0,500;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
.alert-symbols {
    color: white;
    position: relative;
    align-items: center;
    vertical-align: middle;
    font-size: 20px;
}
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 20
}
.packet button {
  background-color: rgba(255, 255, 255, 0);
  color: white;
  margin: 8px;
  display: inline-block;
  border: 2px solid white;
  text-decoration: none;
  width: fit-content;
  height: 20px;
  font-family: 'Alegreya Sans', sans-serif;
  align-content: center;
  padding: auto;
}
.packet button:hover {
    background-color: white;
    color: black;
    border: 2px solid white;
}

</style>