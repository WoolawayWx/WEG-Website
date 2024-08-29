<template>
    <div class="bg-primary rounded-xl m-2 text-white shadow-md shadow-black">
        <div id="title" class="relative flex flex-row pt-2 justify-center items-center">
            <!-- Display HeaderValue from props -->
            <div class="w-[100%] text-2xl font-Raleway font-bold uppercase">
                {{ HeaderValue }}
            </div>
            <!-- Clickable section to toggle Collapsed state -->
            <div class="absolute text-xl mr-2 w-[25%] h-full right-0 top-1/3" @click="CollapsedState">
                <i class="pi pi-times absolute right-0 top-0" v-if="!Collapsed" />
                <i class="pi pi-angle-double-down right-0 top-0 absolute" v-if="Collapsed" />
            </div>
        </div>
        <div id="body" v-if="!Collapsed">
            <slot />
        </div>


    </div>
</template>

<script setup>
    import { defineProps, ref } from 'vue';

    // Define props for the header value
    const props = defineProps({
        HeaderValue: {
            type: String,
            required: true,
        },
    });

    // Define the Collapsed state using ref
    let Collapsed = ref(false);

    // Function to toggle the Collapsed state
    function CollapsedState() {
        Collapsed.value = !Collapsed.value; // Correctly toggle the value
    }
</script>

