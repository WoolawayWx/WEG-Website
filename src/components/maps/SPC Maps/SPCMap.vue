<script>
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import {supabase} from '@/supabase.js'

export default {
    name: 'TestMap',
    data() {
        return {
            map: null,
            SPCDay1: [],
            SPCDay1_General: [],
            SPCDay1_Marginal: [],
            SPCDay1_Slight: [],
            SPCDay1_Enhanced: [],
            SPCDay1_Mod: [],
            SPCDay1_High: [],
            SPCDay2: [],
            SPCDay2_General: [],
            SPCDay2_Marginal: [],
            SPCDay2_Slight: [],
            SPCDay2_Enhanced: [],
            SPCDay2_Mod: [],
            SPCDay2_High: [],
            SPCDay3: [],
            SPCDay3_General: [],
            SPCDay3_Marginal: [],
            SPCDay3_Slight: [],
            SPCDay3_Enhanced: [],
            SPCDay3_Mod: [],
            SPCDay3_High: [],
        }
    },
    async mounted() {
        // FetchSPCData()
        // LoadIn()
        const { data, error } = await supabase.from('SPC Table').select()
            if(error) {
                console.log(error)
            }
            // console.log(data.length)
            // console.log(data)
            // console.log(data)
            for(let i = 0; i<data.length; i++){
                if(data[i].Name == "SPC Day 1") {
                    this.SPCDay1 = data[i].data
                } else if(data[i].Name == "SPC Day 2") {
                    this.SPCDay2 = data[i].data
                } else if(data[i].Name == "SPC Day 3") {
                    this.SPCDay3 = data[i].data
                }
            }
            const Day1_Features = this.SPCDay1.features
            for(let i =0; i<Day1_Features.length;i++) {
                if(i==0) {
                    this.SPCDay1_General = Day1_Features[i]
                }
                if(i==1) {
                    this.SPCDay1_Marginal = Day1_Features[i]
                }
                if(i==2) {
                    this.SPCDay1_Slight = Day1_Features[i]
                }
                if(i==3) {
                    this.SPCDay1_Enhanced = Day1_Features[i]
                }
                if(i==4) {
                    this.SPCDay1_Mod = Day1_Features[i]
                }
                if(i==5) {
                    this.SPCDay1_High = Day1_Features[i]
                }
            }
            const Day2_Features = this.SPCDay2.features
            for(let i =0; i<Day2_Features.length;i++) {
                if(i==0) {
                    this.SPCDay2_General = Day2_Features[i]
                }
                if(i==1) {
                    this.SPCDay2_Marginal = Day2_Features[i]
                }
                if(i==2) {
                    this.SPCDay2_Slight = Day2_Features[i]
                }
                if(i==3) {
                    this.SPCDay2_Enhanced = Day2_Features[i]
                }
                if(i==4) {
                    this.SPCDay2_Mod = Day2_Features[i]
                }
                if(i==5) {
                    this.SPCDay2_High = Day2_Features[i]
                }
            }
            const Day3_Features = this.SPCDay3.features
            for(let i =0; i<Day3_Features.length;i++) {
                if(i==0) {
                    this.SPCDay3_General = Day3_Features[i]
                }
                if(i==1) {
                    this.SPCDay3_Marginal = Day3_Features[i]
                }
                if(i==2) {
                    this.SPCDay3_Slight = Day3_Features[i]
                }
                if(i==3) {
                    this.SPCDay3_Enhanced = Day3_Features[i]
                }
                if(i==4) {
                    this.SPCDay3_Mod = Day3_Features[i]
                }
                if(i==5) {
                    this.SPCDay3_High = Day3_Features[i]
                }
            }
            // console.log(this.SPCDay1)
            var map = L.map('map').setView([37.8,-96], 5);

            var Base = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '<div class="attribution">&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a><p>NOAA/NWS Storm Prediction Center</p><p>WoolawayWx API Service</p></div>',
            }).addTo(map)
            // console.log(this.SPCDay1)
            var GenDay1 = L.geoJSON(this.SPCDay1_General, {
                style: function (feature) {
                    return {color: feature.properties.fill,
                    fillOpacity: 0.5}
                }
            })
            var MarDay1 = L.geoJSON(this.SPCDay1_Marginal, {
                style: function (feature) {
                    return {color: feature.properties.fill,
                    fillOpacity: 0.5}
                }
            })
            var SliDay1 = L.geoJSON(this.SPCDay1_Slight, {
                style: function (feature) {
                    return {color: feature.properties.fill,
                    fillOpacity: 0.5}
                }
            })
            var EnhDay1 = L.geoJSON(this.SPCDay1_Enhanced, {
                style: function (feature) {
                    return {color: feature.properties.fill,
                    fillOpacity: 0.5}
                }
            })
            var ModDay1 = L.geoJSON(this.SPCDay1_Mod, {
                style: function (feature) {
                    return {color: feature.properties.fill,
                    fillOpacity: 0.5}
                }
            })
            var HighDay1 = L.geoJSON(this.SPCDay1_High, {
                style: function (feature) {
                    return {color: feature.properties.fill,
                    fillOpacity: 0.5}
                }
            })
            var SPCDay1_MAP = L.layerGroup([GenDay1, MarDay1, SliDay1, EnhDay1, ModDay1, HighDay1]).addTo(map)
            var GenDay2 = L.geoJSON(this.SPCDay2_General, {
                style: function (feature) {
                    return {color: feature.properties.fill,
                    fillOpacity: 0.5}
                }
            })
            var MarDay2 = L.geoJSON(this.SPCDay2_Marginal, {
                style: function (feature) {
                    return {color: feature.properties.fill,
                    fillOpacity: 0.5}
                }
            })
            var SliDay2 = L.geoJSON(this.SPCDay2_Slight, {
                style: function (feature) {
                    return {color: feature.properties.fill,
                    fillOpacity: 0.5}
                }
            })
            var EnhDay2 = L.geoJSON(this.SPCDay2_Enhanced, {
                style: function (feature) {
                    return {color: feature.properties.fill,
                    fillOpacity: 0.5}
                }
            })
            var ModDay2 = L.geoJSON(this.SPCDay2_Mod, {
                style: function (feature) {
                    return {color: feature.properties.fill,
                    fillOpacity: 0.5}
                }
            })
            var HighDay2 = L.geoJSON(this.SPCDay2_High, {
                style: function (feature) {
                    return {color: feature.properties.fill,
                    fillOpacity: 0.5}
                }
            })
            var SPCDay2_MAP = L.layerGroup([GenDay2, MarDay2, SliDay2, EnhDay2, ModDay2, HighDay2])
            var GenDay3 = L.geoJSON(this.SPCDay3_General, {
                style: function (feature) {
                    return {color: feature.properties.fill,
                    fillOpacity: 0.5}
                }
            })
            var MarDay3 = L.geoJSON(this.SPCDay3_Marginal, {
                style: function (feature) {
                    return {color: feature.properties.fill,
                    fillOpacity: 0.5}
                }
            })
            var SliDay3 = L.geoJSON(this.SPCDay3_Slight, {
                style: function (feature) {
                    return {color: feature.properties.fill,
                    fillOpacity: 0.5}
                }
            })
            var EnhDay3 = L.geoJSON(this.SPCDay3_Enhanced, {
                style: function (feature) {
                    return {color: feature.properties.fill,
                    fillOpacity: 0.5}
                }
            })
            var ModDay3 = L.geoJSON(this.SPCDay3_Mod, {
                style: function (feature) {
                    return {color: feature.properties.fill,
                    fillOpacity: 0.5}
                }
            })
            var HighDay3 = L.geoJSON(this.SPCDay3_High, {
                style: function (feature) {
                    return {color: feature.properties.fill,
                    fillOpacity: 0.5}
                }
            })
            var SPCDay3_MAP = L.layerGroup([GenDay3, MarDay3, SliDay3, EnhDay3, ModDay3, HighDay3])
            // L.control.radar({}).addTo(map);
            var overlays = {
                "SPC Day 1 Outlook": SPCDay1_MAP,
                "SPC Day 2 Outlook": SPCDay2_MAP,
                "SPC Day 3 Outlook": SPCDay3_MAP,

            }
            var BaseLayers = {
                "Base": Base,
            }
            L.control.layers(BaseLayers, overlays).addTo(map)

    }

}
</script>

<template>
    <div id="map"></div>
</template>

<style>
@media only screen and (min-width: 768px) {
    #map a {
    padding: 0px;
    margin: 0px;
}
#map p {
    padding: 0px;
    margin: 0px;
}
.attribution {
    word-break: keep-all;
    width: 100%;
    display: flex;
    flex-direction: row;
}
}
@media only screen and (max-width: 768px) {
    #map a {
    padding: 0px;
    margin: 0px;
    font-size: 2cqw;
}
#map p {
    padding: 0px;
    margin: 0px;
    font-size: 2cqw;
}
}
#map {
    width: 100%;
    height: 100%;
}
</style>