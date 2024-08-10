<template>
    <div class="A01">
        <div class="A02">
            <div class="DailyUpdateBox">
                <DailyUpdate_read></DailyUpdate_read>
            </div>
            <CountDownClock></CountDownClock>
            <MeetingPost></MeetingPost>  
            <div class="welcomeslot">
                <h2>Welcome to Weather Emergency Group!</h2>
                <p>Welcome to Weather Emergency Group, a collaborative effort uniting public safety entities throughout Southwest Missouri, Northwest Arkansas, and Northeast Oklahoma. Our mission is simple yet crucial: to enhance our region's preparedness and response capabilities for weather-related incidents. Together, we strive for excellence in safeguarding our communities during times of crisis.
                    More information can be found about WEG, and our members in the <a href="/about">about section of the website</a>!
                </p>
            </div>
            <div class="FrontPageConfig">
            <!-- Where all the code goes for the config of the front page as determined by the code.-->
            </div>
            <!-- <div class="AlertsMap">
                <h3>Current Warnings, Watches, and Advisories</h3>
               <AlertsMap v-if="currentPageMode == 'winter'"></AlertsMap> 
               <SevereWeatherMap v-if="currentPageMode == 'severe'"></SevereWeatherMap>
            </div> -->
            <div class="dynamic-display"> <!-- User Interaction -->
                <h2>Dynamic Display</h2>
                <div class="dynamic-display-head">
                    <button @click="DynamicDisplay(1)" :class="{activeButton: SPC_Map, NonactiveButton: !SPC_Map}">Convective Outlooks</button>
                    <button @click="DynamicDisplay(2)" :class="{activeButton: Rainfall_Map, NonactiveButton: !Rainfall_Map}">Station Rainfall</button>
                    <button @click="DynamicDisplay(3)" :class="{activeButton: Temperature_Map, NonactiveButton: !Temperature_Map}">Station Temperature</button>
                    <button @click="DynamicDisplay(4)" :class="{activeButton: Humidity_Map, NonactiveButton: !Humidity_Map}">Station Humidity</button>
                </div>
                <div class="dynamic-display-area">
                    <div class="Map" v-if="SPC_Map">
                        <SPCMap></SPCMap>
                    </div>
                    <div class="Map" v-if="Rainfall_Map">
                        <HomepageMap_Rainfall></HomepageMap_Rainfall>
                    </div>
                    <div class="Map" v-if="Temperature_Map">
                        <HomepageMap_Temp></HomepageMap_Temp>
                    </div>
                    <div class="Map" v-if="Humidity_Map">
                        <HomepageMap_Humid></HomepageMap_Humid>
                    </div>
                </div>
            </div>
            <Home_CurrentWx></Home_CurrentWx>
        </div>
        <div class="A03">
            <div class="A04 ann-container">
                <h3 v-if="AnnHeader">Announcements</h3>
                <div class="ann-element" v-if="Ann1.status">
                    <span v-html="Ann1.title" class="ann-element-text"></span>
                    <span v-html="Ann1.body" class="ann-element-text"></span>
                </div>
                <div class="ann-element" v-if="Ann2.status">
                    <span v-html="Ann2.title"></span>
                    <span v-html="Ann2.body"></span>
                </div>
                <div class="ann-element" v-if="Ann3.status">
                    <span v-html="Ann3.title"></span>
                    <span v-html="Ann3.body"></span>
                </div>
            </div>
            <div class="A04" v-if="ShowPost">
                <h3>Latest Posts</h3>
                <div v-for="(item, index) in PostData" :key="index" class="PostDisplay" >
                    <div class="PostDisplayItem Link-Break-Wrap">
                        <RouterLink :to="'/posts/'+item.postID">
                        <h3>{{ item.title}}</h3>
                        <p>{{ item.time }}</p>
                        </RouterLink>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    </div>
</template>

<script setup>
// import { supabase } from '@/supabase';
import SPCMap from '@/components/maps/SPC Maps/SPCMap.vue'
import { onMounted, ref } from 'vue';
import { supabase } from "@/supabase";
import DailyUpdate_read from '../admin/Daily Update/DailyUpdate_read.vue';
import HomepageMap_Rainfall from '../maps/HomepageMap_Rainfall.vue';
import HomepageMap_Humid from '../maps/HomepageMap_Humid.vue';
import HomepageMap_Temp from '../maps/HomepageMap_Temp.vue';
import Home_CurrentWx from '@/components/Home Page/Rotations/Current Conditons/Home_CurrentWx.vue'
import CountDownClock from '@/components/maps/Homepage/CountDownClock.vue'
/* import AlertsMap from './Homepage Maps/AlertsMap.vue'; */
import { useHead } from '@unhead/vue'
import MeetingPost from './MeetingPost.vue';
/* import SevereWeatherMap from './Homepage Maps/SevereWeatherMap.vue'; */
useHead({
  title: 'Home - WEG',
  
})

let PostData = new Array()
let ShowPost = ref("")
let Ann1 = ref([])
let Ann2 = ref([])
let Ann3 = ref([])
let AnnHeader = ref()
let SPC_Map = ref("")
let Rainfall_Map = ref("")
let Temperature_Map = ref("")
let Humidity_Map = ref("")
let currentPageMode = ref('')



function DynamicDisplay(displayNum) {
    if(displayNum == 1) {
        SPC_Map.value = true
        Rainfall_Map.value = false
        Temperature_Map.value = false
        Humidity_Map.value = false
    } else if(displayNum == 2) {
        SPC_Map.value = false
        Rainfall_Map.value = true
        Temperature_Map.value = false
        Humidity_Map.value = false
    } else if(displayNum == 3) {
        SPC_Map.value = false
        Rainfall_Map.value = false
        Temperature_Map.value = true
        Humidity_Map.value = false
    } else if(displayNum == 4) {
        SPC_Map.value = false
        Rainfall_Map.value = false
        Temperature_Map.value = false
        Humidity_Map.value = true
    }
    
}
// const PostData = new Array ()
async function Announcements() {
    const {data} = await supabase.from('Announcements').select() 
    if(data) {
        if(data[0].status == true) {
            Ann1.value = data[0]
            AnnHeader.value = true
        }
        if(data[1].status == true) {
            Ann2.value = data[1]
            AnnHeader.value = true
        }
        if(data[2].status == true) {
            Ann3.value = data[2]
            AnnHeader.value = true
        }
    }
}
async function getHomePageMode() {
    const {data, error} = await supabase.from('FrontPageMode').select()
    if(data) {
        if(data[0].FrontPageMode == 'none') {
            currentPageMode.value = 'none'
        } else if(data[0].FrontPageMode == 'severe') {
            currentPageMode.value = 'severe' }
        else if(data[0].FrontPageMode == 'winter') {
            currentPageMode.value = 'winter' }
        else if(data[0].FrontPageMode == 'fire') {
            currentPageMode.value = 'fire' }
    } else {
        console.log(error)
    }
}
async function GetPostData() {
    const {data, error} = await supabase.from('post').select()
    if(data) {
        for( let i = 0; i < data.length; i++) {
            const d = new Date(data[i].created_at)
            PostData[i] = {
                ['postID']: data[i].postID,
                ['published']: data[i].active,
                ['title']: data[i].title,
                ['body']: data[i].body,
                ['time']: (d.getMonth()+1).toString()+"/"+d.getDate().toString()+"/"+d.getFullYear().toString()+"  "+d.getHours().toString()+":"+d.getMinutes().toString(),
                ['author']: data[i].author
            }
        }
       PostData.reverse()
       ShowPost.value = true
    } else if(error) {
        console.log(error)
    } else {
        console.log("An unkown error occured in Post.js")
    }
    
}

onMounted(() => {
    ShowPost.value = false
    GetPostData()
    Announcements()
    DynamicDisplay(1)
    getHomePageMode()
})

</script>
<style lang="css" src="@/components/Home Page/homepage.css" scoped></style>
<style scoped>
@media only screen and (min-width: 768px) {
    .AlertsMap {
        width: 95%;
        margin-left: 2.5%;
        margin-right: 2.5%;
        aspect-ratio: 16/9;
    }
    .dynamic-display {
        width: 95%;
        margin: 2.5%;
        display: flex;
        flex-direction: column;
    }
    .dynamic-display-head {
        border-bottom: 0.2cqw solid black;
        width: 100%;
        display: flex;
        flex-direction: row;
    }
    .dynamic-display-head button {
        width: 25%;
        border: 0.1cqw solid black;
    }
    .NonactiveButton {
        width: 25%;
        border: 0.1cqw solid black;
        background-color: white;
    }
    .activeButton {
        color: white;
        background-color: black;
    }
    .A01 {
        display: flex;
        flex-direction: row;
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
        padding-bottom: 20px;
        
    }
    .A02 {
        width: 70%;
    }
    .A03 {
        width: 30%;
        border-left: 0.25cqw solid black;
    }
    .A04 {
        width: 100%;
        height: fit-content;
        
    }
    .Map {
        width: 95%;
        margin: 2.5%;
        aspect-ratio: 16/9;
    }
    a {
        text-decoration: none;
    }
    .PostDisplay {
        width: 90%;
        margin-left: 5%;
        display: flex;
        flex-direction: column;
    }
    .PostDisplayItem {
        border-top: 0.25cqw solid black;
        text-transform: uppercase;
        /* background: radial-gradient(black, white); */
    }
    .PostDisplayItem h3 {
        color: black;
        background-color: white;
        padding: 0;
        margin: 2%;
        font-size: 2cqw;
    }
    .PostDisplayItem p {
        color: black;
        padding: 0%;
        margin: 0;
        font-size: 1cqw;
    }
    .ann-element {
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
        border-bottom: 0.1em solid black;
    }
    .ann-element-text p h1 h2 h3 h4 h5 {
        padding: 0px;
        margin: 0px;
    }
}


</style>