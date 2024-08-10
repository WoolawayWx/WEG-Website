<template>
    <div>
        <div class="winter-comp">
            <h2>Winter Storm Severity Index</h2>
            <div id="WSSIMap" class="LeafletMap"></div>
        </div>
        <div class="winter-comp">
            <h2>NWS Springfield Snowfall Forecast</h2>
            <div class="Forecast-Container">
                <div class="Forecast-Item-Display-Main" @click="showLarge('https://www.weather.gov/images/sgf/winter/StormTotalSnowWeb.jpg')">
                    <h4>Expected Snowfall</h4>
                    <img src="https://www.weather.gov/images/sgf/winter/StormTotalSnowWeb.jpg" class="winter-comp-image">
                </div>
                <div class="Forecast-Item-Display-Sec">
                    <div @click="showLarge('https://www.weather.gov/images/sgf/winter/SnowAmt10Prcntl.jpg')">
                        <h4>Higher End (90% Chance of Lower Snowfall Amounts)</h4>
                        <img src="https://www.weather.gov/images/sgf/winter/SnowAmt90Prcntl.jpg" class="winter-comp-image">
                    </div>
                    <div @click="showLarge('https://www.weather.gov/images/sgf/winter/SnowAmt10Prcntl.jpg')">
                        <h4>Lower End (90% Chance of Higher Snowfall Amounts)</h4>
                        <img src="https://www.weather.gov/images/sgf/winter/SnowAmt10Prcntl.jpg" class="winter-comp-image">
                    </div>
                    
                </div>
            </div>
            <div class="Chance-Forecast">
                <h4>Chance Forecast: Click thumbnail to show larger image</h4>
                <div class="Thumbnails">
                    <img src="https://www.weather.gov/images/sgf/winter/ProbSnowGETr.jpg" class="Chance-Forecast-Thumbnail" @click="ShowMainSGF('https://www.weather.gov/images/sgf/winter/ProbSnowGETr.jpg')">
                    <img src="https://www.weather.gov/images/sgf/winter/ProbSnowGE01.jpg" class="Chance-Forecast-Thumbnail" @click="ShowMainSGF('https://www.weather.gov/images/sgf/winter/ProbSnowGE01.jpg')">
                    <img src="https://www.weather.gov/images/sgf/winter/ProbSnowGE02.jpg" class="Chance-Forecast-Thumbnail" @click="ShowMainSGF('https://www.weather.gov/images/sgf/winter/ProbSnowGE02.jpg')">
                    <img src="https://www.weather.gov/images/sgf/winter/ProbSnowGE04.jpg" class="Chance-Forecast-Thumbnail" @click="ShowMainSGF('https://www.weather.gov/images/sgf/winter/ProbSnowGE04.jpg')">
                    <img src="https://www.weather.gov/images/sgf/winter/ProbSnowGE06.jpg" class="Chance-Forecast-Thumbnail" @click="ShowMainSGF('https://www.weather.gov/images/sgf/winter/ProbSnowGE06.jpg')">
                    <img src="https://www.weather.gov/images/sgf/winter/ProbSnowGE08.jpg" class="Chance-Forecast-Thumbnail" @click="ShowMainSGF('https://www.weather.gov/images/sgf/winter/ProbSnowGE08.jpg')">
                    <img src="https://www.weather.gov/images/sgf/winter/ProbSnowGE12.jpg" class="Chance-Forecast-Thumbnail" @click="ShowMainSGF('https://www.weather.gov/images/sgf/winter/ProbSnowGE12.jpg')">
                    <img src="https://www.weather.gov/images/sgf/winter/ProbSnowGE18.jpg" class="Chance-Forecast-Thumbnail" @click="ShowMainSGF('https://www.weather.gov/images/sgf/winter/ProbSnowGE18.jpg')">
                </div>
                <div class="LargerImage">
                    <img :src="LargerChanceSGF">
                </div>

            </div>
        </div>
        <div class="winter-comp">
            <h2>NWS Tulsa Snowfall Forecast</h2>
            <div class="Forecast-Container">
                <div class="Forecast-Item-Display-Main" @click="showLarge('https://www.weather.gov/images/tsa/winter/StormTotalSnowWeb.jpg')">
                    <h4>Expected Snowfall</h4>
                    <img src="https://www.weather.gov/images/tsa/winter/StormTotalSnowWeb.jpg" class="winter-comp-image">
                </div>
                <div class="Forecast-Item-Display-Sec">
                    <div @click="showLarge('https://www.weather.gov/images/tsa/winter/SnowAmt90Prcntl.jpg')">
                        <h4>Higher End (90% Chance of Lower Snowfall Amounts)</h4>
                        <img src="https://www.weather.gov/images/tsa/winter/SnowAmt90Prcntl.jpg" class="winter-comp-image">
                    </div>
                    <div @click="showLarge('https://www.weather.gov/images/tsa/winter/SnowAmt10Prcntl.jpg')">
                        <h4>Lower End (90% Chance of Higher Snowfall Amounts)</h4>
                        <img src="https://www.weather.gov/images/tsa/winter/SnowAmt10Prcntl.jpg" class="winter-comp-image">
                    </div>
                    
                </div>
            </div>
            <div class="Chance-Forecast">
                <h4>Chance Forecast: Click thumbnail to show larger image</h4>
                <div class="Thumbnails">
                    <img src="https://www.weather.gov/images/tsa/winter/ProbSnowGETr.jpg" class="Chance-Forecast-Thumbnail" @click="showMainTSA('https://www.weather.gov/images/tsa/winter/ProbSnowGETr.jpg')">
                    <img src="https://www.weather.gov/images/tsa/winter/ProbSnowGE01.jpg" class="Chance-Forecast-Thumbnail" @click="showMainTSA('https://www.weather.gov/images/tsa/winter/ProbSnowGE01.jpg')">
                    <img src="https://www.weather.gov/images/tsa/winter/ProbSnowGE02.jpg" class="Chance-Forecast-Thumbnail" @click="showMainTSA('https://www.weather.gov/images/tsa/winter/ProbSnowGE02.jpg')">
                    <img src="https://www.weather.gov/images/tsa/winter/ProbSnowGE04.jpg" class="Chance-Forecast-Thumbnail" @click="showMainTSA('https://www.weather.gov/images/tsa/winter/ProbSnowGE04.jpg')">
                    <img src="https://www.weather.gov/images/tsa/winter/ProbSnowGE06.jpg" class="Chance-Forecast-Thumbnail" @click="showMainTSA('https://www.weather.gov/images/tsa/winter/ProbSnowGE06.jpg')">
                    <img src="https://www.weather.gov/images/tsa/winter/ProbSnowGE08.jpg" class="Chance-Forecast-Thumbnail" @click="showMainTSA('https://www.weather.gov/images/tsa/winter/ProbSnowGE08.jpg')">
                    <img src="https://www.weather.gov/images/tsa/winter/ProbSnowGE12.jpg" class="Chance-Forecast-Thumbnail" @click="showMainTSA('https://www.weather.gov/images/tsa/winter/ProbSnowGE12.jpg')">
                    <img src="https://www.weather.gov/images/tsa/winter/ProbSnowGE18.jpg" class="Chance-Forecast-Thumbnail" @click="showMainTSA('https://www.weather.gov/images/tsa/winter/ProbSnowGE18.jpg')">
                </div>
                <div class="LargerImage">
                    <img :src="LargerChanceTSA">
                </div>

            </div>
        </div>
        
    </div>
    <div>
        <RoadConditionMap></RoadConditionMap>
    </div>
    <div class="AlertMap">
        <WinterWeatherAlerts></WinterWeatherAlerts>
    </div>
    <div class="ViewLargerImage" v-if="FullScreen">
        <h3 @click="CloseFullScreen()">Close Full Screen</h3>
        <p>This mode allows a larger image to be displayed.</p>
        <img :src="LargerImage">
        <h3 @click="CloseFullScreen()">Close Full Screen</h3>
    </div>
</template>

<script setup>
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import { onMounted, ref } from 'vue';
import 'esri-leaflet';
import { dynamicMapLayer} from 'esri-leaflet';
import RoadConditionMap from '@/components/maps/Roadways/RoadConditionMap.vue';
import WinterWeatherAlerts from './WinterWeatherAlerts.vue';
import { useHead } from '@unhead/vue'
useHead({
  title: 'Winter',
  
})

let LargerChanceSGF = ref("")
let LargerChanceTSA = ref("")
let LargerImage = ref("")
let FullScreen = ref("")


function ShowMainSGF(src) {
    LargerChanceSGF.value = src

}
function showMainTSA(src) {
    LargerChanceTSA.value = src

}
function showLarge(src) {
    LargerImage.value = src
    FullScreen.value = true
}
function CloseFullScreen() {
    FullScreen.value = false
}
function LoadWSSI() {
    
    const bounds = [
    [32.85, -103.57],
    [41.02, -88.86]
    ];
    var map = L.map('WSSIMap',{
        maxZoom: 12,
        minZoom: 7,
        maxBounds: bounds
    }).setView([37,-94], 7);    
    var Base = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)
    var BaseLayers = {
                "Base": Base,
            }
    var WSSI_Day1_Overall = dynamicMapLayer({
        url: 'https://mapservices.weather.noaa.gov/vector/rest/services/outlooks/wpc_wssi/MapServer/',
        layers: [1], // Adjust the layer index according to the available layers
        transparent: true,
        opacity: 0.5,
        maxZoom: 19,
        minZoom: 5,
    }).addTo(map);
    var WSSI_Day2_Overall = dynamicMapLayer({
        url: 'https://mapservices.weather.noaa.gov/vector/rest/services/outlooks/wpc_wssi/MapServer/',
        layers: [2], // Adjust the layer index according to the available layers
        transparent: true,
        opacity: 0.5,
        maxZoom: 19,
        minZoom: 5,
    });
    var WSSI_Day3_Overall = dynamicMapLayer({
        url: 'https://mapservices.weather.noaa.gov/vector/rest/services/outlooks/wpc_wssi/MapServer/',
        layers: [3], // Adjust the layer index according to the available layers
        transparent: true,
        opacity: 0.5,
        maxZoom: 19,
        minZoom: 5,
    });
    // const Stations = dynamicMapLayer({
    //     url: 'https://mapservices.weather.noaa.gov/vector/rest/services/obs/surface_obs/MapServer',
    //     layers: [0], // Adjust the layer index according to the available layers
    //     transparent: true,
    //     opacity: 0.5,
    //     maxZoom: 19,
    //     minZoom: 1,

    // }).addTo(map);
    // const LSR = dynamicMapLayer({
    //     url: 'https://mapservices.weather.noaa.gov/vector/rest/services/obs/nws_local_storm_reports/MapServer',
    //     layers: [0],
    //     transparent: true,
    //     maxZoom: 19,
    //     minZoom: 1,

    // })
    var WSSI_Layers = {
                "Day 1 Overall": WSSI_Day1_Overall,
                "Day 2 Overall": WSSI_Day2_Overall,
                "Day 3 Overall": WSSI_Day3_Overall,

            }
      L.control.layers(BaseLayers, WSSI_Layers).addTo(map) 
}

onMounted(() => {
    LoadWSSI()
})
</script>

<style scoped>
@media (min-width: 768px) {
    .AlertMap {
        aspect-ratio: 16/9;
        width: 95%;
        margin-left: 2.5%;
    }
    .ViewLargerImage {
        position: fixed;
        background-color: rgba(255, 255, 255, 0.95);
        z-index: 9999;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .ViewLargerImage img {
        height: 90%;
    }
    .ViewLargerImage h3 {
        padding: 0px;
        margin: 0px;
    }
    .ViewLargerImage p {
        padding: 0px;
        margin: 0px;
    }
    .winter-comp {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .LeafletMap {
        width: 80%;
        aspect-ratio: 16/9;
        margin-left: 10%;
        margin-right: 10%;
    }
    .winter-comp-image {
        width: 80%;
    }
    .Forecast-Container {
        display: flex;
        width: 90%;
        margin-right: 5%;
        margin-left: 5%;
        flex-direction: row;
    }
    .Forecast-Item-Display-Main {
        width: 66%;
    }
    .Forecast-Item-Display-Sec {
        width: 33%;
    }
    .Chance-Forecast-Thumbnail {
        width: 12.5%;
    }
    .Chance-Forecast {
        width: 90%;
        margin-left: 5%;
        margin-left: 5%;
    }  
}
@media (max-width: 768px) {
    .winter-comp {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .LeafletMap {
        width: 100%;
        aspect-ratio: 4/3;
    }
    .winter-comp-image {
        width: 80%;
    }
    .Forecast-Container {
        display: flex;
        width: 90%;
        margin-right: 5%;
        margin-left: 5%;
        flex-direction: row;
    }
    .Forecast-Item-Display-Main {
        width: 66%;
    }
    .Forecast-Item-Display-Sec {
        width: 33%;
    }
    .Chance-Forecast-Thumbnail {
        width: 12.5%;
    }
    .Chance-Forecast {
        width: 90%;
        margin-left: 5%;
        margin-left: 5%;
    }
    .LargerImage {
        width: 100%;
    } 
    .LargerImage img {
        width: 100%;
    }
    .ViewLargerImage {
        position: fixed;
        background-color: rgba(255, 255, 255, 0.95);
        z-index: 9999;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .ViewLargerImage img {
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
        margin-top: 2%;
    }
    .ViewLargerImage h3 {
        padding: 0px;
        margin: 0px;
    }
    .ViewLargerImage p {
        padding: 0px;
        margin: 0px;
    }
}

</style>

  
  


  
  