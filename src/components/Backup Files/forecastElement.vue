<template>
    <h1>Point Forecast</h1>
    <p class="textArea">Input your coordinates into the inputs below. Longitude will change to how it is needed upon getting forecast. You can also use the "Get Location" button to return your current location from your device. You will need to allow location access.</p>
    <input id="lat" v-model="lat" placeholder="latitude" class="textInput">
    <input id="lon" v-model="lon" placeholder="longitude" class="textInput">
    <div>
        <button v-if="GeoLocation_Available" @click="getLocation()" class="forecast_button">Get Current location</button>
        <div class="loader" v-if="fetchingLocation"></div>
    </div>
    <p class="textArea"> latitude: {{ lat }}, longitude: {{ lon }}</p>
    <p class="textArea">Once the coordinates look right, click "Get Forecast"</p>
    <button @click="weatherForecast" class="forecast_button">Get Forecast</button>
    <span style="height: 40px;"></span>
    <br>
    <div v-if="showData">
        <p>{{ distance }} Miles {{ bearing }} from {{ city }}, {{ state }}</p>
    </div>
    <table v-if="showData" class="forecastTable">
        <tr>
            <th>Time</th>
            <th>Description</th>
            <th>Temperature</th>
            <th>Dew Point</th>
            <th>Relative Humidity</th>
            <th>Rain Chance</th>
            <th>Wind</th>
            
        </tr>
        <tr v-for="(item, index) in HourlyData" :key="index">
            <td>{{ item.time }}</td>
            <td>{{ item.DES }}</td>
            <td>{{ item.temp }}ºF</td>
            <td>{{ item.DewPoint }}ºF</td>
            <td>{{ item.RH }}%</td>
            <td>{{ item.POP }}%</td>
            <td>{{ item.WindSpeed }} from {{ item.WindDir }}</td>
        </tr>
    </table>
    <p class="textArea">Powered by WoolawayWx Development and National Weather Service API</p>
</template>

<script setup>
import { ref, onMounted } from 'vue';


let lat = ref("")
let lon = ref("")
let HourlyURL = ref("")
let HourlyForecast = ref("")
let HourlyData = new Array()
let showData = ref("")
let DewPoint = ref("")
let city = ref("")
let state = ref("")
let distance = ref("")
let bearing = ref("")

function weatherForecast() {
    getURLs()
    HourlyWx()
}

async function getURLs() {
    lon.value = Math.abs(lon.value)
    lon.value = -lon.value
    let forecastURL = "https://api.weather.gov/points/"+lat.value+","+lon.value
    fetch(forecastURL)
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        city.value = data.properties.relativeLocation.properties.city
        state.value = data.properties.relativeLocation.properties.state
        distance.value = (data.properties.relativeLocation.properties.distance.value/1609).toFixed(2)
        bearing.value = data.properties.relativeLocation.properties.bearing.value
        if ( bearing.value < 22.5) {
            bearing.value = "South"
        } else if ( bearing.value < 67.5) {
            bearing.value = "Southwest"
        } else if ( bearing.value < 112.5) {
            bearing.value = "West"
        } else if ( bearing.value < 157.5) {
            bearing.value = "Northwest"
        } else if ( bearing.value < 202.5) {
            bearing.value = "North"
        } else if ( bearing.value < 247.5) {
            bearing.value = "Northeast"
        } else if ( bearing.value < 292.5) {
            bearing.value = "East"
        } else if ( bearing.value < 337.5) {
            bearing.value = "Southeast"
        } else if ( bearing.value < 360.1) {
            bearing.value = "South"
        }
        HourlyURL.value = data.properties.forecastHourly
        
    })
}
let GeoLocation_Available = ref("")
let fetchingLocation = ref("")
function checkGeoLocationAccess() {
    if ("geolocation" in navigator) {
        GeoLocation_Available.value = "true"
    } else {
        GeoLocation_Available.value = "false"
    }

}

function getLocation() {
    window.confirm("This will retrieve your location. Click OK to contiune.")
    navigator.geolocation.getCurrentPosition((position) => {
        lat.value = position.coords.latitude
        lon.value = position.coords.longitude
        });
}

async function HourlyWx() {
    fetch("https://api.weather.gov/gridpoints/SGF/38,43/forecast/hourly")
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        HourlyForecast.value = data.properties.periods
        for (let i = 0; i< 10; i++) {
            var d = new Date(data.properties.periods[i].startTime)
            DewPoint.value = (data.properties.periods[i].dewpoint.value * (9/5)) + 32
            HourlyData[i] = {
                ["id"]: i,
                ["temp"]: data.properties.periods[i].temperature,
                ["time"]: d.getHours()+":00",
                ["POP"]: data.properties.periods[i].probabilityOfPrecipitation.value.toString(),
                ["DES"]: data.properties.periods[i].shortForecast,
                ["RH"]: data.properties.periods[i].relativeHumidity.value.toString(),
                ["WindSpeed"]: data.properties.periods[i].windSpeed,
                ["WindDir"]: data.properties.periods[i].windDirection,
                ["DewPoint"]: DewPoint.value,
                ["Day"]: d.getDay(),
            }
        }
        showData.value = true
        
    })
}

onMounted(() =>{
    checkGeoLocationAccess()
})
</script>

<style>
.forecastTable {
    align-items: center;
    width: 60%;
    margin-left: 20%;
    margin-right: 20%;
}
.HourlyForecast {
    display: flex;
    flex-direction: column;
    width: 60%;
    margin-left: 20%;
    margin-right: 20%;

}
.Rows {
    display: flex;
    flex-direction: row;
}
.value {
    width: 8em;
    align-content: center;
    line-height: 1em;
}
.value_large {
    width: 10em;
    text-align: right;
    height: 1vw;
    align-content: center;
    line-height: 1em;
    padding-right: 4px;
}
.text {
    align-self: center;
    line-height: 1em;
}
.textInput {
    padding: 0.5em;
    font-size: 1em;
    margin: 2em;
    text-align: center;

}
.forecast_button {
    width: 10em;
    height: 2em;
    font-size: 1.5em;
    border: 2px solid black;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 0.5em;
}
.forecast_button:hover {
    background-color: black;
    color:white
}
.textArea {
    width: 50%;
    margin-left: 25%;
    margin-right: 25%;
    font-size: 1.3em;
}
.loader {
    border: 1em solid lightgray;
    border-top: 1em solid rgb(139, 24, 26);
    border-radius: 50%; 
    position: relative;
    width: 2%;
    aspect-ratio: 1 / 1;
    margin-left: 49%;
    margin-right: 49%;
    margin-top: 20px;
    animation: spin 2s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@media only screen and (max-width: 768px) {
    .forecastTable {
        align-items: center;
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
        font-size: 2vw;
        padding: 1px;
    }
    .HourlyForecast {
        display: flex;
        flex-direction: column;
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
        font-size: 0.4em;

    }
    .Rows {
        display: flex;
        flex-direction: row;
    }
    .value {
        width: 8em;
        align-content: center;
        line-height: 1em;
    }
    .value_large {
        width: 6em;
        text-align: right;
        height: 1vw;
        align-content: center;
        line-height: 1em;
        padding-right: 3px;
    }
    .text {
        align-self: center;
        line-height: 1em;
    }
    .textArea {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    font-size: 1.3em;
    }
    .forecast_button {
    width: 15em;
    height: 2em;
    font-size: 1em;
    border: 2px solid black;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 0.5em;
}
.forecast_button:hover {
    background-color: black;
    color:white
}
    
}
</style>