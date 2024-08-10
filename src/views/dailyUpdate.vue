<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'

const Info = ref([])
const UpdateText = ref("")
var ViewMore = ref(false)
let Active = ref('')

async function getWEGUpdate() {
  const { data } = await supabase.from('weg_updates').select()
  Info.value = data
  UpdateText.value = Info.value[0].updateText
  Active.value = Info.value[0].active
  
}

onMounted(() => {
  getWEGUpdate()
})
</script>

<template>
    <div class="dailyUpdateBox" v-if="Active">
        <h3>Daily Update</h3>
        <h4 v-for="update in Info" :key="update.id">Updated: {{ update.date }} </h4>
        <div class="desktop bodyText">
            <p v-for="update in Info" :key="update.id">{{ update.updateText }}</p>
        </div>
        <div class="mobile bodyText">
            <!-- <p v-for="update in Info" :key="update.id">{{ update.updateText }}</p> -->
            <pre><p class="textbox">{{ UpdateText }}</p></pre>
            <p v-if="ViewMore">{{ UpdateText }}</p>
            <button @click="ViewMore = true" v-if="!ViewMore">View More</button>
            <button @click="ViewMore = false" v-if="ViewMore">View Less</button>

        </div>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,500;9..40,800&family=Source+Code+Pro&display=swap');
.bodyText {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    font-family: 'Source Code Pro', monospace;
}
.dailyUpdateBox {
    margin-top: 5px;
    margin-left: 10%;
    margin-right: 10%;
    width: 80%;
    border: 4px dashed rgb(139, 24, 26);
    font-family: 'Source Code Pro', monospace;
}
@media only screen and (max-width: 768px) {
    .desktop {
        display: none;
    }
    .textbox {
        height: 10vw;
        overflow: hidden;
        white-space: pre-line;
    }
}
@media only screen and (min-width: 768px) {
    .mobile {
        display: none;
    }
}

</style>