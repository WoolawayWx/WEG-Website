<template>
    <div class="desktop:w-[80%] desktop:ml-[10%] desktop:mr-[10%] mobile:w-[100%]">
        <h1>Today's Forecast Plotted</h1>
        <p>Data is from the NDFD by NOAA.</p>
        <imageDis
            ImageURL="https://storage.cloud.google.com/weather-emergency-group-6a7c0.appspot.com/public/images/map_temp.png" />
        <imageDis ImageURL="https://storage.cloud.google.com/weather-emergency-group-6a7c0.appspot.com/public/images/map_winds.png"/>
        <imageDis ImageURL="https://storage.cloud.google.com/weather-emergency-group-6a7c0.appspot.com/public/images/map_windgusts.png"/>
        <p class="text-black"><i>Images are property of WoolawayWx, and should be credited as such. Distribution without credit will result in a copyright notice.</i></p>
    </div>

</template>

<script setup>
    import imageDis from '@/components/_templates/imageDis.vue';
</script>