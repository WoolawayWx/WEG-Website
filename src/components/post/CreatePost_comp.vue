<script setup>
import Editor from '@tinymce/tinymce-vue'
import {ref, onMounted} from 'vue'
import { supabase } from '@/supabase';
import loginPage from '../loginPage.vue';

async function savePost() {
    const { error } = await supabase.from('post').insert({
        title: PostTitle.value,
        body: PostBody.value,
        author: user.value,
        active: publish.value,
        postID: postID.value


    })
    if(error) {
        console.log(error)
    }
}

async function checkLoginStatus() {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
        console.log(error)
        console.log("Error")
    } else {
        console.log(data)
        if (data.session == null) {
            console.log("Session is Invalid")
            auth.value = false

        } else if (data.session.user.aud == "authenticated") {
          auth.value = true
          console.log("Authenticated: "+auth.value)
          const firstname = data.session.user.user_metadata.FirstName
          const lastname = data.session.user.user_metadata.LastName
          user.value = firstname+" "+lastname

        } else {
          auth.value = false
        }
    }
}

let PostBody = ref()
let PostTitle = ref("")
let publish = ref()
let auth = ref("")
let user = ref("")
let postID = ref()

onMounted(() => {
    checkLoginStatus()
})
</script>

<template>
    <div class="WebPage_Edges">
        <div class="B01"></div>
        <div class="B02">
            <div class="PostBuild" v-if="auth">
                <h3>Create a Post</h3>
                <div>
                    <p>Author: {{ user }}</p>
                </div>
                <div>
                    <label for="PostID">Post ID/ URL Ending</label>
                    <input id="PostID" type="text" placeholder="URL Ending" v-model="postID" minlength="3" maxlength="20">
                </div>
                <div class="EntryTitle">
                    <!-- Title -->
                    <label for="PostTitle">Title for Post: </label>
                    <input id="PostTitle" type="text" placeholder="Post Title" v-model="PostTitle">
                </div>
                <Editor
                api-key="um5kxv3eh9ni06u663y1a1xsqtzcuyfk7179nafynaoayfdn"
                :init="{
                    plugins: 'lists link image table code help wordcount'
                }"
                v-model="PostBody"
                />
                <h4>Example of Post</h4>
                <span>{{ PostTitle }}</span>
                <span v-html="PostBody"></span>
                <br>
                <label for="publish">Publish post upon save?</label>
                <input id="publish" type="checkbox" v-model="publish">
                <p>{{ publish }}</p>
                <div>
                    <button @click="savePost()">Save Post</button>
                </div>

            </div>
            <div v-if="!auth">
                <h4>Must be logged in to create a post</h4>
                <p>If you have an account, please log in, then refresh the page.</p>
                <loginPage ></loginPage>
            </div>
            
        </div>
        <div class="B01"></div>
    </div>
    

</template>

<style>
@media only screen and (max-width: 768px) {
    
}
@media only screen and (min-width: 768px) {
    .WebPage_Edges {
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    .B02 {
        width: 80%;
    }
    .B01 {
        width: 10%;
    }
    .EntryTitle {
        margin-top: 10px;
        margin-bottom: 10px;
    }
}

</style>


