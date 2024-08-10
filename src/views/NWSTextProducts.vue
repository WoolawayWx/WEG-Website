<template>
    <h1>NWS Text Products</h1>
    <p>Hazardous Weather Outlook</p>
    <p>{{ issuedTime }}</p>
    <p>{{ publishedDateMonth }}/{{ publishedDateDay }}/{{ publishedDateYear }} at {{ publishedHour }}:{{ publishedMin }}</p>
</template>

<script>
// import {Temporal} from "@js-temporal/polyfill";
import moment from 'moment';

export default {
    name: "NWSTextProducts",
    data() {
        return {
            product_id: "",
            issuedTime: "",
            publishedDate: "",
        }
    },
    methods: {
        getProduct_ID() {
            fetch("https://mesonet.agron.iastate.edu/api/1/nws/afos/list.json?pil=HWOSgF")
            .then(res =>{
                return res.json();
            })
            .then(data=>{
                console.log(data)
            })
        }
    },
    mounted() {
        console.clear()
        fetch("https://mesonet.agron.iastate.edu/api/1/nws/afos/list.json?pil=HWOSgF")
            .then(res =>{
                return res.json();
            })
            .then(data=>{
                // console.log(data)
                // console.log(data.data[0])
                this.product_id = (data.data[0].product_id)
                this.issuedTime = (data.data[0].entered)
                this.publishedDateYear = moment(this.issuedTime).format("YYYY")
                this.publishedDateMonth = moment(this.issuedTime).format("MM")
                this.publishedDateDay = Number(moment(this.issuedTime).format("DD"))+(1)
                this.publishedHour =moment(this.issuedTime).format("hh")
                this.publishedMin =moment(this.issuedTime).format("mm")
            })
    }
}

</script>

<style>

</style>