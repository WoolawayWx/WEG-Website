<template>
    <h1>Current Weather</h1>
    <p>Use the dropdown selectors below to chose the desired fire weather station and weather station to display current conditions.</p>
    <div id="SelectButtonArea">
        <select name="StationLocation" class="getcurrentweatherbutton" @change="wxstationupdate($event)">
            <option>Station Location</option>
            <option value='anderson'>Anderson</option>
            <option value='aurora'>Aurora</option>
            <option value='butterfield'>Butterfield</option>
            <option value='cassville'>Cassville</option>
            <option value='eaglerock'>Eagle Rock</option>
            <option value='exeter'>Exeter</option>
            <option value='granby'>Granby</option>
            <option value='jenkins'>Jenkins </option>
            <option value='monett'>Monett</option>
            <option value='neosho'>Neosho</option>
            <option value='pineville'>Pineville </option>
            <option value='pirececity'>Pirece City</option>
            <option value='purdy'>Purdy</option>
            <option value='seligman'>Seligman</option>
            <option value='shellknob'>Shell Knob</option>
            <option value='southwestcity'>Southwest City</option>
            <option value='stella'>Stella</option>
            <option value='washburn'>Washburn</option>
            <option value='wheaton'>Wheaton</option>
        </select>
        <select name="FireWxSelection" class="getcurrentweatherbutton" @change="firewxupdater($event)">
            <option>FireWx Location</option>
            <option value="CRWM7">Cassville</option>
            <option value="MVVM7">Mt.Vernon</option>
            <option value="TT530">Gateway</option>
            <option value="SPWM7">Springfield</option>
        </select>
        <button class="getcurrentweatherbutton" @click="weatherobs()" v-on:click="showcurrent=!showcurrent">Get Weather</button>
    </div>
    <div v-if="showcurrent" id="currentweatheratlocation" class="weatherobs">
        <h4>Current Observations</h4>
        <p>Location: {{ city_Cap }}</p>
        <p>Temperature: {{ TEMP }}°F |  Dew Point: {{ DEWPOINT }}°F</p>
        <p>Wind Speed: {{ WIND }} MPH from {{ WINDDIR }} | Gusts: {{ WINDGUSTS }} MPH</p>
        <p>Heat Index/Wind Chill: {{ HEATINDEX }}°F | Solar Radiation: {{ SOLAR }} W/M^2</p>
        <p>Relative Humidity: {{ RHUM }}% | Station Pressure: {{ PRESSURE }} MB</p>
        <p>24 Hour Rainfall: {{ RAINFALL24 }} IN | Today's Rainfall: {{ TODAYRAINFALL }} IN</p>
        <h4>Fire Weather</h4>
        <p>Fuel Moisture: {{ FuelMositure }} g per 100 g | Fuel Temperature: {{ FuelTemp }}°F</p>
        <p>Current Fire Danger Level: {{ RTFDTEXT }} ({{ RTFD }}/5)</p>
        <p><a href="https://www.fs.usda.gov/detail/inyo/home/?cid=stelprdb5173311">More infomation on Fire Danger Level</a></p>
        <div>
        <p>If any station values return with N/A, the station does not support the observation type.</p>

    </div>
    

    </div>
    <div>
        <!-- Credits -->
        <p>Weather observations aggregated by Synoptic Data</p>
        <img style="width: 15%;" src='@/assets/Synoptic.jpg'>
    </div>
</template>

<script>
export default {
    name: 'currentweather_obs',
    data() {
        return {
            TEMP: [],
            WIND: [],
            DEWPOINT: [],
            WINDDIR: [],
            WINDGUSTS: [],
            HEATINDEX: [],
            SOLAR: [],
            RHUM: [],
            PRESSURE: [],
            RAINFALL24: [],
            TODAYRAINFALL: [],
            FuelMositure: [],
            FuelTemp: [],
            stationID: "",
            RTFD: "",
            RTFDTEXT: "",
            showcurrent: false,
            StationLocation: "",

        }
    },
    methods: {
        wxstationupdate(event) {
            this.StationLocation = event.target.value
            return {
            }
        },
        firewxupdater(event) {
            this.FireWxLoc = event.target.value
            return {
            }
        },
        weatherobs() {
            sessionStorage.removeItem('stationID')
            if (this.StationLocation=="anderson") {
                this.city_lat = "36.6432"
                this.city_lon = "-94.4395"
                this.city_Cap = "Anderson"
                this.stationID = "AV446"
                // sessionStorage.setItem('city_lat', this.city_lat)
                // sessionStorage.setItem('city_lon', this.city_lon)
                // sessionStorage.setItem('city_Cap', this.city_Cap)
                // sessionStorage.setItem('stationID', this.stationID)
            } else if (this.StationLocation=="aurora") {
                this.city_lat="36.9654";
                this.city_lon="-93.7199";
                this.city_Cap="Aurora";
                this.stationID="AR487";
                // sessionStorage.setItem('city_Cap',this.city_Cap);
                // sessionStorage.setItem('city_lat',this.city_lat);
                // sessionStorage.setItem('city_lon',this.city_lon);
                // sessionStorage.setItem('stationID',this.stationID);
            } else if (this.StationLocation=="butterfield") {
                this.city_lat="36.7434";
                this.city_lon="-93.9108";
                this.city_Cap="Butterfield";
                this.stationID="F5451";
                // sessionStorage.setItem('city_Cap',this.city_Cap);
                // sessionStorage.setItem('city_lat',this.city_lat);
                // sessionStorage.setItem('city_lon',this.city_lon);
                // sessionStorage.setItem('stationID',this.stationID);
            }   else if (this.StationLocation=="cassville") {
                this.city_lat="36.6702";
                this.city_lon="-93.8676";
                this.city_Cap="Cassville";
                this.stationID="F5451";
                // sessionStorage.setItem('city_Cap',this.city_Cap);
                // sessionStorage.setItem('city_lat',this.city_lat);
                // sessionStorage.setItem('city_lon',this.city_lon);
                // sessionStorage.setItem('stationID',this.stationID);
            }   else if (this.StationLocation=="eaglerock") {
                this.city_lat="36.5638";
                this.city_lon="-93.7604";
                this.city_Cap="Eagle Rock";
                this.stationID="F5451";
                // sessionStorage.setItem('city_Cap',this.city_Cap);
                // sessionStorage.setItem('city_lat',this.city_lat);
                // sessionStorage.setItem('city_lon',this.city_lon);
                // sessionStorage.setItem('stationID',this.stationID);
            } else if (this.StationLocation=="exeter") {
                this.city_lat="36.6680";
                this.city_lon="-93.9390";
                this.city_Cap="Exeter";
                this.stationID="F5451";
                // sessionStorage.setItem('city_Cap',this.city_Cap);
                // sessionStorage.setItem('city_lat',this.city_lat);
                // sessionStorage.setItem('city_lon',this.city_lon);
                // sessionStorage.setItem('stationID',this.stationID);
            } else if (this.StationLocation=="granby") {
                this.city_lat="36.9155";
                this.city_lon="-94.2596";
                this.city_Cap="Granby";
                this.stationID="KHFJ";
                // sessionStorage.setItem('city_Cap',this.city_Cap);
                // sessionStorage.setItem('city_lat',this.city_lat);
                // sessionStorage.setItem('city_lon',this.city_lon);
                // sessionStorage.setItem('stationID',this.stationID);
            } else if (this.StationLocation=="jenkins") {
                this.city_lat="36.7742";
                this.city_lon="-93.6842";
                this.city_Cap="Jenkins";
                this.stationID="F5451";
                // sessionStorage.setItem('city_Cap',this.city_Cap);
                // sessionStorage.setItem('city_lat',this.city_lat);
                // sessionStorage.setItem('city_lon',this.city_lon);
                // sessionStorage.setItem('stationID',this.stationID);
            } else if (this.StationLocation=="monett") {
                this.city_lat="36.7742";
                this.city_lon="-93.6842";
                this.city_Cap="Monett";
                this.stationID="KHFJ";
                // sessionStorage.setItem('city_Cap',this.city_Cap);
                // sessionStorage.setItem('city_lat',this.city_lat);
                // sessionStorage.setItem('city_lon',this.city_lon);
                // sessionStorage.setItem('stationID',this.stationID);
            } else if (this.StationLocation=="neosho") {
                this.city_lat="36.8482";
                this.city_lon="-94.3812";
                this.city_Cap="Neosho";
                this.stationID="E4150";
                // sessionStorage.setItem('city_Cap',this.city_Cap);
                // sessionStorage.setItem('city_lat',this.city_lat);
                // sessionStorage.setItem('city_lon',this.city_lon);
                // sessionStorage.setItem('stationID',this.stationID);
            } else if (this.StationLocation=="pineville") {
                this.city_lat="36.5889";
                this.city_lon="-94.3873";
                this.city_Cap="Pineville";
                this.stationID="AV446";
                // sessionStorage.setItem('city_Cap',this.city_Cap);
                // sessionStorage.setItem('city_lat',this.city_lat);
                // sessionStorage.setItem('city_lon',this.city_lon);
                // sessionStorage.setItem('stationID',this.stationID);
            } else if (this.StationLocation=="pirececity") {
                this.city_lat="36.9494";
                this.city_lon="-94.0035";
                this.city_Cap="Pirece City";
                this.stationID="KHFJ";
                // sessionStorage.setItem('city_Cap',this.city_Cap);
                // sessionStorage.setItem('city_lat',this.city_lat);
                // sessionStorage.setItem('city_lon',this.city_lon);
                // sessionStorage.setItem('stationID',this.stationID);
            } else if (this.StationLocation=="purdy") {
                this.city_lat="36.8135";
                this.city_lon="-93.9225";
                this.city_Cap="Purdy";
                this.stationID="KHFJ";
                // sessionStorage.setItem('city_Cap',this.city_Cap);
                // sessionStorage.setItem('city_lat',this.city_lat);
                // sessionStorage.setItem('city_lon',this.city_lon);
                // sessionStorage.setItem('stationID',this.stationID);
            } else if (this.StationLocation=="seligman") {
                this.city_lat="36.5212";
                this.city_lon="-93.9379";
                this.city_Cap="Seligman";
                this.stationID="F5451";
                // sessionStorage.setItem('city_Cap',this.city_Cap);
                // sessionStorage.setItem('city_lat',this.city_lat);
                // sessionStorage.setItem('city_lon',this.city_lon);
                // sessionStorage.setItem('stationID',this.stationID);
            } else if (this.StationLocation=="washburn") {
                this.city_lat="36.5818";
                this.city_lon="-93.9668";
                this.city_Cap="Washburn";
                this.stationID="F5451";
                // sessionStorage.setItem('city_Cap',this.city_Cap);
                // sessionStorage.setItem('city_lat',this.city_lat);
                // sessionStorage.setItem('city_lon',this.city_lon);
                // sessionStorage.setItem('stationID',this.stationID);
            } else if (this.StationLocation=="shellknob") {
                this.city_lat="36.6205";
                this.city_lon="-93.6227";
                this.city_Cap="Shell Knob";
                this.stationID="F3232";
                // sessionStorage.setItem('city_Cap',this.city_Cap);
                // sessionStorage.setItem('city_lat',this.city_lat);
                // sessionStorage.setItem('city_lon',this.city_lon);
                // sessionStorage.setItem('stationID',this.stationID);
            } else if (this.StationLocation=="southwestcity") {
                this.city_lat="36.5130";
                this.city_lon="-94.6115";
                this.city_Cap="Southwest City";
                this.stationID="AV446";
                // sessionStorage.setItem('city_Cap',this.city_Cap);
                // sessionStorage.setItem('city_lat',this.city_lat);
                // sessionStorage.setItem('city_lon',this.city_lon);
                // sessionStorage.setItem('stationID',this.stationID);
            } else if (this.StationLocation=="stella") {
                this.city_lat="36.7560";
                this.city_lon="-94.1906";
                this.city_Cap="Stella";
                this.stationID="F6791";
                // sessionStorage.setItem('city_Cap',this.city_Cap);
                // sessionStorage.setItem('city_lat',this.city_lat);
                // sessionStorage.setItem('city_lon',this.city_lon);
                // sessionStorage.setItem('stationID',this.stationID);
            } else if (this.StationLocation=="wheaton") {
                this.city_lat="36.7587";
                this.city_lon="-94.0533";
                this.city_Cap="Wheaton";
                this.stationID="F6791";
                // sessionStorage.setItem('city_Cap',this.city_Cap);
                // sessionStorage.setItem('city_lat',this.city_lat);
                // sessionStorage.setItem('city_lon',this.city_lon);
                // sessionStorage.setItem('stationID',this.stationID);
            }
            if (this.FireWxLoc)

            this.StationURL= "https://api.synopticdata.com/v2/stations/latest?&stid="+(this.stationID)+"&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708"
            fetch(this.StationURL)
        .then(res=>{
            return res.json();
        })
        .then(data=> {
            console.log(this.StationURL)
            {this.TEMP = data.STATION[0].OBSERVATIONS.air_temp_value_1.value}
            sessionStorage.setItem('this.TEMP',this.TEMP)
            {this.WIND = data.STATION[0].OBSERVATIONS.wind_speed_value_1.value}
            sessionStorage.setItem('this.WIND',this.WIND)
            {this.DEWPOINT = data.STATION[0].OBSERVATIONS.dew_point_temperature_value_1d.value}
            {this.WINDDIR = data.STATION[0].OBSERVATIONS.wind_cardinal_direction_value_1d.value}
            {this.WINDGUSTS = data.STATION[0].OBSERVATIONS.wind_gust_value_1.value}
            {this.RHUM = data.STATION[0].OBSERVATIONS.relative_humidity_value_1.value}
            sessionStorage.setItem('this.RHUM',this.RHUM)
            {this.PRESSURE = data.STATION[0].OBSERVATIONS.pressure_value_1d.value}
            if ("precip_accum_since_local_midnight_value_1"in(data.STATION[0].OBSERVATIONS)) {
                {this.TODAYRAINFALL = data.STATION[0].OBSERVATIONS.precip_accum_since_local_midnight_value_1.value}
                } else {
                    {this.TODAYRAINFALL= "N/A"}
                }
            if ("precip_accum_24_hour_value_1"in(data.STATION[0].OBSERVATIONS)) {
                {this.RAINFALL24 = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value}
                } else {
                    {this.RAINFALL24= "N/A"}
                }
            if ("heat_index_value_1d"in(data.STATION[0].OBSERVATIONS)) {
                {this.HEATINDEX = data.STATION[0].OBSERVATIONS.heat_index_value_1d.value}
                } else {
                    {this.HEATINDEX= "N/A"}
                }
            if ("solar_radiation_value_1"in(data.STATION[0].OBSERVATIONS)) {
                {this.SOLAR = data.STATION[0].OBSERVATIONS.solar_radiation_value_1.value}
                } else {
                    {this.SOLAR= "N/A"}
                }
        })
            this.FireWxURL = "https://api.synopticdata.com/v2/stations/latest?&stid="+(this.FireWxLoc)+"&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708"
            fetch(this.FireWxURL)
            .then(res=>{
                return res.json();
            })
            .then(data=>{
                {this.FuelMositure = data.STATION[0].OBSERVATIONS.fuel_moisture_value_1.value}
                sessionStorage.setItem('this.FuelMoisture',this.FuelMositure)
                {this.FuelTemp = data.STATION[0].OBSERVATIONS.fuel_temp_value_1.value}

            })
            //Real Time Fire Danger
            this.RTFD = "0"
            parseInt(this.RTFD).toFixed(2)
            this.TEMP = sessionStorage.getItem('this.TEMP')
            this.FuelMositure = sessionStorage.getItem('this.FuelMoisture')
            this.WIND = sessionStorage.getItem('this.WIND')
            this.RHUM = sessionStorage.getItem('this.RHUM')
            if (this.TEMP>90) {
                this.RTFD = Number(this.RTFD)+Number(0.5)
            } else if (this.TEMP>80) {
             this.RTFD = Number(this.RTFD)+Number(0.4)
            } else if (this.TEMP>70) {
             this.RTFD = Number(this.RTFD)+Number(0.3)
            } else if (this.TEMP>60) {
             this.RTFD = Number(this.RTFD)+Number(0.2)
            } else if (this.TEMP>50) {
             this.RTFD = Number(this.RTFD)+Number(0.1)
            } else {
                this.RTFD = Number(this.RTFD)+Number(0.0)
            }
            if (this.RHUM>0) {
                this.RHUM = Number(this.RHUM)-Number(1)
                this.RHUM = Math.abs(this.RHUM)
                this.RHUM = Number(this.RHUM / '-80')
                this.RTFD = Number(Math.abs(this.RHUM))+Number(this.RTFD)
                console.log(this.RHUM)
            } else {
                this.RTFD = Number(this.RTFD)+Number(0.0)
            }
            console.log(this.RTFD)
            if (this.WIND>0) {
                this.RTFD = Number(this.WIND / '20')+Number(this.RTFD)
            } else {
                this.RTFD = Number(this.RTFD)+Number(0.0)
            }
            if (this.FuelMositure<10) {
                this.FuelMositure = Number(Math.abs(Number(this.FuelMositure) - '10'))
                this.RTFD = Number(this.FuelMositure / '10')+ Number(this.RTFD)
            } else {
                this.RTFD = Number(this.RTFD)+Number(0.0)
            }
            if (this.RTFD<1.75) {
                this.RTFDTEXT = "Low"
            } else if (this.RTFD<2) {
                this.RTFDTEXT = "Moderate"
            } else if (this.RTFD<2.25) {
                this.RTFDTEXT = "High"
            } else if (this.RTFD<3) {
                this.RTFDTEXT = "Very High"
            } else if (this.RTFD<3.75) {
                this.RTFDTEXT = "Extreme"
            } else {
                this.RTFDTEXT = "Error"
            }

        }
            
    },
    mounted() {

    }
}
</script>

<style>

@media only screen and (max-width: 767px) {
    .getcurrentweatherbutton {
        background-color: rgba(255, 255, 255, 0);
        color: black;
        font-size: medium;
        margin: 15px;
        display: inline-block;
        padding: 5px;
        border: 2px solid black;
        text-decoration: none;
        width: 80px;
        height: 25px;
        font-size: 10px;
    }
    .weatherobs {
        width: 95%;
        word-break: keep-all;
        margin: auto;
        font-size: 13px;
    }
    h1 {
        font-size: 20px;
        text-align: center;
        margin: auto;
    }
    
}
@media only screen and (min-width: 768px) {
    .getcurrentweatherbutton {
        background-color: rgba(255, 255, 255, 0);
        color: black;
        font-size: medium;
        margin: 15px;
        display: inline-block;
        padding: 5px;
        border: 2px solid black;
        text-decoration: none;
        width: 150px;
        height: 40px;
    }
    
}
.getcurrentweatherbutton:hover {
    background-color: black;
    color: white;
}
</style>