/* eslint-disable */

<template>
    <h3>Get Weather for a Location</h3>
    <div class="Desktop">
        <div class="C01">
            <div class="C02">
                <div class="C03_Container">
                    <h4  class="C03_Item">Location from Device</h4>
                    <button @click="getLocation()"  class="C03_Item">Get Location</button>
                </div>
            </div>
            <div class="C02">
                <div class="C03_Container">
                    <h4 class="C03_Item">Input Location</h4>
                    <input v-model="lat" placeholder="Latitude"  class="C03_Item">
                    <input v-model="lon" placeholder="Longitude" class="C03_Item">
                    <button @click="getWeatherStationLocations()"  class="C03_Item">Get Weather</button>
                </div>
                
            </div>
        </div>
    </div>
    <div class="Mobile">
        <div class="C01">
            <div class="C05">
                <button @click="geolocation()">GeoLocation</button>
                <button @click="location()">Input Location</button>
            </div>
            <div class="C02" v-if="GeoLocation">
                <div class="C03_Container">
                    <h4  class="C03_Item">Location from Device</h4>
                    <button @click="getLocation()"  class="C03_Item">Get Location</button>
                </div>
            </div>
            <div class="C02" v-if="InputLocation">
                <div class="C03_Container">
                    <h4 class="C03_Item">Input Location</h4>
                    <input v-model="lat" placeholder="Latitude"  class="C03_Item">
                    <input v-model="lon" placeholder="Longitude" class="C03_Item">
                    <button @click="getWeatherStationLocations()"  class="C03_Item">Get Weather</button>
                </div>
                
            </div>
        </div>
    </div>
    
    <div class="A01">
        <div class="A02 A04">
            <h3>Current Conditions</h3>
            <p v-if="NAMEvis">Station Location: {{ NAME }}</p>
            <div class="B01">
                <div class="B02">
                    <div class="B03">
                        <div v-if="TEMPvis">
                            <p>Temperature</p>
                            <h3>{{ TEMP }}ºF</h3>
                        </div>
                        <div v-if="DEWPOINTvis">
                            <p>Dewpoint</p>
                            <h3>{{ DEWPOINT }}ºF</h3>
                        </div>
                    </div>
                    <div class="B03">
                        <div class="WindContainer" v-if="WINDvis">
                            <p>Wind</p>
                            <div class="WindVector" :style="{'rotate': WINDDIR+'deg'}">
                                <img src="/assets/windvector.svg">
                            </div>
                            <div class="WindSpeed">
                                <h3 class="wind_sus">{{ WINDSPEED }} MPH</h3>
                                <p class="wind_gus">{{ WINDGUST }} MPH</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="B02">
                    <div class="B03">
                        <div v-if="RHvis">
                            <p>Humidity</p>
                            <h3>{{ RH }}%</h3>
                        </div>
                    </div>
                    <div class="B03">
                        <div v-if="RAINvis">
                            <div v-if="RAIN_24HRvis">
                                <p>24 Hour Rainfall</p>
                                <h3>{{ RAIN_24HR }} IN</h3>
                            </div>
                            <div v-if="RAIN_1HRvis">
                                <p>1 Hour Rainfall</p>
                                <h3>{{ RAIN_1HR }} IN</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="A02 Borderline_right ForecastDisplay A05">
            <h3>Hourly Forecast</h3>
            <table class="ForecastTable" v-if="HourlyDatavis">
                <tr>
                    <th>Time</th>
                    <th>Temperature</th>
                    <th>Precipitation Chance</th>
                    <th>Wind</th>
                </tr>
                <tr v-for="(item, index) in HourlyData" :key="index">
                    <td>{{ item.time }}</td>
                    <td>{{ item.temp }}ºF</td>
                    <td>{{ item.POP }}%</td>
                    <td>{{ item.WindSpeed }} MPH from {{ item.WindDir }}</td>
                </tr>
            </table>
        </div>
    </div>
    <div>
        <div>
            <h3>Daily Forecast</h3>
            <p>5 Day Forecast from NWS</p>
            <div class="DailyForecast">
                <div v-for="(item, index) in DailyForecast" :key="index" class="ForecastBox">
                        <div>
                            <h4>{{ item.name }}</h4>
                        </div>
                        <div>
                            <p>
                                {{item.temp}}ºF
                            </p>
                        </div>
                        <div>
                            <img :src="item.icon" class="Daily_Icon">
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'


let lat = ref()
let lon = ref()
let StationList = ref("")
let StationID = ref("")
let TEMP = ref("")
let DEWPOINT = ref("")
let RH = ref("")
let WINDDIR = ref("")
let WINDGUST = ref("")
let WINDSPEED = ref("")
let TEMPvis = ref("")
let DEWPOINTvis  = ref("")
let RHvis = ref("")
let WINDvis = ref("")
let NAME = ref("")
let NAMEvis = ref("")
let RAINvis = ref("")
let RAIN_24HRvis = ref("")
let RAIN_24HR = ref("")
let RAIN_1HRvis = ref("")
let RAIN_1HR = ref("")
let ForecastDayURL = ref("")
let ForecastHourlyURL = ref("")
let HourlyData = new Array()
let HourlyDatavis = ref("")
let DailyForecast = new Array()
let LocationCheck =ref("")
let GeoLocation = ref("")
let InputLocation = ref("")

//"https://api.synopticdata.com/v2/stations/latest?&stid="+(this.stationID)+"&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708"
const Synoptic_Token = process.env.VUE_APP_SYNOPTICTOKEN


async function getWeatherStationLocations() {
    if(lon.value > 0) {
        lon.value = -lon.value
    }
    const url1 = "https://api.weather.gov/points/"+lat.value+","+lon.value
    fetch(url1).then(res => res.json()).then(data => {
        ForecastDayURL.value = data.properties.forecast
        ForecastHourlyURL.value = data.properties.forecastHourly
        StationList.value = data.properties.observationStations
    })
    await sleep(1000)
    getStationURL()
    getForecast()

}

function location() {
    GeoLocation.value = false
    InputLocation.value = true
}
function geolocation() {
    GeoLocation.value = true
    InputLocation.value = false
}
async function getForecast() {
    fetch(ForecastDayURL.value).then(res => res.json()).then(data => {
        const ForecastPeriods = data.properties.periods
        for (let i = 0; i <8; i++){
            DailyForecast[i] = {
                ["id"]: i,
                ["name"]: ForecastPeriods[i].name,
                ["icon"]: ForecastPeriods[i].icon,
                ["details"]: ForecastPeriods[i].detailedForecast,
                ["temp"]: ForecastPeriods[i].temperature,
            }
        }
    })
    fetch(ForecastHourlyURL.value).then(res => res.json()).then(data => {
        HourlyDatavis.value = true
        for (let i = 0; i<10; i++) {
            var d = new Date(data.properties.periods[i].startTime)
            HourlyData[i]={
                ["id"]: i,
                ["time"]: d.getHours()+":00",
                ["temp"]: data.properties.periods[i].temperature,
                ["POP"]: data.properties.periods[i].probabilityOfPrecipitation.value.toString(),
                ["WindSpeed"]: data.properties.periods[i].windSpeed,
                ["WindDir"]: data.properties.periods[i].windDirection,
                ["Day"]: d.getDay(),
            }
        }

    })
}
async function getStationURL() {
    fetch(StationList.value).then(res => res.json()).then(data => {
        StationID.value = data.features[0].properties.stationIdentifier
    })
    await sleep(500);
    getStationData()
}

async function getStationData() {
    const StatUrl = "https://api.synopticdata.com/v2/stations/latest?&stid="+StationID.value+"&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token="+Synoptic_Token

    fetch(StatUrl).then(res => res.json()).then(data => {
        var OBS = data.STATION[0].OBSERVATIONS
        if(Object.prototype.hasOwnProperty.call(data.STATION[0],'NAME'))
            NAME.value = data.STATION[0].NAME
            NAMEvis.value = true
        if(Object.prototype.hasOwnProperty.call(OBS, 'air_temp_value_1')){
            TEMP.value = data.STATION[0].OBSERVATIONS.air_temp_value_1.value.toFixed(0)
            TEMPvis.value = true
        } else{
            TEMPvis.value = false
        }
        if(Object.prototype.hasOwnProperty.call(OBS, 'dew_point_temperature_value_1')){
            DEWPOINT.value = OBS.dew_point_temperature_value_1.value.toFixed(0)
            DEWPOINTvis.value = true
        } else{
            DEWPOINTvis.value = false
        }
        if(Object.prototype.hasOwnProperty.call(OBS, 'relative_humidity_value_1')){
            RH.value = OBS.relative_humidity_value_1.value.toFixed(0)
            RHvis.value = true
        } else{
            RHvis.value = false
        }
        if(Object.prototype.hasOwnProperty.call(OBS, 'wind_speed_value_1')){
            WINDSPEED.value = (data.STATION[0].OBSERVATIONS.wind_speed_value_1.value).toFixed(0)
            WINDDIR.value = data.STATION[0].OBSERVATIONS.wind_direction_value_1.value
            WINDGUST.value = (data.STATION[0].OBSERVATIONS.wind_gust_value_1.value).toFixed(0)
            WINDvis.value = true
        } else{
            WINDvis.value = false
        }
        // if(Object.prototype.hasOwnProperty.call(OBS, 'precip_accum_24_hour_value_1')) {
        //     RAIN_24HR.value = OBS.precip_accum_24_hour_value_1.value
        //     RAIN_24HRvis.value = true
        //     RAINvis.value = true
        // }
        // if(Object.prototype.hasOwnProperty.call(OBS, 'precip_accum_one_hour_value_1')) {
        //     RAIN_1HR.value = OBS.precip_accum_one_hour_value_1.value
        //     RAIN_1HRvis.value = true
        //     RAINvis.value = true
        // }
        if(Object.prototype.hasOwnProperty.call(OBS, 'precip_accum_one_hour_value_1')) {
            RAINvis.value = true
            if(Object.prototype.hasOwnProperty.call(OBS, 'precip_accum_24_hour_value_1')) {
                RAIN_24HR.value = OBS.precip_accum_24_hour_value_1.value
                RAIN_24HRvis.value = true
                RAINvis.value = true
            }
            if(Object.prototype.hasOwnProperty.call(OBS, 'precip_accum_one_hour_value_1')) {
                RAIN_1HR.value = OBS.precip_accum_one_hour_value_1.value
                RAIN_1HRvis.value = true
                RAINvis.value = true
            }
        } else if(Object.prototype.hasOwnProperty.call(OBS, 'precip_accum_24_hour_value_1')) {
            RAINvis.value = true
            if(Object.prototype.hasOwnProperty.call(OBS, 'precip_accum_24_hour_value_1')) {
                RAIN_24HR.value = OBS.precip_accum_24_hour_value_1.value
                RAIN_24HRvis.value = true
                RAINvis.value = true
            }
            if(Object.prototype.hasOwnProperty.call(OBS, 'precip_accum_one_hour_value_1')) {
                RAIN_1HR.value = OBS.precip_accum_one_hour_value_1.value
                RAIN_1HRvis.value = true
                RAINvis.value = true
            }
        } else {
            RAINvis.value = false
        }
        // TEMP.value = data.STATION[0].OBSERVATIONS.air_temp_value_1.value
        // DEWPOINT.value = data.STATION[0].OBSERVATIONS.dew_point_temperature_value_1.value
        // RH.value = data.STATION[0].OBSERVATIONS.relative_humidity_value_1.value
        // WINDSPEED.value = (data.STATION[0].OBSERVATIONS.wind_speed_value_1.value).toFixed(0)
        // WINDDIR.value = data.STATION[0].OBSERVATIONS.wind_direction_value_1.value
        // WINDGUST.value = (data.STATION[0].OBSERVATIONS.wind_gust_value_1.value).toFixed(0)

    })
}



async function getLocation() {
    window.confirm("This will retrieve your location. Click OK to contiune.")
    navigator.geolocation.getCurrentPosition((position) => {
        lat.value = position.coords.latitude
        lon.value = position.coords.longitude
        LocationCheck.value = "true"
        });
    await sleep(500)
    LocationHold()
}
async function LocationHold() {
    for(let i = 0; i < 2; i++)
        if(LocationCheck.value == "true") {
            await sleep(500)
            getWeatherStationLocations()
            i = 3
        } else {
            await sleep(1000)
            i = 0
        }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

onMounted(() => {
    LocationCheck.value = "false"
    GeoLocation.value = "true"
    GeoLocation.value = true
    InputLocation.value = false
})
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");
@media only screen and (min-width: 768px) {
    .Mobile {
        display: none;
    }
    .ForecastTable {
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
    }
    .ForecastTable th {
        font-size: 0.75cqw;
    }
    .Daily_Icon {
        width: 80%;
        aspect-ratio: 1/1;
    }
    .DailyForecast {
        width: 90%;
        display: flex;
        flex-direction: row;
        margin-left: 5%;
        margin-right: 5%;
    }
    .ForecastBox {
        width: 10%;
        border: 0.25cqw solid black;
        margin: 1%;
    }
    .ForecastBox h4 {
        aspect-ratio: 2/1;
        font-size: 1.5cqw;
        text-transform: uppercase;
    }
    
    .ForecastContainer {
        width: 80%;
        display: flex; 
        flex-direction: row;
        border: 2px solid black;
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 3px;
        margin-bottom: auto;
        aspect-ratio: 4/1;
    }
    .ForecastItem {
        width: 25%;
        height: 100%;
        display: flex;
    }
    .ForecastText {
        text-align: center;
        vertical-align: middle;
        width: 100%;
        height: 100%;
    }
    .A01 {
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
        display: flex;
        height: fit-content;
    }
    .A02 {
        width: 50%;
    }
    .Borderline_right {
        border-left: 2px solid;
    }
    .B01 {
        width: 100%;
        display: flex;
        flex-direction: column;

    }
    .B02 {
        width: 100%;
        aspect-ratio: 2/1;
        display: flex;
    }
    .B03 {
        width: 50%;
        position: relative;
    }
    .WindVectorContainer {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .WindVector {
        position: absolute;
        width: 50%;
        margin: 25%;
        top: 0;
        left: 0;

    }
    .WindSpeed {
        width: 50%;
        height: 20%;
        margin-top: 25%;
        margin-right: 25%;
        margin-left: 25%;
        margin-top: 40%;
        margin-bottom: 40%;
        position: absolute;
        z-index: 9;
        top: 0;
        left: 0;
    }
    .C01 {
        display: flex;
        flex-direction: row;
        width: 60%;
        margin-left: 20%;
        margin-right: 20%;
    }
    .C02 {
        width: 50%;
    }    
    .C03_Container {
        display: flex;
        flex-direction: column;
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 0px;
    }
    .C03_Item {
        margin: 0.5cap;
    }
    .wind_sus {
        font-size: 1.5cqw;
        margin: 0px;
    }
    .wind_gus {
        font-size: 1cqw;
    }
}
@media only screen and (max-width: 768px) {
    .C05 button{
        width: 50%;
        margin: 2px;
        border: 0.5cqw solid black;
        border-radius: 1cqw;
        background-color: rgba(0, 0, 0, 0);
        aspect-ratio: 3/1;
        text-transform: uppercase;
        font-size: 3cqw;
    }
    .C03_Container button{
        width: 100%;
        margin: 2px;
        border: 0.5cqw solid black;
        border-radius: 1cqw;
        background-color: rgba(0, 0, 0, 0);
        aspect-ratio: 4/1;
        text-transform: uppercase;
        font-size: 3cqw;
    }
    .C05 button:hover {
        background-color: black;
        color: white;
    }
    .C03_Container button:hover {
        background-color: black;
        color: white;
    }
    .C05 {
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    .Desktop {
        display: none;
        border-collapse: collapse;
    }
    .ForecastTable {
        width: 100%;
    }
    .ForecastTable th {
        font-size: 2cqw;
    }
    .ForecastTable td {
        font-size: 3cqw;
    }
    .Daily_Icon {
        width: 80%;
        aspect-ratio: 1/1;
    }
    .DailyForecast {
        width: 90%;
        display: flex;
        flex-direction: row;
        margin-left: 5%;
        margin-right: 5%;
    }
    .ForecastBox {
        width: 10%;
        border: 0.25cqw solid black;
        margin: 1%;
    }
    .ForecastBox h4 {
        aspect-ratio: 2/1;
        font-size: 1.3cqw;
        text-transform: uppercase;
    }
    
    .ForecastContainer {
        width: 80%;
        display: flex; 
        flex-direction: column;
        border: 2px solid black;
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 3px;
        margin-bottom: auto;
        aspect-ratio: 4/1;
    }
    .ForecastItem {
        width: 25%;
        height: 100%;
        display: flex;
    }
    .ForecastText {
        text-align: center;
        vertical-align: middle;
        width: 100%;
        height: 100%;
    }
    .A01 {
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
        display: flex;
        height: fit-content;
        flex-direction: column;
    }
    .A02 {
        margin-top: 2px;
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
    }
    .A04 {
        aspect-ratio: 1/1;
    }
    .B01 {
        width: 100%;
        display: flex;
        flex-direction: column;

    }
    .B02 {
        width: 100%;
        aspect-ratio: 2/1;
        display: flex;
    }
    .B03 {
        width: 50%;
        position: relative;
        aspect-ratio: 1/1;
    }
    .WindVectorContainer {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .WindVector {
        width: 50%;
        height: same-as-width;
        margin: 25%;
        position: absolute;
        top: 0;
        left:0;
        padding: 0px;
    }
    .WindSpeed {
        width: 50%;
        height: 20%;
        margin-top: 25%;
        margin-right: 25%;
        margin-left: 25%;
        margin-top: 40%;
        margin-bottom: 40%;
        position: absolute;
        z-index: 9;
        top: 0;
        left: 0;
    }
    .C01 {
        display: flex;
        flex-direction: column;
        width: 60%;
        margin-left: 20%;
        margin-right: 20%;
    }
    .C02 {
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
    }    
    .C03_Container {
        display: flex;
        flex-direction: column;
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 0px;
    }
    .C03_Item {
        margin: 0.5cap;
    }
    .wind_sus {
        font-size: 3cqw;
        margin: 0px;
    }
    .wind_gus {
        font-size: 2cqw;
    }
}



</style>