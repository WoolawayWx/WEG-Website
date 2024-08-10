<template>
    <div class="header">
        <div class="sitetitle">
            <h1>Weather Emergency Group</h1>
        </div>
        <nav class="navbar">
            <router-link to="/" v-slot="{ home }">
                <button @click="home">Home</button>
            </router-link>
            
            <!-- <button @click="navbarShow = !navbarShow">Weather</button> -->
            <router-link to="/weather" v-slot="{ weather }">
                <button @click="weather" @mouseover="navbarShow = !navbarShow">Weather</button>
            </router-link>
            <button @click="OtherShow = !OtherShow">Other</button>
            <span class="material-symbols-outlined LogInIcon" v-if="account">check_circle</span>
            <br>
            <div v-if="navbarShow" id="WeatherOptions">
                    <RouterLink to="/weather/fire" v-slot="fireweather">
                        <button @click="fireweather">Fire</button>
                    </RouterLink>
                    <router-link to="/weather/severe" v-slot="{ currentweather}">
                        <button @click="currentweather">Severe</button>
                    </router-link>
                    <RouterLink to="/weather/winter" v-slot="winterweather">
                        <button @click="winterweather">Winter</button>
                    </RouterLink>
                    <router-link to="/weather/current" v-slot="{ currentweather}">
                        <button @click="currentweather">Current</button>
                    </router-link>
                    <router-link to="/weather/drought" v-slot="{droughtweather}">
                        <button @click="droughtweather">Drought</button>
                    </router-link>
                    
            </div>
            <div v-if="OtherShow" id="WeatherOptions">
                    <router-link to="/branding" v-slot="{ branding}">
                        <button @click="branding">Branding</button>
                    </router-link>
                    <router-link to="/admin/banner" v-slot="bannerUpdate" v-if="account">
                        <button @click="bannerUpdate">Banner</button>
                    </router-link>
                    <router-link to="admin/Daily" v-slot="dailyUpdate" v-if="account">
                        <button @click="dailyUpdate">Daily Update</button>
                    </router-link>
                    <router-link to="/account" v-slot="account">
                        <button @click="account">Account</button>
                    </router-link>
                    
            </div>
            

        </nav>  
        <PacketUL></PacketUL>
    </div>
    <bannerComp></bannerComp>
</template>

<script>
import bannerComp from './banner/bannerComp.vue';
import PacketUL from '@/components/PacketUL.vue';


export default {
  name: 'site_header',
  components: {
    bannerComp,
    PacketUL
  },
  props: {
  },
  data() {
    return { navbarShow: false,
        OtherShow: false
    }
  },
  methods: {
  }
}

</script>
<script setup>
import { ref, onMounted} from 'vue';
import { supabase } from '@/supabase';

let account = ref("")

async function checkLoginStatus() {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
        console.log(error)
        console.log("Error")
    } else {
        if (data.session == null) {
            account.value = false

        } else if (data.session.user.aud == "authenticated") {
            account.value = true
        }
    }
}
onMounted(() => {
  checkLoginStatus()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ysabeau+SC:wght@1;100;200;300;400;500;600;700;800;900;1000&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@0,100;0,300;0,400;0,500;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
*  {
    margin: 0;
    padding: 0;
    border: 0;
}
html, body {
    margin: 0;
    padding: 0;
}
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 20
}
.LogInIcon {
    position: relative;
    align-items: center;
    vertical-align: middle;
    font-size: 20px;
}

@media only screen and (max-width: 768px) {
    .sitetitle h1 {
        font-size: 20px;
        padding: 0 0;
    }
    
}
.header {
    padding: 0 0;
    background-color: rgb(139, 24, 26);
}
.sitetitle {
    font-size: 30px;
    font-family: 'Alegreya Sans', sans-serif;
    font-family: 'Ysabeau SC', sans-serif;
    justify-content: center;
    text-align: center;
    text-transform: uppercase;
    color: rgb(250, 250, 250);
    
}
.navbar {
    padding: 0 0;
    justify-content: center;
    text-align: center;
    font-family: 'Alegreya Sans', sans-serif;
}
.navbar button {
  background-color: rgba(255, 255, 255, 0);
  color: white;
  margin: 8px;
  display: inline-block;
  padding: 0px;
  border: 2px solid white;
  text-decoration: none;
  width: 75px;
  height: 20px;
  font-family: 'Alegreya Sans', sans-serif;
}
.navbar button:hover {
    background-color: white;
    color: black;
    border: 2px solid white;
}


</style>