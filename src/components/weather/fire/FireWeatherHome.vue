<template>
    <h1>Fire Weather</h1>
    <div class="desBox">
        <p class="normaltext">This is the fire danger risk assessment provided by the USGS, utilizing a different scale than that employed by the Bureau of Land Management and my personal preference. It primarily considers the risk of fire spread rather than merely the potential for igniting objects. It's important to note that this assessment is based on Wildland fire danger calculations, which are utilized on this site for real-time fire danger evaluations.</p>
        <h2 class="header2">Day 1 Fire Danger</h2>
        <p class="normaltext"><a :href="url">Credit to USGS for the images</a></p>
        <img class="firedangerimg" :src="url"/>
        <h2 class="header2">Day 2 Fire Danger</h2>
        <img class="firedangerimg" :src="url_day2"/>
        <h2 class="header2">Day 3 Fire Danger</h2>
        <img class="firedangerimg" :src="url_day3"/>
        <!-- <button @click="window.location.href=url">Click here for full image</button> -->
    </div>
</template>

<style>
.header2 {
    font-size: 2vw;
}
.firedangerimg{
    width: 100%;
}
.normaltext{
    font-size: 2vw;
}
.desBox{
    width: 85%;
    text-align: center;
    align-items: center;
    margin-left: 7.5%;
    margin-right: 7.5%;
}

</style>

<script>

export default {
    name: 'FireWeather',
    components: {
    },
    data () {
        return{
            WFPI_URL:"https://edcintl.cr.usgs.gov/downloads/sciweb1/shared/firedanger/web/conus/daily/emodis/wfpi-forecast-1/graphics/conus-daily-emodis-wfpi-forecast-1_20231005.png",
            day: "",
            month:"",
            year:"",
            url:"",
            url_day2:"",
            url_day3:"",
        }
    },
    methods:{
        getDate:function () {
            const dt = new Date()
            var day = dt.getDate(2)
            if(day<10) {
                day="0"+day
            }
            this.day = day
            var year = dt.getFullYear()
            var month = dt.getMonth()
            month = month+1
            if(month<10) {
                month="0"+month
            }
            this.month = month
            this.year = year
            // Build the URL
            var Part1 = "https://edcintl.cr.usgs.gov/downloads/sciweb1/shared/firedanger/web/conus/daily/emodis/wfpi-forecast-1/graphics/conus-daily-emodis-wfpi-forecast-1_"
            var Part2 = ".png"
            var URLDATE = String(year)+String(month)+String(day)
            var URL = Part1 + URLDATE + Part2
            this.url = URL
            // Build for Day 2
            const dt2 = new Date()
            dt2.setDate(dt2.getDate()+1)
            console.log(dt2)
            var day2 = dt2.getDate()
            if(day2<10) {
                day2="0"+day2
            }
            console.log(day2)
            var month2 = dt2.getMonth()
            month2 = month2 + 1
            if(month2<10) {
                month2="0"+month2
            }
            var year2 = dt2.getFullYear()
            var Part1_Day2 = "https://edcintl.cr.usgs.gov/downloads/sciweb1/shared/firedanger/web/conus/daily/emodis/wfpi-forecast-2/graphics/conus-daily-emodis-wfpi-forecast-2_"
            var URLDATE2 = String(year2)+String(month2)+String(day2)
            var URL2 = Part1_Day2 + URLDATE2 + Part2
            this.url_day2 = URL2
            console.log(this.url_day2)
            // Build for Day 3
            const dt3 = new Date()
            dt3.setDate(dt3.getDate()+2)
            var day3 = dt3.getDate()
            if(day3<10) {
                day3="0"+day3
            }
            console.log(day3)
            var month3 = dt3.getMonth()
            month3 = month3 + 1
            if(month3<10) {
                month3="0"+month3
            }
            var year3 = dt3.getFullYear()
            var Part1_Day3 = "https://edcintl.cr.usgs.gov/downloads/sciweb1/shared/firedanger/web/conus/daily/emodis/wfpi-forecast-3/graphics/conus-daily-emodis-wfpi-forecast-3_"
            var URLDATE3 = String(year3)+String(month3)+String(day3)
            var URL3 = Part1_Day3 + URLDATE3 + Part2
            this.url_day3 = URL3
        }
    },
    mounted() {
        this.getDate()
    }

}

</script>