<template>
    <div class="Page-View">
        <div class="Station-View-Title"><h1>Rocky Comfort Display</h1>
    </div>
        <div class="Data-View-Area">
            <div class="DVA-item">
                <h3>Station Area Map</h3>
                <div id="map"></div>
            </div>
            <div class="DVA-item">
                <h3>Station Data</h3>
                <div class="temperature ring-0">Temperature: {{ Temperature }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'; 


let stationID = ref("")
let Temperature = ref("")
let marker = ref()

function AxiosReq() {
    stationID.value = "F6791"
    const StationRawData = axios.get("https://api.synopticdata.com/v2/stations/latest?&stid="+stationID.value+"&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708")
    var StationData = StationRawData.then((response) => response.data)
    return StationData
}

function GetLocationData() {
    AxiosReq().then(data => {
        console.log(data)
        const StationLat = data.STATION[0].LATITUDE
        const StationLon = data.STATION[0].LONGITUDE
        Temperature.value = data.STATION[0].OBSERVATIONS.air_temp_value_1.value
        mapboxgl.accessToken = 'pk.eyJ1IjoiY2FkZS13b29sYXdheXd4IiwiYSI6ImNsZDd1NTR5YjA2OXIzcW9heTYxMzZ4eWwifQ.6gn5t5sGVTVWJuqurZRlaQ';
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [StationLon,StationLat], // starting position [lng, lat]
            zoom: 9, // starting zoom
        })
        marker.value = new mapboxgl.Marker({element: createCustomMarkerElement('assets/wxstation_50px.png')}).setLngLat([StationLon,StationLat]).addTo(map);
        const API_KEY = "AwIGw3KaSHpdGgrAyre08YJwf2DqksCj"
        const DATA_FIELD = "precipitationIntensity"
        map.on('load', function() {
        map.addSource('tomorrow-io-api', {
            "type": 'raster',
            "tiles": [`https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${DATA_FIELD}/.png?apikey=${API_KEY}`],
            "tileSize": 256,
            "attribution": '&copy; <a href="https://www.tomorrow.io/weather-api">Powered by Tomorrow.io</a>'
        });
        map.addLayer({
            "id": "radar-tiles",
            "type": "raster",
            "source": "tomorrow-io-api",
            "minzoom": 1,
            "maxzoom": 12
  });
});
    })
}

function createCustomMarkerElement(iconUrl) {
  var markerElement = document.createElement('div');
  markerElement.className = 'custom-marker';
  markerElement.style.backgroundImage = 'url(' + iconUrl + ')';
  markerElement.style.width = '50px'; // Adjust icon width as needed
  markerElement.style.height = '50px'; // Adjust icon height as needed
  return markerElement;
}

onMounted(() => {
    GetLocationData()
})

</script>

<style>
@import url("https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css");
@media (min-width: 768px) {
    .Data-View-Area {
        display: flex;
        flex-direction: row-reverse;
        width: 100%;
    }
    .MapArea {
        width: 50%;
    }
    .Map-Main {
        width: 100%;
    }
    .Page-View {
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
    }
    .mapboxgl-map {
        width: 100%;
        aspect-ratio: 1/1;
    }
    #map {
        margin: 2%;
    }
    .DVA-item {
        width: 50%;
    }
    h3 {
        font-size: 1.5cqw;
    }
    h1 {
        font-size: 2cqw;
    }
}

</style>