<template>
    <div>
        <h1>Viewing: {{ currentFolder }}</h1>

        <div v-if="isPdf">
            <vue-pdf-embed v-if="fileUrl" :source="fileUrl" />
        </div>
        <div v-else-if="isImage">
            <img :src="fileUrl" alt="Image Preview" />
        </div>
        <div v-else>
            <p v-if="files.length">Select a file or folder:</p>
            <ul>
                <li v-for="file in files" :key="file.name">
                    <a v-if="file.isFolder" @click="navigateToFolder(file.name)">{{ file.name }}/</a>
                    <a v-else @click="viewFile(file.name)">{{ file.name }}</a>
                </li>
            </ul>
            <p v-if="files.length === 0">No files or folders found.</p>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { storage } from '@/firebase';
    import { ref as storageRef, listAll } from 'firebase/storage';
    import VuePdfEmbed from 'vue-pdf-embed';

    const route = useRoute();
    const router = useRouter();
    const fileName = ref(null);
    const fileUrl = ref(null);
    const files = ref([]);
    const currentFolder = ref('');

    // Watch for route query changes
    watch(() => route.query.file, () => {
        getFirebaseURL();  // React to query changes
    }, { immediate: true });

    function getFirebaseURL() {
        let path = decodeURIComponent(route.query.file || '');

        // Default to root folder if no path is provided
        if (!path) {
            path = '';
        }

        currentFolder.value = path;

        if (path.endsWith('/')) {
            // Handle folder
            listFiles(path);
        } else if (path === '') {
            // Handle default case for root folder
            listFiles('');
        } else {
            // Handle file
            fileName.value = path;
            const encodedFileName = encodeURIComponent(fileName.value);
            fileUrl.value = `https://firebasestorage.googleapis.com/v0/b/weather-emergency-group-6a7c0.appspot.com/o/public%2F${encodedFileName}?alt=media`;
        }
    }

    function listFiles(folderPath) {
        const folderRef = storageRef(storage, `public/${folderPath}`);

        listAll(folderRef).then((res) => {
            files.value = res.items.map(item => ({
                name: item.name,
                isFolder: false
            }));
            res.prefixes.forEach(prefix => {
                files.value.push({
                    name: prefix.name,
                    isFolder: true
                });
            });
        }).catch((error) => {
            console.error("Error listing files:", error);
        });
    }

    function navigateToFolder(folderName) {
        const newPath = `${currentFolder.value}${folderName}/`; // Ensure folder path ends with '/'
        router.push({ query: { file: newPath } });  // Update URL to new folder
    }

    function viewFile(fileName) {
        const newPath = `${currentFolder.value}${fileName}`;
        router.push({ query: { file: newPath } });  // Update URL to new file
    }

    onMounted(() => {
        getFirebaseURL();
    });

    // Compute whether the file is a PDF or image based on the file extension
    const isPdf = computed(() => fileName.value && fileName.value.endsWith('.pdf'));
    const isImage = computed(() => fileName.value && /\.(jpg|jpeg|png|svg)$/.test(fileName.value));
</script>