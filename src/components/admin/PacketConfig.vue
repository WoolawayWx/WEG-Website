<script setup>
import { supabase } from '@/supabase';
import { onMounted, ref } from 'vue';

let PacketData = ref("")
let PacketName = ref("")
let PacketLink = ref("")
let Active = ref("")

async function LoadPacketData() {
    let { data: PacketAlerts, error } = await supabase
    .from('PacketAlerts')
    .select('*')        
    if(error) {console.log(error)} else{
        PacketData.value = PacketAlerts[0]
    }
        PacketName.value = PacketData.value.PacketName
        PacketLink.value = PacketData.value.PacketURL
        Active.value = PacketData.value.PacketStatus

}
async function UpdateDBData() {
    const { data, error } = await supabase
    .from('PacketAlerts')
    .update({ 
        PacketName: PacketName.value,
        PacketURL: PacketLink.value,
        PacketStatus: Active.value })
    .eq('id', 1).select()
    if(error) {console.log(error)} else {console.log(data)}
            
}
onMounted(() => {
LoadPacketData()
})



</script>
<template>
    <div class="desktop">
        <h1>Packet Configuration</h1>
        <div class="packet-table">
            <table>
                <tr>
                    <th>Packet Name</th>
                    <th>Packet Link</th>
                    <th>Packet Status</th>
                </tr>
                <tr>
                    <td>{{ PacketName }}</td>
                    <td>{{ PacketLink }}</td>
                    <td>{{ Active }}</td>
                </tr>
            </table>
        </div>
        <div class="PacketUpdate">
            <h2>Update Packet Infomation</h2>
            <div>
                <form>
                    <div class="inputarea">
                        <p>Packet Name: </p>
                        <input type="text" id="PacketName" name="PacketName" v-model="PacketName">
                    </div>
                    <div class="inputarea">
                        <p>Packet URL: </p>
                        <input type="text" id="PacketURL" name="PacketURL" v-model="PacketLink">
                    </div>
                    <div class="inputarea">
                        <p>Packet Status: </p>
                        <input type="checkbox" id="PacketStatus" name="PacketStatus" v-model="Active">
                    </div>
                    
                </form>
            </div>
            <button @click="UpdateDBData()">Confirm Update</button>
        </div>
    </div>
    <div class="mobile">
        <h1>Packet Configuration</h1>
        <div class="packet-table">
            <table>
                <tr>
                    <th>Packet Name</th>
                    <th>Packet Link</th>
                    <th>Packet Status</th>
                </tr>
                <tr>
                    <td>{{ PacketName }}</td>
                    <td>{{ PacketLink }}</td>
                    <td>{{ Active }}</td>
                </tr>
            </table>
        </div>
        <div class="PacketUpdate">
            <h2>Update Packet Infomation</h2>
            <div>
                <form>
                    <div class="inputarea">
                        <p>Packet Name: </p>
                        <input type="text" id="PacketName" name="PacketName" v-model="PacketName">
                    </div>
                    <div class="inputarea">
                        <p>Packet URL: </p>
                        <input type="text" id="PacketURL" name="PacketURL" v-model="PacketLink">
                    </div>
                    <div class="inputarea">
                        <p>Packet Status: </p>
                        <div class="CheckmarkBox">
                           <input type="checkbox" id="PacketStatus" name="PacketStatus" v-model="Active"> 
                        </div>
                        
                    </div>
                    
                </form>
            </div>
            <button @click="UpdateDBData()">Confirm Update</button>
        </div>
    </div>
</template>
<style scoped>
@media (min-width: 768px) {
    .desktop {
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
    }
    .mobile {
        display: none;
    }
    table {
        width: 100%;
        margin: 0%;
        border: 0.25cqw solid black;
    }
    tr:nth-child(even) {
        background-color: rgb(225, 225, 225)
    }
    tr {
        border-bottom: 1px solid #ddd;
    }
    .PacketUpdate {
        width: 100%;
    }
    form {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    label {
        width: 20%;
        margin-left: auto;
        margin-right: 0px;
    }
    input {
        width: 80%;
        margin: 0%;
        margin-right: auto;
        margin-left: 0px;
        padding: 0%;
        
    }
    .inputarea {
        width: 100%;
    }
    .inputarea.p {
        width: 20%;
        padding: 0%;
    }
}
@media (max-width: 768px) {
    .mobile {
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
    }
    .desktop {
        display: none;
    }
    table {
        width: 100%;
        margin: 0%;
        border: 0.25cqw solid black;
    }
    tr:nth-child(even) {
        background-color: rgb(225, 225, 225)
    }
    tr {
        border-bottom: 1px solid #ddd;
    }
    .PacketUpdate {
        width: 100%;
    }
    form {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    label {
        width: 20%;
        margin-left: auto;
        margin-right: 0px;
    }
    input {
        width: 80%;
        margin: 0%;
        margin-right: auto;
        margin-left: 0px;
        padding: 0%;
        text-align: center;
        
    }
    .inputarea {
        width: 100%;
    }
    .inputarea.p {
        width: 20%;
        padding: 0%;
    }
    .CheckmarkBox {
        width: 15%;
        margin-right: 42.5%;
        margin-left: 42.5%;
    }
    .CheckmarkBox.input {
        width: 100%;
        font-size: 2cqw;
    }
}
</style>