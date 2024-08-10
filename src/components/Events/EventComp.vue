<template>
    <div class="col-80">
        <h1>Event Page</h1>
        <p>Weather Emergency Groups holds meetings and trainings from every now and then, along with some zoom meetings and other things that help support area departments. Below is a list of events that the WEG is running. Clicking the event box, or the link should lead you to an attached webpage with more infomation.</p>
        <div v-if="hasEvents">
            <span v-for="(item, index) in events" :key="index" @click="$router.push('events/'+item.routerPushLine)">
                <div class="event-item">
                   <h3>{{ item.eventTitle }}</h3>
                    <h4>{{ item.eventDate }}</h4>
                    <p>{{ item.eventDes }}</p>
                    <p><a :href="item.eventLink">{{ item.eventLink }}</a></p>
                </div>
                
            </span>
        </div>
    </div>
    
</template>

<script setup>
import { supabase } from '@/supabase';
import { ref, onMounted} from 'vue'

let hasEvents = ref("")
let events = ref([])

async function GetEventList() {
    const {data, error} = await supabase.from('EventsList').select()
    if(error) {
        console.log(error)
    } else {
        if(data. length > 0) {
            events.value = data
            hasEvents.value = true
        } else {
            hasEvents.value = false
        }
    }
}

onMounted(() => {
    GetEventList()
})

</script>

<style>
@media (max-width:768px) {
    .col-80 {
        width: 95%;
        margin-left: 2.5%;
        margin-right: 2.5%;
    }
    .event-item {
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
        border: 0.2cqw solid black;
        margin-bottom: 4px;
    }
    .event-item h3 {
        font-size: 4cqw;
        margin: 0;
        padding: 0;
        text-transform: uppercase;
    }
    .event-item h4 {
        font-size: 3cqw;
        margin: 0;
        padding: 0;
        text-transform: uppercase;
    }
    .event-item p {
        font-size: 3cqw;
    }
}
@media (min-width: 768px) {
    .col-80 {
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
    }
    .event-item {
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
        border: 0.2cqw solid black;
        margin-bottom: 4px;
    }
    .event-item h3 {
        font-size: 2.5cqw;
        margin: 0;
        padding: 0;
        text-transform: uppercase;
    }
    .event-item h4 {
        font-size: 2cqw;
        margin: 0;
        padding: 0;
        text-transform: uppercase;
    }
}
</style>