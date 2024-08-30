<template>
    <div class="desktop:w-[80%] desktop:ml-[10%] desktop:mr-[10%] mobile:w-[90%] mobile:ml-[5%] mobile:mr-[5%]">
        <h1>Today's Forecast Plotted</h1>
        <p>Data is from the NDFD by NOAA.</p>
        <imageDis ImageURL="https://rxvuigbyexdarrlusojh.supabase.co/storage/v1/object/public/weg_public/webimgs/forecast_maps/map_temp.jpg" />
        <imageDis ImageURL="https://rxvuigbyexdarrlusojh.supabase.co/storage/v1/object/public/weg_public/webimgs/forecast_maps/map_winds.jpg" />
        <imageDis ImageURL="https://rxvuigbyexdarrlusojh.supabase.co/storage/v1/object/public/weg_public/webimgs/forecast_maps/map_windgusts.jpg" />
        <p class="text-black"><i>Images are property of WoolawayWx, and should be credited as such. Distribution without credit will result in a copyright notice.</i></p>
    </div>

</template>

<script setup>
    import imageDis from '@/components/_templates/imageDis.vue';
</script>