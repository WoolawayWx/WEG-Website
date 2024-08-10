<template>
<div class="Page8-2">
    <div class="Page_20"></div>
    <div class="Page_80">
        <div>
            <h2>Daily Update</h2>
            <Editor v-model="title" 
            :init="{
                    plugins: 'lists link image table code help wordcount'
                }"
                api-key="um5kxv3eh9ni06u663y1a1xsqtzcuyfk7179nafynaoayfdn" style="height: 2.5cqw;">

            </Editor>
            <Editor v-model="body"
            :init="{
                    plugins: 'lists link image table code help wordcount'
                }"
             api-key="um5kxv3eh9ni06u663y1a1xsqtzcuyfk7179nafynaoayfdn">

            </Editor>
            <label for="status">Packet Status</label>
            <input type="checkbox" id="status" v-model="status">
            <div>
                <div style="background-color: green;" v-if="status">Packet Active</div>
                <div style="background-color: red;" v-if="!status">Packet Not Active</div>
            </div>
            <button @click="PushUpdate()">
                Update
            </button>
            <div>
                <span v-html="title"></span>
                <br>
                <span v-html="body"></span>
            </div>
        </div>
    </div>
    <div class="Page_20"></div>
</div>
</template>

<script setup>
import Editor from '@tinymce/tinymce-vue'
import {ref, onMounted} from 'vue'
import { supabase } from '@/supabase';

let title = ref("")
let body = ref("")
let status = ref("")

async function PushUpdate() {
    const {error} = await supabase.from('weg_updates').update({
        title: title.value,
        body: body.value,
        status: status.value
    })
    .eq('id', 1)
    if(error) {
        console.log(error)
    }
}

onMounted(() => {
    status.value = false
})

</script>

<style>
.Page8-2 {
    width: 100%;
    display: flex;
    flex-direction: row;
}
.Page_20 {
    width: 20%;
}
.Page_80 {
    width: 80%;
}

</style>