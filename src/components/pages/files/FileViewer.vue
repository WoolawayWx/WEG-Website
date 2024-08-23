<template>
    <div>
        <!-- Back Button -->
        <button v-if="currentFolder" @click="goBack" class="back-button">
            <i class="fas fa-arrow-left"></i> Back
        </button>

        <h1>{{ currentFolder }}</h1>

        <div v-if="isPdf">
            <vue-pdf-embed v-if="fileUrl" :source="fileUrl" />
        </div>
        <div v-else-if="isImage">
            <img :src="fileUrl" alt="Image Preview" />
        </div>
        <div v-else>
            <p v-if="files.length" class="font-bold uppercase">Select a file or folder:</p>
            <ul>
                <li v-for="file in files" :key="file.name">
                    <a v-if="file.isFolder" @click="navigateToFolder(file.name)"><i class="fas fa-folder"></i> {{ file.name }}</a>
                    <a v-else @click="viewFile(file.name)"><i class="fas fa-file"></i> {{ file.name }}</a>
                </li>
            </ul>
            <p v-if="files.length === 0">No files or folders found.</p>
            <p v-if="files.length" class="">Click on a folder or file to open it. To share, use the web address.</p>
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


    // Convert the path using `-` as the separator instead of `/`
    path = path.replace(/-/g, '/');

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
    const formattedPath = newPath.replace(/\//g, '-'); // Convert `/` to `-`
    router.push({ query: { file: formattedPath } });  // Update URL with the new path
}

function viewFile(fileName) {
    const newPath = `${currentFolder.value}${fileName}`;
    const formattedPath = newPath.replace(/\//g, '-'); // Convert `/` to `-`
    router.push({ query: { file: formattedPath } });  // Update URL to new file
}

// New method for navigating to parent folder
function goBack() {
    // Split the current folder path by `/` and remove the last part
    const segments = currentFolder.value.split('/').filter(Boolean);  // Filter out any empty strings

    if (segments.length > 0) {
        segments.pop();  // Remove the last folder/file
    }

    // Join the segments back to form the parent path
    const parentPath = segments.join('/');

    // Convert `/` to `-` if there is a parent path, otherwise navigate to root
    const formattedParentPath = parentPath ? parentPath.replace(/\//g, '-') : '';  // Handle root case

    // Navigate to the parent folder or root if no parent path exists
    router.push({ query: { file: formattedParentPath } });
}

onMounted(() => {
    getFirebaseURL();
});

// Compute whether the file is a PDF or image based on the file extension
const isPdf = computed(() => fileName.value && fileName.value.endsWith('.pdf'));
const isImage = computed(() => fileName.value && /\.(jpg|jpeg|png|svg)$/.test(fileName.value));
</script>





<style scoped>
.back-button {
    background: #f0f0f0;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 10px;
}

.back-button:hover {
    background: #e0e0e0;
}
</style>