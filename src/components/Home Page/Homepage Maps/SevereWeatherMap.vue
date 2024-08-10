<template>
    <div id="AlertMap">
        <div class="legend">
            <div class="colors">
                <div class="elements">
                    <div class="element" style="background-color: rgb(255 165 0);">Severe Thunderstorm Warning</div>
                    <div class="element" style="background-color: rgb(255 0 0);">Tornado Warning</div>
                </div>
                <div class="elements">
                    <div class="element" style="background-color: rgb(219 112 147);">Severe Thunderstorm Watch</div>
                    <div class="element" style="background-color: rgb(255 255 0);">Tornado Watch</div>
                </div>
            </div>
            <p>Current Watches Warnings and Advisories<br> Map is powered by Leaflet, IEM, and NWS resources. ©WoolawayWx LLC 2024</p>
            
            
        </div>
    </div>
</template>
<script setup>
import L from 'leaflet'
// import "leaflet/dist/leaflet.css"
import { onMounted } from 'vue';
import 'esri-leaflet';
import { featureLayer} from 'esri-leaflet';

async function LoadMap() {
    var map = L.map('AlertMap', {attributionControl: false}).setView([36.5, -94],8);
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
            if((ID == "Severe Thunderstorm Warning"
                )) {
                style.color = "#FFA500"
                style.fillOpacity = "0.35"
            }  else if((ID == "Tornado Warning"
                )) {
                style.color = "#FF0000"
                style.fillOpacity = "0.35"
            }
            else if((ID == "Tornado Watch"
                )) {
                style.color = "#FFFF00"
                style.fillOpacity = "0.10"
            }
            else if((ID == "Severe Thunderstorm Watch"
                )) {
                style.color = "#DB7093"
                style.fillOpacity = "0.10"
            } else {
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
    var Layers = {
                "Weather Alerts": WinterHazards,
                "Radar": Radar,

    }
    L.control.layers(Base, Layers).addTo(map) 
    
}

onMounted(() => {
    LoadMap()
    fetch('https://mapservices.weather.noaa.gov/eventdriven/rest/services/WWA/watch_warn_adv/MapServer/1/query?where=1%3D1&outFields=*&f=geojson').then(res => res.json()).then(data => {
        console.log(data)
    })
})
</script>

<style scoped>
@media (min-width: 768px) {
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
    height: 20%;
    bottom: 0%;
    background-color: RGB(182, 182, 180);
    width: 100%;
    text-transform: uppercase;
}
.legend p {
    padding: 0px;
    margin: 0px;
}
.elements {
    width: 50%;
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
    display: block;
    position: absolute;
    z-index: 500;
    height: 20%;
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
    font-size: 3cqw;
    
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