<template>
    <div id="AlertMap">
        <div class="legend">
            <div><h3 style="font-size: 2cqw; padding: 0px; margin: 0px; color: black;">WoolawayWx Winter Weather Alerts</h3> </div>
            <div class="legend-colors">
                    <div class="legend-item" style="background-color: rgb(139 0 139);">Ice Storm Warning</div>
                    <div  class="legend-item" style="background-color: rgb(255 105 180);">Winter Storm Warning</div>
                    <div  class="legend-item" style="background-color: rgb(70 130 180);">Winter Storm Watch</div>
                    <div  class="legend-item" style="background-color: rgb(123 104 238);">Winter Weather Advisory</div>
            </div>
            <div class="legend-clock">
                <span>Time: {{ TimeClock }}</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import L from 'leaflet'
// import "leaflet/dist/leaflet.css"
import { onMounted, ref } from 'vue';
import 'esri-leaflet';
import { featureLayer} from 'esri-leaflet';

let DayState = ref("")
let clockHour = ref("")
let TimeClock = ref("")
let Timestamp = ref("")

async function LoadMap() {
    var map = L.map('AlertMap', {attributionControl: false,zoomControl: false}).setView([36.5, -94],8);
    var Base1 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '<div class="attribution"> &copy; <a href="http://www.openstreetmap.org/copyright"> OpenStreetMap</a></div>',
            }).addTo(map)
    var Radar = L.tileLayer.wms('https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0q.cgi', {
        layers: 'nexrad-n0q-900913',
        format: 'image/png',
        transparent: true,
        opacity: 0.8,
        attribution: 'Data provided by Iowa Environmental Mesonet'
    }).addTo(map);
    var WinterHazards = featureLayer({
        url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NWS_Watches_Warnings_v1/FeatureServer/6', style: (feature) => {
            let style = {
                fillColor: null // no outline color
            };
            const ID = feature.properties.Event
            if((feature.properties.Event == "Winter Weather Advisory")) {
                style.color = "#7B68EE"
                style.fillOpacity = "0.35"
            } else if((feature.properties.Event == "Winter Storm Warning")) {
                style.color = "#FF69B4"
                style.fillOpacity = "0.35"
            } else if((feature.properties.Event == "Ice Storm Warning")) {
                style.color = "#8B008B"
                style.fillOpacity = "0.35"
            } else if((feature.properties.Event == "Winter Storm Watch")) {
                style.color = "#4682B4"
                style.fillOpacity = "0.35"
            } else if((
                feature.properties.Event == "Special Weather Statement" ||
                feature.properties.Event == "Small Craft Advisory" ||
                feature.properties.Event == "Heavy Freezing Spray Warning" ||
                feature.properties.Event == "Flood Warning" ||
                feature.properties.Event == "Flood Advisory" ||
                feature.properties.Event == "Gale Warning" ||
                ID == "Flood Watch" ||
                ID == "Hazardous Seas Warning" ||
                ID == "Wind Advisory" ||
                ID == "Costal Flood Advisory" ||
                ID == "High Surf Advisory" ||
                ID == "Gale Watch" ||
                ID == "Hydrologic Outlook" ||
                ID == "Air Quality Alert" ||
                ID == "Coastal Flood Advisory" ||
                ID == "Avalanche Watch" ||
                ID == "Beach Hazards Statement" ||
                ID == "Flash Flood Watch" ||
                ID == "Hard Freeze Warning" ||
                ID == "Freeze Warning" ||
                ID == "Rip Current Statement" ||
                ID == "Wind Chill Warning" ||
                ID == "Wind Chill Watch" ||
                ID == "Wind Chill Advisory" ||
                ID == "Freeze Watch"
                )) {
                style.opacity = "0.0"
                style.fillOpacity = "0.0"
            } else {
                console.log(feature)
                style.opacity = "0.0"
                style.fillOpacity = "0.0"
            }
            return style;
        },
        maxZoom: 19,
        minZoom: 5,
    }).bindPopup(function (layer) {
    return (
        layer.feature.properties.Event, layer.feature.properties.Summary);}).addTo(map) ;
    var Base = {
        'Open Street': Base1
    }
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
        tileLayer: Base1,
        sizeModes: ['Current', 'A4Landscape', 'A4Portrait', display16x9],
        filename: "WWA_"+TS,
        exportOnly: true,
        hideControlContainer: true,
        position: 'bottomright'
		}).addTo(map);
    var Layers = {
                "Winter Hazards": WinterHazards,
                "Radar": Radar,

    }
    L.control.layers(Base, Layers, {position: 'bottomright'}).addTo(map) 
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);
    
}
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

onMounted(() => {
    LoadMap()
    CurrentTime()
})
</script>

<style scoped>
@media (min-width: 768px) {
    #AlertMap {
    width: 100%;
    height: 100%;
}
.legend-item {
    width: 25%;
    font-size: 1.25cqw;
    color: black;
    font-weight: 800;
}
.legend-clock {
    width: 25%;
    text-align: left;
    padding-left: 0.25cqw;
    font-size: 1cqw;
}
.legend-colors {
    display: flex;
    flex-direction: row;
    width: 100%;
}
.leaflet-control-container {
    display: none !important;
    opacity: 0 !important;
}
.leaflet-container a {
  display: none;
}
.leaflet-bottom.leaflet-right {
    display: none;
}
.legend {
    position: absolute;
    z-index: 500;
    height: 5%;
    top: 0%;
    background-color: RGB(182, 182, 180);
    width: 100%;
    text-transform: uppercase;
}
.legend p {
    padding: 0px;
    margin: 0px;
}
.colors {
    width: 70%;
    margin-left: 0%;
    display: flex;
    flex-direction: row;
    font-size: 0.9cqw;
    
}
.elements {
    width: 33%;
    display: flex;
    flex-direction: column;
    color: black;
    text-transform: uppercase;
    font-weight: 500;

}
}
#AlertMap {
    width: 100%;
    height: 100%;
}
.leaflet-bottom.leaflet-right {
    display: none;
}
.legend {
    position: absolute;
    z-index: 500;
    height: 12%;
    bottom: 0%;
    background-color: RGB(182, 182, 180);
    width: 100%;
    text-transform: uppercase;
}
.legend p {
    padding: 0px;
    margin: 0px;
}
.colors {
    width: 70%;
    margin-left: 0%;
    display: flex;
    flex-direction: row;
    font-size: 0.9cqw;
    
}
.elements {
    width: 33%;
    display: flex;
    flex-direction: column;
    color: black;
    text-transform: uppercase;
    font-weight: 500;

}
@media (max-width: 768px) {
    #AlertMap {
    width: 100%;
    height: 100%;
}
.leaflet-bottom.leaflet-right {
    display: none;
}
.legend {
    display: none;
    position: absolute;
    z-index: 500;
    height: 15%;
    bottom: 0%;
    background-color: RGB(182, 182, 180);
    width: 100%;
    text-transform: uppercase;
}
.legend p {
    padding: 0px;
    margin: 0px;
}
.colors {
    width: 100%;
    margin-left: 0%;
    display: flex;
    flex-direction: row;
    font-size: 0.9cqw;
    
}
.elements {
    width: 50%;
    display: flex;
    flex-direction: column;
    color: black;
    text-transform: uppercase;
    font-weight: 500;

}
}
</style>