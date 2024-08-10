<template>
    <div v-if="status" class="DailyUpdate">
        <div class="static-display">
            <h4>Daily Update</h4>
            <div class="element-control">
                <p @click="ShowMessage = false" v-if="ShowMessage">Hide</p>
                <p @click="ShowMessage = true" v-if="!ShowMessage">Show</p>
            </div>
        </div>
        <div v-if="ShowMessage">
            <span v-html="title"></span>
            <span v-html="body"></span>
        </div>
        
    </div>
</template>

<script setup>
import { supabase } from '@/supabase';
import { ref, onMounted} from 'vue';

let status = ref("")
let title = ref("")
let body = ref("")
let ShowMessage = ref("")

async function ImportDailyUpdate() {
    const {data} = await supabase.from('weg_updates').select()
    if(data) {
        status.value = data[0].status,
        title.value = data[0].title,
        body.value = data[0].body
    }
}

onMounted(() => {
    status.value = false
    ShowMessage.value = true
    ImportDailyUpdate()
})
</script>

<style>
.DailyUpdate {
    border: 0.25cqw limegreen;
    border-style:dashed;
    border-radius: 2cqw;
    padding: 0.5cqw;
    margin: 2cqw;
    animation: name duration timing-function delay iteration-count direction fill-mode;
}
.element-control {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: row;
}
.element-control p {
    margin: 0px;
    padding: 0px;
}
.static-display {
    position: relative;
    height: 5cqw;
}
.static-display h4 {
    padding: 0px;
    margin: 0px;
}
</style>