<template>
    <div class="WebPage_Edges">
        <div class="post-list-main">
            <h3>Latest Post</h3>
            <p>Click on post to open it fully</p>
            <div class="PostList" v-if="PostLoaded">
                <div v-for="(item, index) in Posts" :key="index">
                    <div class="Post">
                        <RouterLink :to="'/posts/'+item.postID" class="PostRouter">
                            <div class="PostPreview">
                                <h4>{{ item.title }}</h4>
                                <span v-html="item.des" class="PostBodyText"></span>
                                <div class="BottomBar">
                                    <p>By {{ item.user }} on {{ item.date }}</p>
                                </div>
                                
                            </div>
                        </RouterLink>
                    </div>
                
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { supabase } from '@/supabase';
import { onMounted, ref } from 'vue';
// import { RouterLink } from 'vue-router';

let Posts = new Array()
let Time = ref("")
let PostLoaded = ref("")
let bodyStr = ref("")


async function ListPost() {
    const {data, error} = await supabase.from('post').select()
    if(data) {
        for (let i =0; i<data.length;i++){
        const d = new Date(data[i].created_at)
        Time.value = d.toString()
        bodyStr.value = data[i].body.toString()
        Posts[i] = {
                ["index"]: i,
                ["postID"]: data[i].postID,
                ["title"]: data[i].title,
                ["date"]: (d.getMonth()+1).toString()+"/"+d.getDate().toString()+"/"+d.getFullYear().toString()+"  "+d.getHours().toString()+":"+d.getMinutes().toString(),
                ["des"]: bodyStr.value,
                ["user"]: data[i].author
            }
    }
    PostLoaded.value = true
    } else if (error) {
        console.log(error)
    } else { console.log("An unknown error has occured")}
    
    
}

onMounted(() => {
    PostLoaded.value = false
    ListPost()
})

</script>

<style>
@media only screen and (max-width: 768px) {
    .post-list-main {
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
    }
    a {
        text-decoration: none;
    }
    .WebPage_Edges {
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    .B01 {
        width: 5%;
    }
    .B02 {
        width: 90%;
    }
    .PostPreview {
        height: 100%;
    }
    .PostPreview h4 {
        font-size: 5cqw;
        color: black;
        text-transform: uppercase;
        padding: 0px;
        margin: 1%;
    }
    .Post {
        border: 0.5cqw solid black;
        margin-top: 0.75cqw;
        margin-bottom: 0.75cqw;
    }
    .PostRouter {
        height: 100%;
        margin: 0px;
        padding: 0px;
    }
    .BottomBar {
        width: 100%;
        height: max-content;
        background-color: rgb(139, 24, 26);
        padding: 0px;
        margin-bottom: 0px; 

    }
    .BottomBar p {
        color: white;
        font-size: 3cqw;
        padding: 0%;
        margin: 0px;
    }
    .PostList {
        display: flex;
        flex-direction: column-reverse;
    }
    .PostBodyText {
        max-lines: 2;
        display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
            line-clamp: 3; 
    -webkit-box-orient: vertical;
        overflow: hidden;
        color: black;
        width: 90%;
        margin-left: 5%;
        margin-left: 5%;
        text-align: left;
    }
}
@media only screen and (min-width: 768px) {
    a {
    text-decoration: none;
}
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
.PostPreview {
    text-decoration: none;
    height: 100%;
    
}
.PostPreview h4 {
    font-size: 2.5cqw;
    padding: 0px;
    margin: 0px;
    text-decoration: none;
    text-transform: uppercase;
    color: black;
    overflow: hidden;
}
.Post {
    border: 2px solid black;
    width: 90%;
    height: 4/1;
    margin-left: 5%;
    margin-right: 5%;
    padding: 0px;
    margin-top: 0.5cqw;
    margin-bottom: 0.5cqw;
}
.PostRouter {
    height: 100%;
    margin: 0px;
    padding: 0;
    aspect-ratio: 4/1;
}
.BottomBar {
    width: 100%;
    height: fit-content;
    background-color: rgb(139, 24, 26);
    padding: 0px;
    margin-bottom: 0px;
}
.BottomBar p {
    padding: 0px;
    margin: 0px;
    color: white;
}
.PostList {
    display: flex;
    flex-direction: column-reverse;
}
.PostBodyText {
    max-lines: 2;
    display: -webkit-box;
   -webkit-line-clamp: 2; /* number of lines to show */
           line-clamp: 2; 
   -webkit-box-orient: vertical;
    overflow: hidden;
    color: black;
    width: 90%;
    margin-left: 5%;
    margin-left: 5%;
    text-align: left;
}
.post-list-main {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
}
}

</style>