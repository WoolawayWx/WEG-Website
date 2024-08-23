<template>

    <div v-if="loadwindow">
        <p>Full URL Path: {{ $route.fullPath }}</p>
        <p>{{ firebaseurl }}</p>
        <!-- <a :href="constructedFilePath">File Path: {{ constructedFilePath }}</a> -->
        <p>{{ filepath }}</p>
        <VuePdfEmbed :source="PublicFirebaseURL" style="height: 5cqw;" />
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router';
    import VuePdfEmbed from 'vue-pdf-embed';
    import { onMounted, ref } from 'vue';

    let firebaseurl = ref("public")
    let loadwindow = ref('false')
    let PublicFirebaseURL = ref("")

    const props = defineProps({
        filepath: {
            type: Array,
            required: false, 
        },
    });
    const route = useRoute();
    let filepath = props.filepath

    function GetFirebaseURL() {
        for (let i = 0; i < filepath.length; i++) {
            let addtofirebaseurl = '%2F' + filepath[i]
            firebaseurl.value = firebaseurl.value + "" + addtofirebaseurl
        }
        PublicFirebaseURL.value = 'https://firebasestorage.googleapis.com/v0/b/weather-emergency-group-6a7c0.appspot.com/o/' + firebaseurl.value + '?alt=media'
        loadwindow.value = true
    }

    onMounted(() => {
        GetFirebaseURL()
    })
</script>

<style scoped>
    /* Add any specific styling you want for the viewer */
</style>