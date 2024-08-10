<template>
    <div class="page-area">
        <div id="svrreportmap"></div>
    </div>
</template>

<script setup>
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import { onMounted, ref} from 'vue';
import 'esri-leaflet';
import { useHead } from '@unhead/vue'
// import { supabase } from '@/supabase';
import 'leaflet-easyprint';
import { supabase } from '@/supabase';
let reports = ref()

useHead({
  title: 'Severe Weather Reports',
  
})
async function LoadData() {
    reports.value = await supabase.from('svr_reports').select()
    reports.value = reports.value.data
}

async function BuildMap() {
    await LoadData()
    var map = L.map('svrreportmap', {
        maxZoom: 19,
        minZoom: 7,
    }).setView([37,-94], 9)
    var Base = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)
    var BaseLayers = {
        "OSM": Base,
    }
    for(let i = 0; i < reports.value.length; i++) {
        var report = reports.value[i]
        var lat = report.lat
        var lon = report.lon
        var des = report.Description
        L.marker([lat, lon]).bindPopup(des).addTo(map)
    }
    L.control.layers(BaseLayers).addTo(map)
}

onMounted(() => {
    BuildMap()
})
</script>

<style scoped>
@media (min-width: 768px) {
    #svrreportmap {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .page-area {
        position: relative;
        width: 80%;
        margin-left: 10%;
        aspect-ratio: 16/9;
    }
}

</style>