<template>
    <div>
        <h3>Update Banner Data</h3>
        
        <div class="EditorArea">
          <p>Bold Text</p>
          <Editor v-model="Title"
          :init="{
            plugins: 'lists link image table code help wordcount'
          }"
          api-key="um5kxv3eh9ni06u663y1a1xsqtzcuyfk7179nafynaoayfdn">

        </Editor>
        <p>Message</p>
        <Editor v-model="Message" class="EditorArea"
          :init="{
            plugins: 'lists link image table code help wordcount'
          }"
          api-key="um5kxv3eh9ni06u663y1a1xsqtzcuyfk7179nafynaoayfdn">

        </Editor>
        </div>
        
        
        <p>Background Color</p>
        <div>
          <button @click="BannerYELLOW()">YELLOW</button>
          <button @click="BannerRED()">RED</button>
        </div>
        <div>
          <p>Banner Visibiliy: {{ BannerVisPre }}</p>
          <button @click="BannerOn()">On</button>
          <button @click="BannerOff()">Off</button>
        </div>
        <div>
          <div v-if="BannerVis = 'true'" class="Banner">
              <div class="RED" v-if="BannerColor == 'RED'">
                  <span v-html="Title"></span>
                  <span v-html="Message"></span>
              </div>
              <div class="YELLOW" v-if="BannerColor == 'YELLOW' ">
                  <span v-html="Title"></span>
                  <span v-html="Message"></span>
              </div>
          </div>
        </div>
        <button @click="updateBanner()" v-if="ShowPublishButton">Update Banner</button>
    </div>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import { supabase } from '@/supabase';
import Editor from '@tinymce/tinymce-vue'



const BannerInfo = ref([])
const BannerVis = ref("")
const BannerColor = ref("")
// const RED = "RED"
// const YELLOW = "YELLOW"
const BoldText = ref("")
const BODY = ref("")
const boolean = 'banner_vis'
let BannerVisPre = ref("")
let Title = ref("")
let Message = ref("")
let ShowPublishButton = ref("")

let color = ref("")
function BannerRED() {
  BannerColor.value = "RED"
}
function BannerYELLOW() {
  BannerColor.value = "YELLOW"
}
function BannerOn() {
  BannerVisPre.value = "true"
  ShowPublishButton.value = "true"
}
function BannerOff() {
  BannerVisPre.value = "false"
  ShowPublishButton.value = "true"

}
async function updateBanner() {
    const { error } = await supabase
    .from('Banner')
    .update({ boldText: Title.value,
        message: Message.value,
        color: BannerColor.value,
        [boolean]: BannerVisPre.value
     })
    .eq('id', 1)
    if(error) {
      console.log(error)
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
    location.reload();
}

async function getBanner() {
  if (color.value == "YELLOW") {
    BannerColor.value = "YELLOW"
  } else if (color.value == "RED") {
    BannerColor.value = "RED"
  }
  const { data } = await supabase.from('Banner').select()
  BannerInfo.value = data
  const bannervalues = BannerInfo.value[0]
  BannerVis.value = bannervalues.banner_vis
  BannerColor.value = bannervalues.color
  BoldText.value = bannervalues.boldText
  BODY.value =bannervalues.message
  Title.value = data[0].boldText
  Message.value = data[0].message
}

onMounted(() => {
  getBanner()
})
</script>

<style>
@media (min-width: 768px) {
  .EditorArea {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
  }
  .RedTitle {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
}
</style>