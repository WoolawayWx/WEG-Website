<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'
import { isBrowser, isMobile} from 'react-device-detect';

const BannerInfo = ref([])
const BannerVis = ref("")
const BannerColor = ref("")
const BoldText = ref("")
const BODY = ref("")
let Yellow = ref("")
let red = ref("")
let DropDown = ref(false)
async function getBanner() {
  const { data } = await supabase.from('Banner').select()
  BannerInfo.value = data
  const bannervalues = BannerInfo.value[0]
  BannerVis.value = bannervalues.banner_vis
  BannerColor.value = bannervalues.color
  BoldText.value = bannervalues.boldText
  BODY.value =bannervalues.message
  if(bannervalues.banner_vis) {
    if(bannervalues.color == 'YELLOW') {
        Yellow.value = true
    } else {
        red.value = true
    }
  }
  
}
function ChangeState() {
    if(DropDown.value == false) {
        DropDown.value = true
    } else {
        DropDown.value = false
    }
}


onMounted(() => {
  getBanner()
})
</script>

<template>
    <div v-if="isBrowser">
        <div v-if="BannerVis" :class="{ yellow: Yellow, red: red }" class="DropdownBanner Desktop">
            <div class="BannerText">
            <span v-html="BoldText" class="Banner-Large-Text"></span>
                <span v-html="BODY" class="MsgText"></span> 
            </div>
        </div>
    </div>
    <div v-if="isMobile">
      <div v-if="BannerVis" :class="{ yellow: Yellow, red: red }" class="DropdownBanner Mobile">
        <div class="BannerText">
            <span v-html="BoldText" class="Banner-Large-Text"></span>
            <Transition>
                <span v-html="BODY" class="MsgText" v-if="DropDown"></span>    
            </Transition>
            <TransitionGroup>
                <button @click="ChangeState()" class="ShowButton" v-if="!DropDown">Show Text</button> 
                <button @click="ChangeState()" class="ShowButton" v-if="DropDown">Hide Text</button>    
            </TransitionGroup>
            
        </div>
    </div>  
    </div>
    
    
</template>
<style lang="css" src="@/components/banner/banner-header.css"></style>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,500;9..40,800&family=Source+Code+Pro&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

</style>