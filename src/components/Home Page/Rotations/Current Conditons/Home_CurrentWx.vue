<template>
    <div class="Desktop">
        <div class="Current-Main">
            <div class="Current-Item" v-if="activeData">
                <h3>{{ Location1Name[0] }}</h3>
                <p>{{ Location1Name[1] }}℉</p>
                <p>{{ Location1Name[2] }} MPH from {{ Location1Name[3] }}</p>
                <p>{{ Location1Name[4] }} IN</p>

            </div>
            <div class="Current-Item" v-if="activeData">
                <h3>{{ Location2Name[0] }}</h3>
                <p>{{ Location2Name[1] }}℉</p>
                <p>{{ Location2Name[2] }} MPH from {{ Location2Name[3] }}</p>
                <p>{{ Location2Name[4] }} IN</p>
                
            </div>
            <div class="Current-Item" v-if="activeData">
                <h3>{{ Location3Name[0] }}</h3>
                <p>{{ Location3Name[1] }}℉</p>
                <p>{{ Location3Name[2] }} MPH from {{ Location2Name[3] }}</p>
                <p>{{ Location3Name[4] }} IN</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
let Location1Name = ref("")
let Location2Name = ref("")
let Location3Name = ref("")
let Cassville = new Array()
let RockyComfort = new Array()
let Wheaton = new Array()
let ShellKnob = new Array()
let Republic = new Array()
let Joplin = new Array()
let Neosho = new Array()
let Rogers = new Array()
let Noel = new Array() //AV446
let activeData = ref("")
async function rotation() {
    activeData.value = false
    fetch("https://api.synopticdata.com/v2/stations/latest?&stid=F5451&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708")
    .then(res=>{ return res.json();}).then(data=> {
            Cassville[0] = "Cassville";
            Cassville[1] = data.STATION[0].OBSERVATIONS.air_temp_value_1.value
            Cassville[2] = data.STATION[0].OBSERVATIONS.wind_speed_value_1.value
            Cassville[3] = data.STATION[0].OBSERVATIONS.wind_cardinal_direction_value_1d.value
            Cassville[4] = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value
          })
    fetch("https://api.synopticdata.com/v2/stations/latest?&stid=C4438&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708")
    .then(res=>{ return res.json();}).then(data=> {
            Rogers[0] = "Rogers";
            Rogers[1] = data.STATION[0].OBSERVATIONS.air_temp_value_1.value
            Rogers[2] = (data.STATION[0].OBSERVATIONS.wind_speed_value_1.value)
            Rogers[3] = data.STATION[0].OBSERVATIONS.wind_cardinal_direction_value_1d.value
            Rogers[4] = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value
          })
    fetch("https://api.synopticdata.com/v2/stations/latest?&stid=F6791&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708")
    .then(res=>{ return res.json();}).then(data=> {
            RockyComfort[0] = "Rocky Comfort";
            RockyComfort[1] = data.STATION[0].OBSERVATIONS.air_temp_value_1.value
            RockyComfort[2] = data.STATION[0].OBSERVATIONS.wind_speed_value_1.value
            RockyComfort[3] = data.STATION[0].OBSERVATIONS.wind_cardinal_direction_value_1d.value
            RockyComfort[4] = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value
    })
    fetch("https://api.synopticdata.com/v2/stations/latest?&stid=F3232&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708")
    .then(res=>{ return res.json();}).then(data=> {
            ShellKnob[0] = "Shell Knob";
            ShellKnob[1] = data.STATION[0].OBSERVATIONS.air_temp_value_1.value
            ShellKnob[2] = data.STATION[0].OBSERVATIONS.wind_speed_value_1.value
            ShellKnob[3] = data.STATION[0].OBSERVATIONS.wind_cardinal_direction_value_1d.value
            ShellKnob[4] = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value
    })
    fetch("https://api.synopticdata.com/v2/stations/latest?&stid=E4150&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708")
    .then(res=>{ return res.json();}).then(data=> {
            Neosho[0] = "Neosho";
            Neosho[1] = data.STATION[0].OBSERVATIONS.air_temp_value_1.value
            Neosho[2] = data.STATION[0].OBSERVATIONS.wind_speed_value_1.value
            Neosho[3] = data.STATION[0].OBSERVATIONS.wind_cardinal_direction_value_1d.value
            Neosho[4] = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value
    })
    fetch("https://api.synopticdata.com/v2/stations/latest?&stid=F8147&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708")
    .then(res=>{ return res.json();}).then(data=> {
            Republic[0] = "Republic";
            Republic[1] = data.STATION[0].OBSERVATIONS.air_temp_value_1.value
            Republic[2] = data.STATION[0].OBSERVATIONS.wind_speed_value_1.value
            Republic[3] = data.STATION[0].OBSERVATIONS.wind_cardinal_direction_value_1d.value
            Republic[4] = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value
    })
    fetch("https://api.synopticdata.com/v2/stations/latest?&stid=G1463&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708")
    .then(res=>{ return res.json();}).then(data=> {
            Joplin[0] = "Joplin";
            Joplin[1] = data.STATION[0].OBSERVATIONS.air_temp_value_1.value
            Joplin[2] = data.STATION[0].OBSERVATIONS.wind_speed_value_1.value
            Joplin[3] = data.STATION[0].OBSERVATIONS.wind_cardinal_direction_value_1d.value
            Joplin[4] = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value
    })
    fetch("https://api.synopticdata.com/v2/stations/latest?&stid=E5044&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708")
    .then(res=>{ return res.json();}).then(data=> {
            Wheaton[0] = "Wheaton";
            Wheaton[1] = data.STATION[0].OBSERVATIONS.air_temp_value_1.value
            Wheaton[2] = data.STATION[0].OBSERVATIONS.wind_speed_value_1.value
            Wheaton[3] = data.STATION[0].OBSERVATIONS.wind_cardinal_direction_value_1d.value
            Wheaton[4] = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value
    })
    fetch("https://api.synopticdata.com/v2/stations/latest?&stid=E5044&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708")
    .then(res=>{ return res.json();}).then(data=> {
            Noel[0] = "Noel";
            Noel[1] = data.STATION[0].OBSERVATIONS.air_temp_value_1.value
            Noel[2] = data.STATION[0].OBSERVATIONS.wind_speed_value_1.value
            Noel[3] = data.STATION[0].OBSERVATIONS.wind_cardinal_direction_value_1d.value
            Noel[4] = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value
    })
    await sleep(2000)
    activeData.value = true
    for(let i = 0; i < 4; i++) {
        if(i == 0) {
            Location1Name.value = RockyComfort
            Location2Name.value = ShellKnob
            Location3Name.value = Neosho
            await sleep(10000)
        } else if (i == 1) {
            Location1Name.value = Cassville
            Location2Name.value = Republic
            Location3Name.value = Joplin
            await sleep(10000)
        } else if (i==2) {
            Location1Name.value = Wheaton
            Location2Name.value = Noel
            Location3Name.value = Rogers
            await sleep(10000)
        } else {
            i=0
        }
    }
    
}
function sleep(ms) {     return new Promise(resolve => setTimeout(resolve, ms)); }

onMounted(() => {
    rotation()
})
</script>

<style scoped>
@media (min-width: 768px) {
    .Desktop {
        display: block;
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;

    }
    .Current-Main {
        display: flex;
        flex-direction: row;
        width: 100%;
        margin: 0px;
        border: 0.2cqw solid black;
    }
    .Current-Item {
        width: 33%;
        aspect-ratio: 2/1;
        animation: fade 10s linear infinite;
    }
}
@media (max-width: 768px) {
    .Desktop {
        display: block;
        width: 100%;

    }
    .Current-Main {
        display: flex;
        flex-direction: row;
        width: 100%;
        margin: 0px;
        border: 0.2cqw solid black;
    }
    .Current-Item {
        width: 33%;
        aspect-ratio: 2/1;
        animation: fade 10s linear infinite;
    }
    .Current-Item h3 {
        font-size: 4cqw;
    }
    .Current-Item p {
        font-size: 3cqw;
    }
}
@keyframes fade {
    0% {
        opacity: 0%;
        transform: scale(0%)
    }
    10% {
        opacity: 100%;
        transform: scale(100%)
    }
    90% {
        opacity: 100%;
        transform: scale(100%)
    }
    100% {
        opacity: 0%;
        transform: scale(0%)
    }
    
}

</style>