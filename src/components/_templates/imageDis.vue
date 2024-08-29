<template>
    <div>
        <img :src="ImageURL" class="w-full"/>
    </div>
</template>

<script setup>
const props = defineProps({
    ImageURL: {
        type: String,
        required: true,
    },
});
</script>