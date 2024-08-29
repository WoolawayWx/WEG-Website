<template>
    <h1>Fire Weather</h1>
    <div class="w-full flex desktop:flex-row mobile:flex-col">
        <div class="desktop:w-[20%] sticky">
            <panel1 HeaderValue="Quick Jump Menu">
                <p>USGS Fire Risk Map</p>
                <p>Fire Danger Calculator</p>
                <p>Fire Weather Stations</p>
            </panel1>
        </div>
        <div class="desktop:w-[80%]">
            <div class="flex desktop:flex-row mobile:flex-col w-full justify-center items-center">
                <img src="https://rxvuigbyexdarrlusojh.supabase.co/storage/v1/object/public/weg_public/webimgs/fire_danger_map.png?t=2024-08-25T20%3A40%3A09.797Z" class="w-[60%] mobile:w-full" />
                <imagedesc>
                    <h1 class="text-xl font-bold">Today's Fire Weather</h1>
                    <p class="text-md">Plotted map of forecasted fire weather based on wind gusts, ground moisture, and
                        minimal relative humidity values. This script is in active development to improve, so expect
                        errors and changes.</p>
                    <p class="text-lg italic">At the moment, the script is not automated and is only updated on days
                        with elevated fire weather possible.</p>
                </imagedesc>
            </div>
            <div>
                <imagedesc>
                    <h1 class="text-xl font-bold">USGS Fire Danger Maps</h1>
                    <p class="test-md">Click on image to display larger.</p>
                    <p class="text-lg italic">USGS maps are generally updated in the morning, around the 0900 - 1000 timespan.</p>
                </imagedesc>
            </div>
        </div>
    </div>
</template>

<script setup>
    import panel1 from '@/components/_panels/panel1.vue';
    import imagedesc from '@/components/_templates/imagedesc.vue';
    import { ref } from 'vue';
</script>