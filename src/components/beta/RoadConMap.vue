<template>
    <div id="mapCapture"> 
       <h1>Road Conditions</h1>
        <div id="roadconditionsMap" style="width: 100%; height: 400px;">
            <div class="legend">
                <div class="legend-item" style="background-color: white;">{{ TimeClock }}</div>
                <div class="legend-item" style="background-color: white;">Road Conditions</div>
                <div class="legend-item" style="background-color: #1CD133; color: black;">Clear</div>
                <div class="legend-item" style="background-color: #0066ff; color: white;">Partly Covered</div>
                <div class="legend-item" style="background-color: #cc00ff; color: white;">Covered</div>
                <div class="legend-item" style="background-color: #FF0033; color: black;">Closed</div>
            </div> 
        </div>
        <!-- <div class="legend">
            <div class="legend-item" style="background-color: #1CD133; color: black;">Clear</div>
            <div class="legend-item" style="background-color: #0066ff; color: white;">Partly Covered</div>
            <div class="legend-item" style="background-color: #cc00ff; color: white;">Covered</div>
            <div class="legend-item" style="background-color: #FF0033; color: black;">Closed</div>
        </div>  -->
    </div>
    <button @click="SaveImage()">Save Image</button>
    
    <div>
        <h3>Additional Information</h3>
        <p>Data is furnished by Iowa D.O.T. as other stats don't provide data.</p>
        <div class="extralinks">
            <div class="extralinks-col">
                <!-- <button class="extralinks-row" @click=" window.open('https://traveler.modot.org/map/index.html','_blank')">Missouri Road Conditions</button> -->
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
import domtoimage from 'dom-to-image';

let DayState = ref("")
let clockHour = ref("")
let TimeClock = ref("")
let Timestamp =ref("")
let map = ref()

function CurrentTime() {
    function clock() {
        const d = new Date()
        if(d.getHours() > 12) {
            DayState.value = "PM"
            clockHour.value = (d.getHours()-12).toLocaleString({minimumIntegerDigits: 2, useGrouping:false})
        } else {
            DayState.value = "AM"
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
    map.value = L.map('roadconditionsMap', {
        maxZoom: 19,
        minZoom: 7,
        maxBounds: bounds
    }).setView([37,-94], 9)
    var Base = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map.value)
    var Base1 = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        minZoom: 1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    var RoadCon = featureLayer({url: 'https://services.arcgis.com/8lRhdTsQyJpO52F1/arcgis/rest/services/Midwest_Winter_Road_Conditions_View/FeatureServer/0',
        style: (feature) => {
                let style = {
                color: null // no outline color
                };
                if ((
                    feature.properties.HEADLINE == "Seasonal" 
                    || feature.properties.HEADLINE == "Dry Pavement" 
                    || feature.properties.HEADLINE == "Normal Driving Conditions" 
                    || feature.properties.HEADLINE == "Wet Pavement"
                    || feature.properties.HEADLINE == "Some Risk Of Frost On Roadway"
                    )) { //Green
                style.color = "#1CD133";
                style.weight = "3";
                //Blue
                } else if (feature.properties.HEADLINE == "Partially Covered with Mixed Snow Ice or Slush" 
                || feature.properties.HEADLINE == "Partially Covered with Mixed"
                || feature.properties.HEADLINE == "Light Ice On Roadway"
                || feature.properties.HEADLINE == "Partially Covered with Ice"
                || feature.properties.HEADLINE == "Partially Covered with Snow"
                || feature.properties.HEADLINE == "Light Slush On Roadway") { 
                //Blue
                style.color = "#0066ff";
                style.weight = "3";
                } else if (feature.properties.HEADLINE == "Completely Covered with Mixed"
                || feature.properties.HEADLINE == "Completely Covered with Mixed Snow Ice or Slush") { //Purple
                style.color = "#cc00ff";
                style.weight = "3";
                } else if (feature.properties.HEADLINE == "Closed") { //Closed
                style.color = "#FF0033";
                style.weight = "3";
                } else if (feature.properties.HEADLINE == null) {
                style.color = "#1CD133";
                style.opacity = "0.0"
                style.weight = "3";
                }
                return style;
                
            },
            attribution: '<a href="https://iowadot.gov/">Iowa DOT</a>',
    }).addTo(map.value);
    // const T = new Date()
    // var day = T.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    // const TS = T.getFullYear().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+"."+(T.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    //         +"."+day+"_"+T.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+T.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+T.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    // L.easyPrint({
    //     tileLayer: Base,
    //     filename: "RoadConditions_"+TS,
    //     title: 'My awesome print button',
    //     position: 'bottomright',
    //     sizeModes: ['Current','A4Landscape', 'A4Portrait'],
    //     exportOnly: true,
    //     hideControlContainer: true,
        
    // }).addTo(map);
    var BaseLayers = {
                "Open Street Map": Base,
                "Light - No Label": Base1,
                
    }
    var Overlays = {
                "Winter Road Conditions": RoadCon,
    }
    L.control.layers(BaseLayers, Overlays).addTo(map.value)
    // var a169size = {
    //     width: 1920,
    //     height: 1080,
    //     className: 'a169size',
    //     tooltip: '1080P PNG'
    // }
//     var legend = L.control({ position: 'bottomright' });
//     legend.onAdd = function (roadconditionsMap) {
//     var div = L.DomUtil.create('div', 'legend');
    
//     // Loop through each legend item and create its HTML representation
//     legendItems.forEach(function (item) {
//         div.innerHTML +=
//             '<i style="background:' + item.color + '"></i> ' + item.label + '<br>';
//     });
//     legend.addTo(roadconditionsMap);
    
//     return div;
// }; 
}

function SaveImage() {
    var displayMap = document.getElementById('roadconditionsMap')
      hideMapControls()
      // Use dom-to-image library to capture the element as an image
      domtoimage.toPng(displayMap)
        .then((dataUrl) => {
          // Create a temporary <a> element to download the image
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'captured-image.png';
          // Trigger the download
          link.click();
          setTimeout(() => {
            showMapControls()
          }, 500); // Example delay: 500 milliseconds
        })
        .catch((error) => {
          console.error('Error capturing image:', error);
        });
        
}
function hideMapControls() {
      // Hide Leaflet controls (replace these with your specific controls)
      map.value.zoomControl.remove();
      // Hide other controls if needed (e.g., attribution control, etc.)
    }
function showMapControls() {
      // Show Leaflet controls (replace these with your specific controls)
      if (!map.value.zoomControl) {
        L.control.zoom().addTo(map.value);
      }
      // Show other controls if needed
    }

onMounted(() => {
    WinterRoadConditions()
    CurrentTime()
    
})
</script>

<style scoped>
#roadconditionsMap {
    width: 100%;
    aspect-ratio: 16/9;
    padding: 0%;
    margin: 0%;
}
#mapCapture {
    width: 90%;
    aspect-ratio: 16/9;
    margin-left: 5%;
    margin-right: 5%;
}
.leaflet-map {
    width: 100%;
    aspect-ratio: 16/9;
    margin: 0px;
    padding: 0px;
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