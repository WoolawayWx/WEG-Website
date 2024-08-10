<template>
    <h1>
        Severe Weather Homepage
    </h1>
    <p>This page is to allow members to view severe weather resources quickly to save time.</p>
    <br>
    <p>The Severe Convective Outlooks are provided by the Storm Prediction Center.</p>
    <p>Please use the dropdowns to generate the outlook.</p>
    <select class="getcurrentweatherdrop" @change="StatevsCWA($event)">
        <option value="State">State</option>
        <option value="CWA">CWA</option>
    </select>
    <select class="getcurrentweatherdrop" @change="OutlookDayChange($event)">
        <option value="1">Day 1</option>
        <option value="2">Day 2</option>
        <option value="3">Day 3</option>
    </select>
    <select class="getcurrentweatherdrop" @change="statechange($event)">
        <option>State or WFO</option>
        <option v-show="areaMode=='State'" value="MO">Missouri</option>
        <option v-show="areaMode=='State'" value="AR">Arkansas</option>
        <option v-show="areaMode=='State'" value="OK">Oklahoma</option>
        <option v-show="areaMode=='CWA'" value="SGF">Springfield</option>
        <option v-show="areaMode=='CWA'" value="TSA">Tulsa</option>
        <option v-show="areaMode=='CWA'" value="LZK">Little Rock</option>
    </select>
    <div id="spc_day1outlook">
        <div  id="buttonrow">
            <button class="getcurrentweatherbutton" @click="showConvDay1()">Categorical</button>
            <button class="getcurrentweatherbutton" @click="showTorDay1()">Tornado</button>
            <button class="getcurrentweatherbutton" @click="showWindDay1()">Wind</button>
            <button class="getcurrentweatherbutton" @click="showHailDay1()">Hail</button>
        </div>
        <div class="imagedis">
            <img class="imagedis" :src="DisplayURL">
        </div>
    </div>
</template>

<script>

export default {
  name: 'SevereWeather',
  components: {
  },
  data () {
    return{
        OutlookDay: "1",
        convURL: [],
        ImageSelect: "",
        DisplayURL: "",
        State: "MO",
        StateBaseURL: "https://www.spc.noaa.gov/partners/outlooks/state/images/",
        CWABaseURL: "https://www.spc.noaa.gov/partners/outlooks/cwa/images/",
        areaMode: "State",
        BaseURL: "https://www.spc.noaa.gov/partners/outlooks/state/images/"
    }
  },
  methods: {
    StatevsCWA(event) {
        if(event.target.value == "CWA") {
            this.areaMode = "CWA"
            this.BaseURL = this.CWABaseURL
            console.log("Area Mode: CWA")
        } else if(event.target.value == "State") {
            this.areaMode = "State"
            this.BaseURL = this.StateBaseURL
            console.log("Area Mode: State")
        } else {
            console.log("Error in Area Mode")
        }
    },
    statechange(event) {
        this.State = event.target.value
    },
    OutlookDayChange(event) {
        this.OutlookDay = event.target.value
    },
    day1select(){
        this.OutlookDay = 'Day1'
        console.log(this.OutlookDay)
        this.convURL="https://www.spc.noaa.gov/public/state/images/MO_swody1.png"
    },
    day2select(){
        this.OutlookDay = 'Day2'
        console.log(this.OutlookDay)
    },
    day3select(){
        this.OutlookDay = 'Day3'
        console.log(this.OutlookDay)
    },
    showConvDay1(){
        this.DisplayURL=this.BaseURL+this.State+"_swody"+this.OutlookDay+".png"
    },
    showTorDay1(){
        this.DisplayURL=this.BaseURL+this.State+"_swody"+this.OutlookDay+"_TORN.png"
    },
    showWindDay1(){
        this.DisplayURL=this.BaseURL+this.State+"_swody"+this.OutlookDay+"_WIND.png"
    },
    showHailDay1(){
        this.DisplayURL=this.BaseURL+this.State+"_swody"+this.OutlookDay+"_HAIL.png"
    }
  },
  computed: {

  }
}
</script>

<style>
.imagedis {
    width: 85%;
    margin: auto;
}
.getcurrentweatherbutton:active {
        background-color: rgb(139, 26, 24);
    }
@media only screen and (max-width: 767px) {
    .getcurrentweatherbutton {
        background-color: rgba(255, 255, 255, 0);
        color: black;
        font-size: medium;
        margin: 2px;
        display: inline-block;
        padding: 5px;
        border: 2px solid black;
        text-decoration: none;
        width: 22.5%;
        height: 30px;
        font-size: 10px;
    }
    .getcurrentweatherdrop {
        background-color: rgba(255, 255, 255, 0);
        color: black;
        font-size: medium;
        margin: 2px;
        display: inline-block;
        padding: 5px, 2px;
        border: 2px solid black;
        text-decoration: none;
        width: 30%;
        height: 40px;
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
    .getcurrentweatherdrop {
        background-color: rgba(255, 255, 255, 0);
        color: black;
        font-size: medium;
        margin: 15px;
        display: inline-block;
        padding: 5px, 2px;
        border: 2px solid black;
        text-decoration: none;
        width: 150px;
        height: 40px;
    }
    
}
</style>