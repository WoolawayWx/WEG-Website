<template>
    <div class="page">
        <div class="A02"></div>
        <div class="A01">
            <div class="post">
                <h1>{{ title }}</h1>
                <h4>By {{ author }} on {{ date }}</h4>
                <span v-html="body" class="PostText"></span>
                <!-- <div class="B02">
                    <div class="B03" @click="webShareApiSupported()">
                        <span class="material-symbols-outlined B04">
                            share
                        </span>
                    </div>
                </div> -->
            </div> 
        </div>
        <div class="A02"></div>
        
    </div>
    
</template>
    
<script setup>
import { useRoute } from 'vue-router';
import {ref, onMounted} from 'vue';
import { supabase } from '@/supabase';

const route = useRoute()
let postID = ref()
let title = ref()
let body = ref()
let author = ref()
let date = ref()

async function LoadPost() {
    postID.value = route.params.postID
    const { data, error } = await supabase.from('post').select()
    if(data) {
        for (let i = 0; i < data.length;i++) {
            if(data[i].postID == postID.value) {
                const d = new Date(data[i].created_at)
                title.value = data[i].title,
                body.value = data[i].body,
                author.value = data[i].author,
                date.value = (d.getMonth()+1).toString()+"/"+d.getDate().toString()+"/"+d.getFullYear().toString()+"  "+d.getHours().toString()+":"+d.getMinutes().toString()
            }
        }
    } else if (error) {
        console.log(error)
    } else {
        console.log("An unkown error occured")
    }
}
// function webShareApiSupported() {
//     navigator.share({
//         title: title.value,
//         text: body.value,
//         url: "weg.woolawaywx.com/posts/"+postID.value
//     })
//   }
onMounted(() => {
    LoadPost()
})
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0");
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/share.css');
@media only screen and (min-width: 768px){
    .page {
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    .A01 {
        width: 80%;
    }
    .A02 {
        width: 10%;
    }
    .post h1 {
        text-transform: uppercase;
    }
    .post h4 {
        text-transform: uppercase;
    }
    .PostText {
        font-size: 2cqw;
        text-align: left;
    }
    .B04 {
        color: black;
    }
    .material-symbols-outlined {
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
    }
}

@media only screen and (max-width: 768px){
    .page {
        display: flex;
        flex-direction: row;
    }
    .A01 {
        width: 90%;
    }
    .A02 {
        width: 5%;
    }
    .post {
        width: 100%;
    }
    .material-symbols-outlined {
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
    }
    .B04 {
        color: black;
        height: max-content;
        padding: 0px;
        font-size: 8cqw;
        text-align: center;
    }
    .B02 {
        width: 100%;
        display: flex;
        aspect-ratio: 4/1;
    }
    .B03 {
        width: 50%;
        margin-left: 25%;
        margin-right: 25%;
    }
}
</style>
