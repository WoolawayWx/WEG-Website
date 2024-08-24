<!-- <template>

    <div v-if="loadwindow">
        <p>Full URL Path: {{ $route.fullPath }}</p>
        <p>{{ firebaseurl }}</p>
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
</style> -->

<template>
    <h2>The file browser is currently down. While I work on a new one, I will use the WEG Google Drive Folder to store files. All linked files will be routed this way.</h2>
    <iframe src="https://googledriveembedder.collegefam.com/?key=AIzaSyAQohnTFXrucyc9HxBuDS9PDpKHzZks6nk&folderid=1bkFcJDabDNy6dLUz_gi7pC268PaqRwF6" style="border:none;" class="desktop:w-1/2 desktop:ml-[25%] mobile:w-full"></iframe>
</template>