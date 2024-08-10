<template>
    <div class="desktop-view">
        <div class="page-title">
            Admin Page
        </div>
        <div class="admin-control-area">
            <div class="admin-leftcol">
                <button class="LeftCol-Control-Button" @click="ShowDailyUpdate()">Daily Update</button>
                <button class="LeftCol-Control-Button" @click="ShowAnn()">Announcements</button>
                <button class="LeftCol-Control-Button" @click="LoadMOD03()">Packet Config</button>
                <button class="LeftCol-Control-Button" @click="LoadMOD04()">Banner Config</button>
                <button class="LeftCol-Control-Button" @click="LoadMOD05()">Front Page Mode</button>
            </div>
            <div class="control-display">
                <div class="control-panel">
                    <DailyUpdate v-if="mod01"></DailyUpdate>
                    <buildAnnouncements  v-if="mod02"></buildAnnouncements>
                    <PacketConfig v-if="mod03"></PacketConfig>
                    <bannerUpdate v-if="mod04"></bannerUpdate>
                    <FrontoageConfig v-if="mod05"></FrontoageConfig>


                </div>
            </div>
        </div>
    </div>
    <div class="mobile-view">
        <div class="page-title">
            Admin Page
        </div>
        <div class="admin-control-area">
            <div class="admin-leftcol scrolling-parent">
                <button class="LeftCol-Control-Button" @click="ShowDailyUpdate()" :class="{SelectedButton: mod01}">Daily Update</button>
                <button class="LeftCol-Control-Button" @click="ShowAnn()" :class="{SelectedButton: mod02}">Announcements</button>
                <button class="LeftCol-Control-Button" @click="LoadMOD03()" :class="{SelectedButton: mod03}">Packet Config</button>
                <button class="LeftCol-Control-Button" @click="LoadMOD04()" :class="{SelectedButton: mod04}">Banner Config</button>
                <button class="LeftCol-Control-Button" @click="LoadMOD05()" :class="{SelectedButton: mod05}">Front Page Mode</button>
            </div>
            <div class="control-display">
                <div class="control-panel">
                    <DailyUpdate v-if="mod01"></DailyUpdate>
                    <buildAnnouncements  v-if="mod02"></buildAnnouncements>
                    <PacketConfig v-if="mod03"></PacketConfig>
                    <bannerUpdate v-if="mod04"></bannerUpdate>
                    <FrontoageConfig v-if="mod05"></FrontoageConfig>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import DailyUpdate from '@/views/admin pages/DailyUpdate.vue';
import buildAnnouncements from '@/views/admin pages/announcements/buildAnnouncements.vue';
import PacketConfig from './PacketConfig.vue';
import bannerUpdate from '@/views/admin pages/bannerUpdate.vue';
import FrontoageConfig from '@/components/admin/FrontpageConfig.vue'

let mod01 = ref("")
let mod02 = ref("")
let mod03 = ref("")
let mod04 = ref("")
let mod05 = ref("")

async function ShowDailyUpdate() {
    mod01.value = true
    mod02.value = false
    mod03.value = false
    mod04.value = false
    mod05.value = false
}
async function ShowAnn() {
    mod01.value = false
    mod02.value = true
    mod03.value = false
    mod04.value = false
    mod05.value = false
}
function LoadIn() {
    mod01.value = false
    mod02.value = false
    mod03.value = false
    mod04.value = false
    mod05.value = false
}
function LoadMOD03() {
    mod01.value = false
    mod02.value = false
    mod03.value = true
    mod04.value = false
    mod05.value = false
}
function LoadMOD04() {
    mod01.value = false
    mod02.value = false
    mod03.value = false
    mod04.value = true
    mod05.value = false
}
function LoadMOD05() {
    mod01.value = false
    mod02.value = false
    mod03.value = false
    mod04.value = false
    mod05.value = true
}


onMounted(() => {
  LoadIn()
})

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
@media (min-width: 768px) {
    .mobile-view {
        display: none;
    }
    .page-title {
        text-transform: uppercase;
        font-size: 2cqw;
        font-weight: bold;
        padding-top: 1cqw;
        color: black;
    }
    .admin-control-area {
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
        border: 0.25cqw solid black;
        margin-bottom: 2cqw;
        display: flex;
        flex-direction: row;
    }
    .control-display {
        width: 80%;
    }
    .admin-leftcol {
        width: 20%;
        margin-left: 0;
        margin-right: auto;
        display: flex;
        flex-direction: column;
        border-right: 0.25cqw solid black
    }
    .LeftCol-Control-Button {
        font-size: 1cqw;
        text-transform: uppercase;
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
        padding: 1%;
        margin-top: 1cqw; 
        margin-bottom: 1cqw;  
        border: 0.1cqw solid black; 
        background-color: rgba(0, 0, 0, 0);
        border-radius: 2cqw;
        color: black;
    }
    .LeftCol-Control-Button:active, .LeftCol-Control-Button:hover {
        background-color: rgba(0, 0, 0, 100);
        color: white;
        font-weight: bold;
    }
    .material-symbols-outlined {
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
    }
    
}
@media (max-width: 768px) {
    .desktop-view {
        display: none;
    }
    .page-title {
        text-transform: uppercase;
        font-size: 6cqw;
        font-weight: bold;
        color: black;
    }
    .scrolling-parent {
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
        border-top: 0.5cqw solid black;
        border-bottom: 0.5cqw solid black;
        padding: 0px;
    }
    .LeftCol-Control-Button {
        text-transform: uppercase;
        background-color: white;
        border-left: 0.25cqw solid black;
        border-right: 0.25cqw solid black;
        font-size: 5cqw;
        color: black;
    }
    .SelectedButton {
        background-color: black;
        color: white;
    }
    .control-panel {
        width: 100%;
        overflow-x: hidden;
    }
    .material-symbols-outlined {
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
    }
    
}
</style>