<template>
    <div>
        <h2>
            Drought Weather Infomation Page
        </h2>
        <p>
            This page displays the latest infomaiton regarding drought weather for members of WEG.
        </p>
        <h3>Latest Update: {{ month }}/{{ date }}/{{ year }}</h3>
        <p>Map is updated on Tuesday Mornings, but will not be public till Thursday Mornings.</p>
        <div class="images">
            <div class="single">
                <h3 class="text">Map With Legend</h3>
                <img class="droughtmapimage" :src="MapURL">
            </div>
            <div class="single">
                <h3 class="text">Map Without Legend</h3>
                <img class="droughtmapimage" :src="MapURL_NoLeg">
            </div>
            <div class="single">
                <h3 class="text">Map With Stats Table</h3>
                <img class="droughtmapimage" :src="MapURL_Tab">
            </div>
        </div>
        <h3>You can acess the U.S. Drought Monitor Here: <a href="https://droughtmonitor.unl.edu/CurrentMap/StateDroughtMonitor.aspx?MO">Click here to view the U.S. Drought Monitor</a></h3>
    </div>
</template>
<script setup>
import { useHead } from '@unhead/vue'
useHead({
  title: 'Drought',
  
})
</script>
<script>

export default {
    name: 'DroughtWeather',
    components: {
    },
    data() {
        return{
            date: "",
            day: "",
            fulldate:"",
            pastdays: "",
            month: "",
            year: "",
            MapURL: "",
            MapURL_NoLeg: "",
            MapURL_Tab: ""
        }
    },
    methods:{
        findDate:function () {
            const d= new Date()
            if(d.getDay() == 0) {
                this.day="Sunday"
                this.pastdays = 5
            } else if(d.getDay() == 1) {
                this.day="Monday"
                this.pastdays = 6
            } else if(d.getDay() == 2) {
                this.day="Tuesday"
                this.pastdays = 7
            } else if(d.getDay() == 3) {
                this.day="Wednesday"
                this.pastdays = 8
            } else if(d.getDay() == 4) {
                this.day="Thursday"
                this.pastdays = 2
            } else if(d.getDay() == 5) {
                this.day="Friday"
                this.pastdays = 3
            } else if(d.getDay() == 6) {
                this.day="Saturday"
                this.pastdays = 4
            }
            
            var b = new Date()
            b.setDate(d.getDate()- this.pastdays)
            this.month = b.getMonth()+1
            this.year = b.getFullYear()
            this.date = b.getDate()
            if(this.date<10){
                this.date = "0"+String(this.date)
            }
            // this.date = this.date - this.pastdays
            // https://droughtmonitor.unl.edu/data/png/20231017/20231017_mo_text.png
            this.MapURL = "https://droughtmonitor.unl.edu/data/png/"+String(this.year)+String(this.month)+String(this.date)+"/"+String(this.year)+String(this.month)+String(this.date)+"_mo_text.png"
            this.MapURL_NoLeg = "https://droughtmonitor.unl.edu/data/png/"+String(this.year)+String(this.month)+String(this.date)+"/"+String(this.year)+String(this.month)+String(this.date)+"_mo_none.png"
            this.MapURL_Tab = "https://droughtmonitor.unl.edu/data/png/"+String(this.year)+String(this.month)+String(this.date)+"/"+String(this.year)+String(this.month)+String(this.date)+"_mo_trd.png"
        }
    },
    mounted() {
        this.findDate()
    }
}
</script>

<style>
.images{
    width: 80%;
    display: flex;
    flex-direction: column;
    margin-left: 10%;
    margin-right: 10%;
}
.single{
    text-align: center;
}
.text{
    text-align: center;
}
.droughtmapimage{
    width: 100%;
}
</style>