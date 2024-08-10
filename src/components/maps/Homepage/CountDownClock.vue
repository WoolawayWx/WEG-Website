<script setup>
import {ref, onMounted} from 'vue'
let time = ref("")
let name = ref("")
let status = ref("")

import { supabase } from '@/supabase';
async function GetDate() {
    var CountDownDate = await supabase.from('Count Down Clock').select()
    time.value = CountDownDate.data[0].countDownDate
    name.value = CountDownDate.data[0].name
    status.value = CountDownDate.data[0].status
    if(status.value == true) {
      CountDown()  
    }
    
    
}

function sleep(ms) {     return new Promise(resolve => setTimeout(resolve, ms)); }

async function CountDown() {

    var date = new Date(time.value).getTime()
    for (let i = 0; i < 2; i++) {
        var now = new Date().getTime()
        var dif = date - now
        var days = Math.floor(dif / (1000 * 60 * 60 * 24));
        var hours = Math.floor((dif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((dif % (1000 * 60)) / 1000);
        time.value = days.toString()+" Days, "+hours.toString()+" Hours, "+minutes.toString()+" Minutes, "+seconds.toString()+" Seconds"
        await sleep(1000)
        i = 0
    }
    
}

onMounted(() => {
    GetDate()
})
</script>

<template>
    <div v-if="status" class="countDownClock">
        <h3>Countdown until {{ name }}</h3>
        <p>{{ time }}</p>
    </div>
    
</template>

<style scoped>
@media (min-width: 768px) {
    .countDownClock {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .countDownClock h3 {
        text-transform: uppercase;
        padding: 0px;
        margin: 0px;
    }
    .countDownClock p {
        text-transform: uppercase;
        padding: 0px;
        margin: 0px;
    }
}
</style>