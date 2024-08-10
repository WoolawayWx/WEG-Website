<template>
    <div class="desktop">
        <div class="full-page-header">
            <div class="header-container">
                <div class="header-item-30">
                    <h4 class="header-text-title">Weather Emergency Group</h4>
                </div>
                <div class="header-item Width-70">
                    <div class="nav-buttons Width-100">
                        <div class="nav-button flex-col-center-align Width-15">
                            <RouterLink to="/other" @mouseover="NavButtonHover1 = true" @mouseleave="NavButtonHover1 = false" :class="{ ButtonHover: NavButtonHover1}">
                                <button class="nav-element-button">Non-Weather</button>
                            </RouterLink>
                        </div>
                        <div class="nav-button flex-col-center-align Width-15" >
                            <button class="nav-element-button " :class="{ active: WeatherDropdown, ButtonHover: NavButtonHover3 }" @click="WeatherDropdown = !WeatherDropdown" @mouseover="NavButtonHover3 = true" @mouseleave="NavButtonHover3 = false">Weather</button>
                                
                        </div>
                        <div class="nav-button flex-col-center-align Width-15" >
                            <RouterLink to="/" @mouseover="NavButtonHover4 = true" @mouseleave="NavButtonHover4 = false" :class="{ ButtonHover: NavButtonHover4}">
                                <button class="nav-element-button">Home</button>
                            </RouterLink>
                        </div>
                        <div class="nav-button flex-col-center-align Width-15" >
                            <RouterLink to="/admin" v-if="isAdmin"  @mouseover="NavButtonHover5 = true" @mouseleave="NavButtonHover5 = false" :class="{ ButtonHover: NavButtonHover5}">
                                <button class="nav-element-button" >Admin</button>
                            </RouterLink>
                        </div>
                        <div class="user-display-area Width-15" v-if="LoggedIn">
                            <div class="flex-col-center-align">
                                <RouterLink to="/account">
                                    <p>Welcome, {{ UserName }}</p>
                                </RouterLink>
                            </div>
                            <div class="flex-col-center-align">
                                <button @click="SignOut" class="icon-button flex-col-center-align">
                                    <span class="material-symbols-outlined logout-icon" style="font-size: 1cqw;">logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
            <div class="PacketLine" v-if="Packet_Status" @click="goToLink()">
                <span class="Packet-Line-Title Packet-Line-Item" @click="goToLink()">Active Packet: {{ PacketTitle }}</span>
            </div>
            
        </div>
        <Transition>
            <div class="drop-down-nav-list" v-if="WeatherDropdown">
                <RouterLink to="/weather/current" @click="WeatherDropdown = !WeatherDropdown">
                    Current Weather
                </RouterLink>
                <RouterLink to="/weather/fire" @click="WeatherDropdown = !WeatherDropdown">
                    Fire Weather
                </RouterLink>
                <RouterLink to="/weather/severe" @click="WeatherDropdown = !WeatherDropdown">
                    Severe Weather
                </RouterLink>
                <RouterLink to="/weather/forecast/point" @click="WeatherDropdown = !WeatherDropdown">
                    Point Forecast
                </RouterLink>
                <RouterLink to="/weather/drought" @click="WeatherDropdown = !WeatherDropdown">
                    Drought Weather
                </RouterLink>
                <RouterLink to="/weather/winter" @click="WeatherDropdown = !WeatherDropdown">
                    Winter Weather
                </RouterLink>
                <RouterLink to="/docs/inforeq">
                    Infomation Requests
                </RouterLink>
            </div>
        </Transition>
        <bannerComp></bannerComp>
    </div>
    <div class="mobile">
        <div class="mobile-header">
            <div class="mobile-header-container">
                <div class="mobile-header-item-80">
                    <h1>Weather Emergency Group</h1>
                </div>
                <div class="mobile-header-item-20">
                    <Transition>
                    <span class="material-symbols-outlined dropdown-menu-icon" @click="mobileMenu = true" v-if="!mobileMenu">menu</span>
                    </Transition>
                    
                </div>
            </div>
            
        </div>
        <bannerComp></bannerComp>
        <Transition>
            <div class="mobile-menu" v-if="mobileMenu">
                <div class="mobile-menu-icon-close">
                    <Transition>
                    <span class="material-symbols-outlined" @click="mobileMenu = false" v-if="mobileMenu">close</span>
                    </Transition>
                </div> 
                <div class="mobile-menu-links">
                    <RouterLink to="/">Home</RouterLink>
                    <div class="weather-mobile-dropdown">
                        <div class="weather-mobile-dropdown-child">
                            <p class="weather-dropdown-element">Weather</p>
                        </div>
                        <div class="weather-mobile-dropdown-child">
                           <span class="material-symbols-outlined weather-dropdown-element" v-if="!mobileMenu_Wx" @click="mobileMenu_Wx = true">arrow_drop_down</span> 
                        </div>
                        <div class="weather-mobile-dropdown-child">
                           <span class="material-symbols-outlined weather-dropdown-element" v-if="mobileMenu_Wx" @click="mobileMenu_Wx = false">arrow_drop_up</span> 
                        </div>
                        
                    </div>
                    <Transition name="slideDown">
                    <div v-if="mobileMenu_Wx" class="mobile-expand">
                            <RouterLink to="/weather/forecast/point">
                                Point Forecast
                            </RouterLink>
                            <RouterLink to="/weather/current">
                                Current Weather
                            </RouterLink>
                            <RouterLink to="/weather/fire">
                                Fire Weather
                            </RouterLink>
                            <RouterLink to="/weather/severe">
                                Severe Weather
                            </RouterLink>
                            <RouterLink to="/weather/drought">
                                Drought Weather
                            </RouterLink>
                            <RouterLink to="/weather/winter">
                                Winter Weather
                            </RouterLink>
                            <RouterLink to="/docs/inforeq">
                                Infomation Requests
                            </RouterLink>
                            
                    </div>
                    </Transition>
                    <RouterLink to="/other">
                        Non-Weather
                    </RouterLink>
                    <div class="PacketLine" v-if="Packet_Status" style="color: black;">
                        <span class="Packet-Line-Title Packet-Line-Item" @click="goToLink()">Active Packet: {{ PacketTitle }}</span>
                    </div>
                    <div class="user-display-mobile" v-if="LoggedIn">
                        <div class="user-display-mobile-item">
                            <p>Welcome, {{ UserName }}</p>
                        </div>
                        <div class="user-display-mobile-item">
                            <span class="material-symbols-outlined">logout</span>
                        </div>
                        
                        
                    </div>
                </div>  
                
            </div>
        </Transition>
        
    </div>
        
    
</template>

<script setup>
import { SignOut} from '@/router';
import { onMounted, ref } from 'vue';
import bannerComp from '@/components/banner/bannerComp.vue';
import { supabase } from '@/supabase';

let PacketTitle = ref("")
let PacketLink = ref("")
let Packet_Status = ref("")
let Packet_ID = ref("")

let WeatherDropdown = ref("")
let mobile = ref("")

let mobileMenu = ref("")
let mobileMenu_Wx = ref("")

let isMember = ref("")
let isAdmin = ref("")
let LoggedIn = ref("")

let UserName = ref("")

let NavButtonHover1 = ref("")
let NavButtonHover3 = ref("")
let NavButtonHover4 = ref("")
let NavButtonHover5 = ref("")


async function SesstionStatus() {
    const {data, error} = await supabase.auth.getSession()
    if(data.session == null) {
        LoggedIn.value = false
    } else if(error) {
        console.log(error)
    } else {
        LoggedIn.value = true
    }
}
function goToLink() {
    window.open(PacketLink.value)
}
async function loadPackets() {
    const { data, error} = await supabase.from('PacketAlerts').select()
    if(data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].PacketStatus) {
                Packet_ID.value = data[i].id
                Packet_Status.value = data[i].PacketStatus
                console.log(Packet_Status)
                PacketTitle.value = data[i].PacketName
                PacketLink.value = data[i].PacketURL
                break;
            }
        }
    } else if (error) {
        console.log(error)
    }


}

async function UserInfo() {
    const SiteUser = await supabase.auth.getSession()
    const UserID = SiteUser.data.session.user.id
    const UserProfile = await supabase.from('profiles').select().eq('id', UserID)
    UserName.value = UserProfile.data[0].first_name
    
}

async function GetUserRoles() {
    var group_id = 'dfc1f42f-0fb1-413e-b02d-87950c6063ac'
    let MemberRole = await supabase.rpc('is_group_member', {group_id})
    if(MemberRole.data == true) {
        isMember.value = true
        await UserInfo()
    } else {
        isMember.value = false
    }
    group_id = 'a9cbbf5c-ca54-4304-89a8-5cc69d5aadd8'
    let AdminRole = await supabase.rpc('is_group_member', {group_id})
    if(AdminRole.data == true) {
        isAdmin.value = true
    } else {
        isAdmin.value = false
    }
}

function DeviceCheck() {
    return window.matchMedia("(max-width: 767px)").matches;
}

function userTech() {
    if(DeviceCheck) {
        mobile.value = true
    } else {
        mobile.value = false
    }
}

onMounted(() => {
    userTech()
    SesstionStatus()
    WeatherDropdown.value = false
    mobileMenu.value = false
    loadPackets()
    GetUserRoles()

})
</script>

<style lang="css" scoped src="@/components/Header/header.css"></style>