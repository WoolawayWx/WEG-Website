<template>
    <p>Update Daily Message</p>
    <dailyUpdate></dailyUpdate>
    <!-- <div>
        <div>
            <p>Date:</p>
            <input type="text" id="date" v-model="date">
        </div>
        <div>
            <p>Message</p>
            <textarea rows="40" cols="100" id="message" v-model="message"></textarea>
        </div>
        <div>
            <button @click="changeStatus()">
                Active Status
            </button>
            <p>{{ active }}</p>
        </div>
        <button @click="updateDailyUpdate()">Push Update</button>
    </div> -->
    <div class="two-thirds">
        <div class="quarter"></div>
        <div class="half">
            <div>
                <p>Date:</p>
                <input type="text" id="date" v-model="date" class="box_Input" placeholder="Title of Update">
            </div>
            <div>
                <p>Message</p>
                <textarea rows="40" cols="100" id="message" v-model="message" class="box_Input" placeholder="Message of Update"></textarea>
            </div>
            <div>
                <button @click="changeStatus()" class="buttons">
                    Active Status
                </button>
                <p>{{ active }}</p>
            </div>
            <button @click="updateDailyUpdate()" class="buttons">Push Update</button>
        </div>
        <div class="quarter"></div>
    </div>
</template>

<script setup>
import dailyUpdate from '@/views/dailyUpdate.vue';
import { supabase } from '@/supabase';
import { ref, onMounted } from 'vue';

let date = ref("")
let message = ref("")
let active =ref("")
async function updateDailyUpdate() {
    if(active.value == "FALSE") {
        var Status = "FALSE"
    } else if(active.value) {
        Status = "TRUE"
    }
    const { data, error} = await supabase.from('weg_updates').update({
        date: date.value,
        updateText: message.value,
        active: Status
    })
    .eq('id', 1)
    if (error) {
        console.log(error)
    } else {
        console.log(data)
    }

}
function changeStatus() {
    active.value = "TRUE"
    console.log(active.value)
}
function StartUp() {
    active.value = "FALSE"
}
onMounted(() => {
    StartUp()
})
</script>

<style>
@media only screen and (min-width: 768px) {
    .two-thirds {
        width: 100%;
        display: flex;
        flex-direction: row;
    }
    .half {
        width: 50%;
    }
    .quarter {
        width: 25%;
    }
    .box_Input {
        width: 80%;
        padding: 3px;
        margin: 5px;
    }
    .buttons {
        width: 20%;
        aspect-ratio: 16/3;
        margin: 5px;
        border: 1px solid black;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0);
        color: black;
    }
    .buttons:hover {
        color: white;
        border: rgb(139, 24, 26);
        background-color: black;
    }
}
@media only screen and (max-width: 768px) {
    .two-thirds {
        width: 100%;
        display: flex;
        flex-direction: row;
    }
    .half {
        width: 100%;
    }
    .quarter {
        width: 0%;
        display: none;
    }
    .box_Input {
        width: 80%;
        padding: 3px;
        margin: 5px;
    }
    .buttons {
        width: 40%;
        aspect-ratio: 16/3;
        margin: 5px;
        border: 1px solid black;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0);
        color: black;
    }

    
}
</style>