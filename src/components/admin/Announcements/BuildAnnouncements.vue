<template>
    <div class="announcement_page">
        <h1>Create or Edit an Announcement</h1>
        <div class="announcement-display">
            <table>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Body</th>
                </tr>
                <tr v-for="(item, index) in announcements" :key="index">
                    <td>{{ item.id }}</td>
                    <td ><span v-html="item.title"></span></td>
                    <td v-html="item.body"></td>
                </tr>
            </table>
        </div>
        <div class="announcement-build">
            <div>
                <p>Select Announcement id</p>
                <input type="number" max="3" min="1" v-model="ann_id" onkeydown="return false">
                <p>Create an Announcement Title</p>
                <Editor api-key="um5kxv3eh9ni06u663y1a1xsqtzcuyfk7179nafynaoayfdn" v-model="ann_title"></Editor>
                <p>Create an Announcement Body</p>
                <Editor api-key="um5kxv3eh9ni06u663y1a1xsqtzcuyfk7179nafynaoayfdn" v-model="ann_body"></Editor>
                <div class="announcement-preview">
                    <span v-html="ann_title"></span>
                    <span v-html="ann_body"></span>
                </div>
                <label for="empty">Empty Post?</label>
                <input id="empty" type="checkbox" v-model="Empty">
                <br>
                <label for="status">Check to make post active on publish</label>
                <input id="status" type="checkbox" v-model="status">
                <br>
                <label for="saftey">Check to show Publish Button</label>
                <input id="safety" type="checkbox" v-model="safety"><br>
                <button v-if="safety" @click="SendUpdate()">Publish</button>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { supabase } from '@/supabase';
import Editor from '@tinymce/tinymce-vue'

let announcements = ref()
let ann_id = ref("")
let ann_title = ref("")
let ann_body = ref("")
let safety = ref("")
let status = ref("")
let Empty = ref("")
async function LoadAnnouncements() {
    const {data} = await supabase.from('Announcements').select()
    if(data) {
        announcements.value = data
    }
    status.value = false
    
}
async function SendUpdate() {
    const d = new Date()
    const time = d.toLocaleString()
    if(Empty.value == true) {
        ann_title.value = null,
        ann_body.value = null,
        status.value = false
    }
    const {error} = await supabase.from('Announcements').update({
        title: ann_title.value,
        body: ann_body.value,
        updated_time: time,
        status: status.value
    }).eq('id', ann_id.value)
    if(error) {
        console.log(error)
    }
}

onMounted(() => {
    LoadAnnouncements()
})
</script>

<style>
.announcement_page {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
}
.announcement-build {
    width: 100%;
}
</style>