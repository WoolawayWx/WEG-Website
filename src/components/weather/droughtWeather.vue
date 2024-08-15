<template>
    <h1 class="text-2xl">Drought Monitor</h1>
    <div class="flex justify-center">
        <div id="map" ref="mapContainer" class="mobile:w-full mobile:aspect-9/12 lg:w-4/5 lg:aspect-video relative">
            <div class="absolute flex flex-row justify-center z-10 bottom-[0%] w-full">
                <img src="https://droughtmonitor.unl.edu/webfiles/logos/NDMC/svg/NDMC-logo-color-round.svg"
                    class="m-1 desktop:w-[5%] mobile:w-[15%]">
                <img src="https://droughtmonitor.unl.edu/webfiles/logos/NOAA/svg/NOAA-logo-color.svg"
                    class="-1 desktop:w-[5%] mobile:w-[15%]" />
            </div>
        </div>
    </div>
    <div class="w-full">
        <h1 class="text-md font-bold font-Alegreya-Sans uppercase">Image Resources</h1>
        <div class="flex flex-col">
            <i class="text-sm">State Specfic Maps</i>
            <i class="text-xs">Unable to show due to lack of file structure. Click on button to open state page into a new tab.</i>
            <div class="flex flex-wrap justify-center">
                <button class="btn-primary" @click="NewTab('https://droughtmonitor.unl.edu/CurrentMap/StateDroughtMonitor.aspx?AR')">
                    Arkansas
                </button>
                <button class="btn-primary" @click="NewTab('https://droughtmonitor.unl.edu/CurrentMap/StateDroughtMonitor.aspx?KS')">
                    Kansas
                </button>
                <button class="btn-primary" @click="NewTab('https://droughtmonitor.unl.edu/CurrentMap/StateDroughtMonitor.aspx?MO')">
                    Missouri
                </button>
                <button class="btn-primary" @click="NewTab('https://droughtmonitor.unl.edu/CurrentMap/StateDroughtMonitor.aspx?OK')">
                    Oklahoma
                </button>
            </div>

        </div>

    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import mapboxgl from 'mapbox-gl';

    // Use your Mapbox access token
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2FkZS13b29sYXdheXd4IiwiYSI6ImNsZDd1NTR5YjA2OXIzcW9heTYxMzZ4eWwifQ.6gn5t5sGVTVWJuqurZRlaQ';

    const mapContainer = ref(null);
    const map = ref(null);

    function NewTab(url) {
        window.open(url, "_blank")
    }

    onMounted(() => {
        map.value = new mapboxgl.Map({
            container: mapContainer.value,
            style: 'mapbox://styles/mapbox/streets-v11', // Use the default Mapbox style
            center: [-94, 36.8], // Center on the USA
            zoom: 7,
            attributionControl: false

        });

        map.value.on('load', () => {
            // Add the WMS layer as a raster source
            map.value.addSource('wms-source', {
                'type': 'raster',
                'tiles': [
                    'https://ndmcgeodata.unl.edu/cgi-bin/mapserv.exe?map=/ms4w/apps/usdm/map/usdm_current_wms.map&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=usdm_current&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&STYLES=&FORMAT=image/png&BBOX={bbox-epsg-3857}'
                ],
                'tileSize': 256
            });

            // Insert the WMS layer beneath all other Mapbox layers
            const layers = map.value.getStyle().layers;

            // Find the first symbol layer in the Mapbox style
            let firstSymbolId;
            for (const layer of layers) {
                if (layer.type === 'symbol') {
                    firstSymbolId = layer.id;
                    break;
                }
            }

            map.value.addLayer(
                {
                    'id': 'wms-layer',
                    'type': 'raster',
                    'source': 'wms-source',
                    'paint': {}
                },
                firstSymbolId // Insert the WMS layer beneath the first symbol layer
            );
            // Add navigation control (zoom buttons and compass)
            /* map.value.addControl(new mapboxgl.NavigationControl(), 'top-right'); */

            // Add attribution control
            map.value.addControl(new mapboxgl.AttributionControl({
                compact: true
            }));
            // Enable dragging and cursor style changes
            map.value.dragPan.enable();

            map.value.on('mouseenter', () => {
                map.value.getCanvas().style.cursor = 'grab';
            });

            map.value.on('mousedown', () => {
                map.value.getCanvas().style.cursor = 'grabbing';
            });

            map.value.on('mouseup', () => {
                map.value.getCanvas().style.cursor = 'grab';
            });

            map.value.on('mouseleave', () => {
                map.value.getCanvas().style.cursor = '';
            });
        });
    });
</script>

<style>
    @import url('https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.css');

    canvas {
        width: 100%;
        height: 100%;
    }

    #map {
        position: relative;
        overflow: hidden;
    }

    .pointer-events-none {
        pointer-events: none;
        /* Allow interactions to pass through to the map */
    }
</style>