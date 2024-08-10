<script>
    import HumidMapDisplay from '@/components/maps/HomepageMap_Humid.vue';
    import TempMapDisplay from '@/components/maps/HomepageMap_Temp.vue';
    import RainfallMapDisplay from '@/components/maps/HomepageMap_Rainfall.vue';
    import WeatherTable from '@/components/maps/HomepageMap_Table.vue';
    import TestMap from '@/components/maps/Homepage/TestMap.vue';

    export default {
        name: 'HomepageBody',
        components: {
            HumidMapDisplay,
            TempMapDisplay,
            RainfallMapDisplay,
            WeatherTable,
            TestMap,
        },
        data() {
            return {
                services: true,
                activeImgMO: '',
                imageNumber: 0,
                imageStoreMO: [
                    'https://www.spc.noaa.gov/partners/outlooks/state/images/MO_swody1.png',
                    'https://www.spc.noaa.gov/partners/outlooks/state/images/MO_swody1_TORN.png',
                    'https://www.spc.noaa.gov/partners/outlooks/state/images/MO_swody1_WIND.png',
                    'https://www.spc.noaa.gov/partners/outlooks/state/images/MO_swody1_HAIL.png',
                    'https://www.spc.noaa.gov/partners/outlooks/state/images/MO_fwody1.png',
                ],
                activeImgAR: '',
                imageStoreAR: [
                    'https://www.spc.noaa.gov/partners/outlooks/state/images/AR_swody1.png',
                    'https://www.spc.noaa.gov/partners/outlooks/state/images/AR_swody1_TORN.png',
                    'https://www.spc.noaa.gov/partners/outlooks/state/images/AR_swody1_WIND.png',
                    'https://www.spc.noaa.gov/partners/outlooks/state/images/AR_swody1_HAIL.png',
                    'https://www.spc.noaa.gov/partners/outlooks/state/images/AR_fwody1.png',
                ],
                imageStoreOK: [
                    'https://www.spc.noaa.gov/partners/outlooks/state/images/OK_swody1.png',
                    'https://www.spc.noaa.gov/partners/outlooks/state/images/OK_swody1_TORN.png',
                    'https://www.spc.noaa.gov/partners/outlooks/state/images/OK_swody1_WIND.png',
                    'https://www.spc.noaa.gov/partners/outlooks/state/images/OK_swody1_HAIL.png',
                    'https://www.spc.noaa.gov/partners/outlooks/state/images/OK_fwody1.png',
                ],
                activeImgOK: '',
                stationID: '',
                currentMap: 'TempMap',
            };
        },
        methods: {
            showMap(mapType) {
                this.currentMap = mapType;
            },
        },
    };
</script>

<template>
    <div id="homepage-body">
        <h2>Welcome to Weather Emergency Group</h2>
        <p>
            Weather Emergency Group is a specialized group for first responders and
            public safety entities in Southwest Missouri, Northeast Oklahoma, and
            Northwest Arkansas. WEG (Weather Emergency Group for short) is privately
            operated by Cade Woolaway of WoolawayWx. WEG has a simple mission
            statement, and that's to "Protect life and Property". This is
            accomplished in a way that many agencies do not have access to as a
            student meteorologist is actively communicating and talking to department
            members across the area, talking about fire weather, winter weather,
            severe weather, along with a multitude of many other aspects that affect
            emergency services. If you are interested in more information, please
            visit the about us page.
        </p>
        <p>Hello</p>
        <div class="servicelist" id="services">
            <h3 @click="services = !services">Services that are a part of WEG</h3>
            <div v-if="services">
                <ul>
                    <li>Fire Weather Resources and Forecasting</li>
                    <li>Severe Weather Forecasting, Monitoring, and Analysis</li>
                    <li>Winter Weather Forecasting and Monitoring</li>
                    <li>Flood Monitoring</li>
                    <li>Reporting</li>
                    <li>Communication with other members and departments</li>
                    <li>Meteorological insight from a University of Oklahoma Student Meteorologist</li>
                    <li>Event Response and Analysis</li>
                    <li>Graphic Design</li>
                    <li>Special Request</li>
                </ul>
            </div>
        </div>
        <br>
        <div>
            <h3>Quick overview of current Weather Conditions</h3>
            <div class="map-buttons">
                <button @click="showMap('TempMap')">Temp</button>
                <button @click="showMap('RainfallMap')">Rainfall</button>
                <button @click="showMap('HumidMap')">Humidity</button>
                <button @click="showMap('Table')">Table</button>
            </div>
            <div class="map">
                <TempMapDisplay v-if="currentMap === 'TempMap'" />
                <HumidMapDisplay v-if="currentMap === 'HumidMap'" />
                <RainfallMapDisplay v-if="currentMap === 'RainfallMap'" />
                <WeatherTable v-if="currentMap === 'Table'" />
            </div>
            <div>
                <h2>Storm Prediction Center Convective Outlooks</h2>
                <TestMap />
            </div>
        </div>
    </div>
</template>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Bebas+Neue&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Ysabeau+SC:wght@100;200;300;400;500;600;700;800;900;1000&display=swap');

    #homepage-body {
        font-family: 'Ysabeau SC', sans-serif;
        padding: 10px;
        text-align: center;
    }

    #homepage-body p {
        display: block;
        margin: auto;
        width: 80%;
        font-style: normal;
        justify-content: center;
        text-align: center;
    }

    .servicelist {
        width: 80%;
        margin: auto;
        list-style-type: none;
    }

    @media only screen and (min-width: 768px) {
        .scrollimages img {
            width: 700px;
            list-style-type: none;
            display: block;
            padding-top: 10px;
            margin: auto;
        }

        .map-buttons button {
            background-color: rgba(255, 255, 255, 0);
            color: black;
            display: inline-block;
            margin: 8px;
            padding: 0;
            border: 2px solid rgb(139, 24, 26);
            text-decoration: none;
            height: fit-content;
            width: 15%;
            font-family: 'Alegreya Sans', sans-serif;
            font-size: 1em;
            text-transform: uppercase;
        }

        .map-buttons button:hover {
            background-color: rgb(139, 24, 26);
            color: white;
            border: 2px solid black;
        }
    }

    @media only screen and (max-width: 768px) {
        .scrollimages img {
            width: 80%;
            list-style-type: none;
        }

        .map-buttons button {
            background-color: rgba(255, 255, 255, 0);
            color: black;
            margin: 8px;
            display: inline-block;
            padding: 0;
            border: 2px solid rgb(139, 24, 26);
            text-decoration: none;
            width: 15%;
            font-family: 'Alegreya Sans', sans-serif;
            font-size: 3vw;
            text-transform: uppercase;
        }

        .map-buttons button:hover {
            background-color: rgb(139, 24, 26);
            color: white;
            border: 2px solid black;
        }
    }

    .header {
        background-color: black;
        color: white;
    }

    .quickview {
        width: 100%;
    }

    .table {
        width: 80%;
        border: 2px solid black;
        margin-left: 10%;
        margin-right: 10%;
    }

    table,
    td,
    th {
        border: 1px black solid;
        border-collapse: collapse;
    }
</style>
