<template>
    <h1>NWS Alerts</h1>
    <h3>{{ title }}</h3>
    <p>{{ Feed }}</p>
    <div v-if="alert1">
        <h3>{{ alert1title }}</h3>
        <p>{{ alert1body }}</p>
    </div>
    <div v-if="alert2">
        <h3>{{ alert1title }}</h3>
        <p>{{ alert1body }}</p>
    </div>
</template>

<script>


export default {
    name: "NWSAlertsPage",
    data() {
        return{
            Feed: "",
            title:"",
            alertcount: [],
            alert1: "",
            alert2: "",
            alert3: "",
            alert4: "",
            alert5: "",
            alert6: "",
            alert7: "",
            alert1value: [],
            alert1title:"",
            alert1body:"",
            alert2title:"",
            alert2body:"",
        }
    },
    methods: {
        getAlerts_Barry() {
            fetch("https://api.weather.gov/alerts/active/zone/MOC009")
            .then(res=>{
                return res.json();
            })
            .then(data=>{
                // console.log(data)
                this.title = data.title
                console.log(data.features)
                this.alertcount = data.features.length
                if(this.alertcount>0) {
                    this.alert1 = "true"
                    this.alert1title = data.features[0].properties.event
                    this.alert1body = data.features[0].properties.headline
                    
                }
                if(this.alertcount>1) {
                    this.alert2 = "true"
                    this.alert2title = data.features[1].properties.event
                    this.alert2body = data.features[1].properties.headline
                    
                }
            })
        }
    },
    mounted() {
        this.getAlerts_Barry()
    }
}

</script>

<style>


</style>