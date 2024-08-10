<template>
    <p>Getting AFDs</p>
</template>

<script setup>
import { onMounted } from 'vue';

function getAFD() {
    fetch("https://api.weather.gov/products/types/AFD/locations/SGF")
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        console.log(data["@graph"][0]["@id"])
    })
}

onMounted(() =>{
    getAFD()
})
</script>