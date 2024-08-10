<template>
    <h1>Road Conditions</h1>
    <div class="MapContainer"> 
        <div id="roadconditionsMap" class="leaflet_map">
            <div class="legend">
                <div class="legend-item" style="background-color: white;">{{ TimeClock }}</div>
                <div class="legend-item" style="background-color: white;">Road Conditions</div>
                <div class="legend-item" style="background-color: #1CD133; color: black;">Clear</div>
                <div class="legend-item" style="background-color: #A7D2EB; color: black;">Mostly Clear</div>
                <div class="legend-item" style="background-color: #0066ff; color: white;">Partly Covered</div>
                <div class="legend-item" style="background-color: #cc00ff; color: white;">Covered</div>
                <div class="legend-item" style="background-color: #FF0033; color: black;">Closed</div>
            </div>
            <div class="LogoContainer">
                <img src="@/assets/WEG_1024x1024.png">
                <img src="@/assets/WoolawayWx_1024x1024.png">
            </div>
        </div>
    </div>
    
    <div>
        <h3>Additional Information</h3>
        <p>Data is furnished by Iowa D.O.T. as other stats don't provide data.</p>
        <div class="extralinks">
            <div class="extralinks-col">
                <input type="button" class="extralinks-button" value="Missouri Road Conditions" onclick="window.open('https://traveler.modot.org/map/index.html')" />
                <input type="button" class="extralinks-button" value="Arkansas Road Conditions" onclick="window.open('https://www.idrivearkansas.com/')" />
            </div>
            <div class="extralinks-col">
                <input type="button" class="extralinks-button" value="Kansas Road Conditions" onclick="window.open('https://kandrive.gov/@-97.82834,38.17212,6?show=winterDriving,weatherRadar')" />
                <input type="button" class="extralinks-button" value="Oklahoma Road Conditions" onclick="window.open('https://www.arcgis.com/apps/Viewer/index.html?appid=023e821ebf7b4acd999ccfd58d92c3da')" />
            </div>

        </div>
    </div>
</template>

<script setup>
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import { onMounted, ref } from 'vue';
import 'esri-leaflet';
import { featureLayer } from 'esri-leaflet';
import 'leaflet-easyprint';

let DayState = ref("")
let clockHour = ref("")
let TimeClock = ref("")
let Timestamp =ref("")

function CurrentTime() {
    function clock() {
        const d = new Date()
        if(d.getHours() > 11) {
            DayState.value = "PM"
            if(d.getHours == 12) {
                clockHour.value = (12).toLocaleString({minimumIntegerDigits: 2, useGrouping:false})
            }
            clockHour.value = (d.getHours()-12).toLocaleString({minimumIntegerDigits: 2, useGrouping:false})
        }
         else {
            DayState.value = "AM"
            clockHour.value = (d.getHours()).toLocaleString({minimumIntegerDigits: 2, useGrouping:false})
        }
        var month = d.toLocaleString('default', { month: 'long' });
        var day = d.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        TimeClock.value = month+" "+day+" "+clockHour.value+":"+d.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+" "+DayState.value;
        Timestamp.value = d.getFullYear().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+"."+(d.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
            +"."+day+"_"+d.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+d.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+d.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    }
    setInterval(clock,1000)
}
function WinterRoadConditions() {
    const bounds = [
    [32.85, -103.57],
    [41.02, -88.86]
    ];
    var map = L.map('roadconditionsMap', {
        maxZoom: 19,
        minZoom: 7,
        maxBounds: bounds
    }).setView([37,-94], 9)
    var Base = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)
    var Base1 = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        minZoom: 1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    var RoadCon = featureLayer({url: 'https://services.arcgis.com/8lRhdTsQyJpO52F1/arcgis/rest/services/Midwest_Winter_Road_Conditions_View/FeatureServer/0',
        style: (feature) => {
                // console.log(feature)
                let style = {
                color: null // no outline color
                };
                if ((feature.properties.DESCRIPTION == "Clear"
                    )) { //Green
                style.color = "#1CD133";
                style.weight = "3";
                //Blue
                } else if (feature.properties.DESCRIPTION == "Partially Covered" 
                ) { 
                //Light Blue
                style.color = "#0066ff";
                style.weight = "3";
                } else if (feature.properties.DESCRIPTION == 'Mostly Clear') { 
                //Light Blue
                style.color = "#A7D2EB";
                style.weight = "3";
                } else if (feature.properties.DESCRIPTION == 'Completely Covered') { //Purple
                style.color = "#cc00ff";
                style.weight = "3";
                } else if (feature.properties.HEADLINE == "Closed") { //Closed
                style.color = "#FF0033";
                style.weight = "3";
                } else if (feature.properties.STATUS =="INACTIVE-STALE") {
                    style.opacity = "0.0"
                } else if (feature.properties.HEADLINE == null) {
                style.color = "#1CD133";
                style.opacity = "0.0"
                style.weight = "3";
                }
                return style;
                
            },
            attribution: '<a href="https://iowadot.gov/">Iowa DOT</a>',
    }).addTo(map);
    var BaseLayers = {
                "Open Street Map": Base,
                "Light - No Label": Base1,
                
    }
    var Overlays = {
                "Winter Road Conditions": RoadCon,
    }
    L.control.layers(BaseLayers, Overlays).addTo(map)
    var MapWidth = document.getElementById('roadconditionsMap').offsetWidth;
    var MapHeight = document.getElementById('roadconditionsMap').offsetHeight;
    var display16x9 = {
        width: MapWidth,
        height: MapHeight,
        className: 'display16x9',
        tooltip: '1080P PNG'
    }
    const T = new Date()
    var day = T.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    const TS = T.getFullYear().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+"."+(T.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
            +"."+day+"_"+T.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+T.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+T.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    L.easyPrint({
        sizeModes: [display16x9],
        filename: "RoadConditions_"+TS,
        title: 'My awesome print button',
        position: 'bottomright',
        exportOnly: true,
        hideControlContainer: true,
        hideClasses: ['leaflet-control-zoom','leaflet-bar', 'leaflet-control']
        
        
    }).addTo(map);
}
async function LoadIn() {
    WinterRoadConditions()
    CurrentTime()
    RefreshPage()
}
async function RefreshPage() {
    await sleep(300000)
    location.reload();
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


onMounted(() => {
    LoadIn()
    
})
</script>

<style scoped>
.MapContainer {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
}
.leaflet_map {
    width: 100%;
    aspect-ratio: 16/9;
}
.legend {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 2%;
    left: 2%;
    z-index: 500;
    border: 0.1cqw solid black;
}
.legend-item {
    width: 100%;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 0.75cqw;
}
.LogoContainer {
    display: flex;
    flex-direction: row;
    position: absolute;
    bottom: 2%;
    right: 2%;
    z-index: 500;
    width: 20%;
}
.LogoContainer img {
    width: 50%;
    margin: 2px;
}
.extralinks {
    display: flex;
    flex-direction: row;
    width: 50%;
    margin-left: 25%;
    margin-right: 25%;
}
.extralinks-col {
    display: flex;
    flex-direction: column;
    width: 50%;
}
.extralinks-button {
    color: black;
    background-color: white;
    border: 0.1cqw solid black;
    margin: 1cqw;
}

</style>