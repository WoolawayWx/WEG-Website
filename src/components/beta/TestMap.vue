<template>
    <div id="TestMap" style="height: 480px; width: auto; padding: 0px; margin: 0px;"></div>
    
    <button @click="SaveImage()">Save Map</button>
</template>

<script setup>
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import { onMounted, ref } from 'vue';
import domtoimage from 'dom-to-image';

let map = ref()
function LoadInMap() {
    map.value = L.map('TestMap').setView([37,-94], 9)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map.value)
}
function SaveImage() {
    var displayMap = document.getElementById('TestMap')
      // Use dom-to-image library to capture the element as an image
      domtoimage.toPng(displayMap)
        .then((dataUrl) => {
          // Create a temporary <a> element to download the image
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'captured-image.png';
          // Trigger the download
          link.click();
        })
        .catch((error) => {
          console.error('Error capturing image:', error);
        });
        
}
onMounted(() => {
    LoadInMap()
})
</script>

<style scoped>
/* .MapContainer {
    width: 1080px;
    aspect-ratio: 3/4;
    margin: 0px;
    padding: 0%;
}
a {
    width: 100%;
    height: 100%;
} */
</style>