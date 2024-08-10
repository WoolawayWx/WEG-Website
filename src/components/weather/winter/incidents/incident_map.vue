<template>
    <div>
        <div class="A01">
            <h2>Incidents related to Weather Reported for the current System</h2>
            <p>To add an incident, please contact Cade.</p>
            <div id="incidentMap" class="Map_View" style="width: 100%; height: 100%;">
                <div class="legend">
                    <div class="legend-area">
                        <div class="legend-element">
                            <img class="legend-image" src="/assets/map_icons/carOffRoad.svg">
                            <h3>Minor Incident</h3>
                        </div>
                        <div class="legend-element">
                            <img class="legend-image" src="/assets/map_icons/moderate.svg">
                            <h3>Moderate Incident</h3>
                        </div>
                        <div class="legend-element">
                            <img class="legend-image" src="/assets/map_icons/major.svg">
                            <h3>Major Incident</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import { onMounted, ref } from 'vue';
import 'esri-leaflet';
import { useHead } from '@unhead/vue'
import { supabase } from '@/supabase';
import 'leaflet-easyprint';

let Incidents = ref()
let Icon = ref()
useHead({
  title: 'Winter Weather Conditions',
  
})
async function LoadData() {
    Incidents.value = await supabase.from('WinterRoadIncidents').select()
    console.log(Incidents.value)
}
async function LoadIncidents() {
    await LoadData()
    const bounds = [
    [32.85, -103.57],
    [41.02, -88.86]
    ];
    var legendItems = [
    { label: 'Marker 1', color: 'blue' },
    { label: 'Marker 2', color: 'green' },]
    var Car1 = L.icon({
        iconUrl: '/assets/map_icons/carOffRoad.svg',

        iconSize:     [25, 25], // size of the icon
        iconAnchor:   [12.5, 12.5], // point of the icon which will correspond to marker's location
        popupAnchor:  [0,0] // point from which the popup should open relative to the iconAnchor
    });
    var Car2 = L.icon({
        iconUrl: '/assets/map_icons/moderate.svg',

        iconSize:     [25, 25], // size of the icon
        iconAnchor:   [12.5, 12.5], // point of the icon which will correspond to marker's location
        popupAnchor:  [0,0] // point from which the popup should open relative to the iconAnchor
    });
    var Car3 = L.icon({
        iconUrl: '/assets/map_icons/major.svg',

        iconSize:     [25, 25], // size of the icon
        iconAnchor:   [12.5, 12.5], // point of the icon which will correspond to marker's location
        popupAnchor:  [0,0] // point from which the popup should open relative to the iconAnchor
    });
    var map = L.map('incidentMap', {
        maxZoom: 19,
        minZoom: 7,
        maxBounds: bounds
    }).setView([37,-94], 9)
    var Base = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)
    for(var i in Incidents.value.data) {
        console.log(Incidents.value.data[i])
        var Incident = Incidents.value.data[i]
        if(Incident.severity == 'minor') {
            Icon.value = Car1
        } else if(Incident.severity == 'moderate') {
            Icon.value = Car2
        } else if(Incident.severity == 'major') {
            Icon.value = Car3
        }
        console.log(Incident.Latitude)
        L.marker([Incident.Latitude, Incident.Longitude], {icon: Icon.value}).bindPopup(Incident.desc).addTo(map)
    }
    
    var BaseLayers = {
                "Open Street Map": Base,
                
    }
    var a169size = {
        width: 1920,
        height: 1080,
        className: 'a169size',
        tooltip: '1080P PNG'
    }

    L.easyPrint({
        title: 'My awesome print button',
        position: 'bottomright',
        sizeModes: [a169size],
        exportOnly: true,
        hideControlContainer: true
    }).addTo(map);
    L.control.layers(BaseLayers).addTo(map)
    var legend = L.control({ position: 'bottomleft' });
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'legend');
        
        // Loop through each legend item and create its HTML representation
        legendItems.forEach(function (item) {
            div.innerHTML +=
                '<i style="background:' + item.color + '"></i> ' + item.label + '<br>';
        });
        legend.addTo(map);
        
        return div;
    };  
}
onMounted(() => {
    LoadIncidents()
})




</script>

<style scoped>
@media (min-width: 768px) {
    .Map_View {
        width:100%;
        height: 100%;

    }
    .A01 {
        display: flex;
        flex-direction: column;
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
        aspect-ratio: 16/9;
        max-height: 1440px;
    }
    .easyPrintHolder .a3CssClass .a169size { 
    background-image: url(data:image/svg+xml;utf8;base64,PD9...go=);
    }
    .legend {
        position: relative;
        z-index: 999;
        width: 100%;
        height: 100%;
        
    }
    .legend-area {
        height: 50px;
        width: 100%;
        background-color: rgba(100, 100, 100, 0.75);
        position: absolute;
        margin: 0px;
        padding: 0%;
        bottom: 0;
        display: flex;
        flex-direction: row;
    }
    .legend-element {
        width: 17%;
        height: 100%;
        display: flex;
        flex-direction: row;
    }
    .legend-element img {
        height: 30px;
        margin: 10px;
    }
    .legend-element h3 {
        color: white;
        text-transform: uppercase;
    }

}
</style>