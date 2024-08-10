<template>
    <div>
        <div id="RadarMap"></div>
    </div>
</template>


<script setup>
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import { onMounted } from 'vue';
import 'esri-leaflet';
import { dynamicMapLayer} from 'esri-leaflet';

function Radar() {
    var map = L.map('RadarMap').setView([37,-94], 9);

    var Base = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 1,
        // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a><p>NOAA/NWS Storm Prediction Center</p><p>WoolawayWx API Service</p>',
    }).addTo(map)
    var BaseLayers = {
                "Base": Base,
            }
    var Radar = dynamicMapLayer({
        url: 'https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity/MapServer/2',
        maxZoom: 19,
        minZoom: 1,
    }).addTo(map);
    var Radars = {
        "Radar": Radar
    }
      L.control.layers(BaseLayers, Radars).addTo(map) 
}

onMounted(() => {
    Radar()
})
</script>

<style>
#RadarMap {
    width: 80%;
    aspect-ratio: 16/9;
    margin-left: 10%;
    margin-right: 10%;
}
</style>