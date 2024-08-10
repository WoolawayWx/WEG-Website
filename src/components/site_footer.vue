<template>
  <div class="desktop">
    <div class="footer-main WEG_Red_100">
      <div class="main-footer-container">
        <div class="main-footer-item">
          <button class="footer-menu-button AlegraeyaSans" @click="$router.push('joinWEG')">Join Today</button>
          <button class="footer-menu-button AlegraeyaSans" @click="$router.push('events')">Events</button>
          <button class="footer-menu-button AlegraeyaSans" @click="$router.push('mission')">Mission Statement</button>
        </div>
        <div class="main-footer-item">
          <img src="@/assets/WEGwSLD512.png">
        </div>
        <div class="main-footer-item">
          <button class="footer-menu-button AlegraeyaSans" @click="$router.push('privacy')">Privacy Policy</button>
          <button class="footer-menu-button AlegraeyaSans" @click="$router.push('About')">About WEG</button>
          <button class="footer-menu-button AlegraeyaSans" @click="$router.push('Contact')">Contact WEG</button>
        </div>
      </div>
      <div class="footer-secondary">
        <p>©2024 Weather Emergency Group by WoolawayWx LLC</p>
        <p>Site Build Version: {{ siteVersion }} | For site issues, please contact <a href="mailto:cade@woolawaywx.com">cade@woolawaywx.com</a></p>
      </div>
    </div>
  </div>
  <div class="mobile WEG_Red_100">
    <div class="footer-main">
      <div class="main-footer-container">
        <div class="main-footer-item">
          <img src="@/assets/WEGwSLD512.png" class="site-iamge-mobile">
        </div>
        <div class="main-footer-item">
          <button class="footer-menu-button AlegraeyaSans" @click="$router.push('privacy')">Privacy Policy</button>
          <button class="footer-menu-button AlegraeyaSans" @click="$router.push('About')">About WEG</button>
          <button class="footer-menu-button AlegraeyaSans" @click="$router.push('Contact')">Contact WEG</button>
        </div>
        <div class="main-footer-item">
          <button class="footer-menu-button AlegraeyaSans" @click="$router.push('joinWEG')">Join Today</button>
          <button class="footer-menu-button AlegraeyaSans" @click="$router.push('events')">Events</button>
          <button class="footer-menu-button AlegraeyaSans" @click="$router.push('mission')">Our Mission</button>
        </div>
      </div>
      <div class="footer-secondary">
        <p>©2024 Weather Emergency Group by WoolawayWx LLC</p>
        <p>Site Build Version: {{ siteVersion }} | For site issues, please contact <a href="mailto:cade@woolawaywx.com">cade@woolawaywx.com</a></p>
      </div>
    </div>
  </div>
  
</template>

<script setup>
  import { supabase } from '@/supabase';
  import {ref, onMounted} from 'vue'

  let siteVersion = ref("")

  async function getSiteInfo() {
    const {data, error} = await supabase.from('Site Information').select()
    if(data) {
      siteVersion.value = data[0].Value
      for(let i = 0; i < data.length; i++) {
        if(data[i].Name == 'Site Version') {
          siteVersion.value = data[i].Value
        }
      }
    } else if(error) {
      console.log(error)
    }
    
  } 
onMounted(() => {
  getSiteInfo()
})

</script>

<style>
@media (min-width: 768px) {
  .mobile {
    display: none;
  }
  .desktop {
    width: 100%;
  }
  .footer-main {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .main-footer-container {
    width: 50%;
    display: flex;
    flex-direction: row;
    margin-left: 25%;
    margin-right: 25%;
    padding-top: 20px;
  }
  .main-footer-item {
    width: 33%;
    display: flex;
    flex-direction: column;
  }
  .main-footer-item h4 {
    margin: 0px;
    padding: 0px;
    color: white;
  }
  .main-footer-item p {
    margin: 0px;
    padding: 0px;
    color: white;
  }
  .right-menu-element {
    display: flex;
    flex-direction: column;
    width: 60%;
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 10px;

  }
  .footer-menu-button {
    border: none;
    background-color: rgba(0, 0, 0, 0);
    aspect-ratio: 3/1;
    color: white;
    text-transform: uppercase;
    font-size: 1.5cqw;
  }
  .footer-secondary {
    background-color: white;
  }
  .footer-secondary p {
    font-size: 1cqw;
  }


}
@media (max-width: 768px) {
  .desktop {
    display: none;
  }
  .footer-menu-button {
    width: 33%;
    background:none;
    border: none;
    color: white;
    font-size: 3cqw;
  }
  .main-footer-item {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
  }
  .main-footer-item img {
    width: 70%;
    aspect-ratio: 3/1;
    object-fit: cover;
  }
  .footer-secondary {
    background-color: white;
    color: black;
    font-size: 2cqw;
  }
}

</style>