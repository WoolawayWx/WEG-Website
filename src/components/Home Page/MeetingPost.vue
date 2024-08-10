<template>
    <div v-if="MeetingActive" class="MeetingArea">
        <span class="MeetingHeader">{{ MeetingHeader }}</span>
        <br>
        <span class="MeetingBody">{{ MeetingDesc }}</span>
        <br>
        <button @click="GoToLink()">Click here for the meeting URL</button>
    </div>
</template>

<script setup>
import { supabase } from '@/supabase';
import { ref, onMounted} from 'vue'


let MeetingActive = ref("")
let MeetingHeader = ref("")
let MeetingDesc = ref("")
let MeetingLink = ref("")


async function LoadSupabase() {
    const {data, error} = await supabase.from('Meeting Information').select()
    if (data) {
        MeetingHeader.value = data[0]['Meeting Name']
        MeetingDesc.value = data[0]['Meeting Desc']
        MeetingLink.value = data[0]['Meeting URL']
        MeetingActive.value = data[0]['Is Active']
    } else {
        console.log(error)
    }
}
function GoToLink() {
    window.open(MeetingLink.value, '_blank').focus()
}
onMounted(() => {
    LoadSupabase()
})
</script>
<style scoped>
@media (min-width: 768px) {
    .MeetingArea {
        width: 95%;
        margin-left: 2.5%;
        margin-right: 2.5%;
        border: 0.25cqw solid black;
    }
    .MeetingHeader {
        font-size: 2cqw;
        text-transform: uppercase;
        font-weight: 300;
    }
    .MeetingBody {
        font-size: 1cqw;
        text-transform: uppercase;
    }
    .MeetingArea button {
        background-color: white;
        border: 0.25cqw solid black;
        text-transform: uppercase;
        margin: 0.5cqw;
        font-size: 0.8cqw;
    }
}
</style>