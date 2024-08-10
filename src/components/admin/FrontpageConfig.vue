<script setup>
import {supabase} from '@/supabase'
import {onMounted, ref} from 'vue'

let currentMode = ref("")
let selectedMode = ref("")

async function LoadDBData() {
    let { data: FrontPageMode, error } = await supabase
        .from('FrontPageMode')
        .select('*')
    if(error) {
        console.log(error)
    } else { console.log(FrontPageMode)
    currentMode.value = FrontPageMode[0].FrontPageMode}
    
}
async function UpdateDBData() {
    const { data, error } = await supabase
    .from('FrontPageMode')
    .update({ FrontPageMode: selectedMode.value })
    .eq('id', '1')
    .select()
    if(error) {
        console.log(error)
    } else {
        console.log(data)
    }
            
}
onMounted(() => {
    LoadDBData()
})       
</script>

<template>
    <div>
        <h3>Current Selected Mode</h3>
        <h3><b>{{ currentMode }}</b></h3>
        <h4>Update Front Page Mode</h4>
        <select name="frontPageMode" id="cars" v-model="selectedMode">
            <option value="none">None</option>
            <option value="severe">Severe</option>
            <option value="winter">Winter</option>
            <option value="fire">Fire</option>

        </select>
        <h4>Selected Mode: {{ selectedMode }}</h4>
        <button @click="UpdateDBData()">Update Front Page Mode</button>
    </div>
</template>

<style></style>