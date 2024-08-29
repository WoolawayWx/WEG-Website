<template>
    <div>
        <h1>File Viewer</h1>
        <div v-if="loading">Loading items...</div>
        <div v-if="error">{{ error }}</div>

        <!-- Display file URL if a file is selected -->
        <div v-if="currentFile && currentFile.isPdf">
            <VuePDFEmbed :source="currentFile.url" />
            <p>File URL: <a :href="currentFile.url" target="_blank">{{ currentFile.url }}</a></p>
        </div>
        <div v-if="currentFile && !currentFile.isPdf">
            <imageDis :ImageURL="currentFile.url" class="mobile:w-full desktop:w-1/2 desktop:ml-[25%]"/>
            <button class="btn-primary"><a :href="currentFile.url" target="_blank">Open in New Tab</a></button>
        </div>

        <!-- Display file and folder list -->
        <ul v-if="!loading && !error && !currentFile">
            <li v-for="item in items" :key="item.path">
                <template v-if="item.isFolder">
                    <a @click.prevent="navigateTo(item.path)">{{ item.name }}</a>
                </template>
                <template v-else>
                    <a @click.prevent="viewPdf(item.path)">{{ item.name }}</a>
                </template>
            </li>
        </ul>
    </div>
</template>

<script setup>
    import { ref, watch, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { storage } from '@/firebase';
    import { ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';
    import VuePDFEmbed from 'vue-pdf-embed';
    import imageDis from '@/components/_templates/imageDis.vue';

    // Reactive variables
    const items = ref([]);
    const loading = ref(true);
    const error = ref('');
    const currentFile = ref(null);

    // Access the route and router instances
    const route = useRoute();
    const router = useRouter();

    // Function to fetch items from Firebase Storage
    async function fetchItems(path) {
        const folderRef = storageRef(storage, `public/${path}`);
        try {
            const result = await listAll(folderRef);
            const itemPromises = result.items.map(async (itemRef) => {
                const url = await getDownloadURL(itemRef);
                return {
                    path: itemRef.fullPath.replace('public/', ''), // Remove 'public/' from path
                    url: buildUrl(itemRef.fullPath.replace('public/', '')), // Build the correct URL format
                    name: itemRef.name, // Only the file name
                    isFolder: false,
                    isPdf: itemRef.name.endsWith('.pdf') // Check if the file is a PDF
                };
            });

            const folderPromises = result.prefixes.map(async (folderRef) => {
                return {
                    path: folderRef.fullPath.replace('public/', ''), // Remove 'public/' from path
                    name: folderRef.name, // Only the folder name
                    isFolder: true
                };
            });

            items.value = await Promise.all([...itemPromises, ...folderPromises]);
        } catch (err) {
            error.value = 'Error fetching items.';
            console.error(err);
        } finally {
            loading.value = false;
        }
    }

    // Watch for route changes and fetch new data accordingly
    watch(() => route.params.filepath, (newPath) => {
        loading.value = true;
        error.value = '';
        currentFile.value = null;

        if (Array.isArray(newPath)) {
            newPath = newPath.join('/');
        }

        if (newPath && newPath.endsWith('.pdf')) {
            const encodedPath = encodeURIComponent(newPath);
            const url = `https://firebasestorage.googleapis.com/v0/b/weather-emergency-group-6a7c0.appspot.com/o/public%2F${encodedPath}?alt=media`;
            console.log('PDF URL:', url);
            currentFile.value = {
                url,
                isPdf: true
            };
            loading.value = false; // Done loading
        } else if(newPath && newPath.endsWith('.png')) {
            const encodedPath = encodeURIComponent(newPath);
            const url = `https://firebasestorage.googleapis.com/v0/b/weather-emergency-group-6a7c0.appspot.com/o/public%2F${encodedPath}?alt=media`;
            console.log('PNG URL:', url);
            currentFile.value = {
                url,
                isPdf: false,
                isPng: true,
            };
            loading.value = false; // Done loading
        } else {
            fetchItems(newPath || '');
        }
    });

    // Initial fetch based on current route
    onMounted(() => {
        let filepath = route.params.filepath || '';

        if (Array.isArray(filepath)) {
            filepath = filepath.join('/');
        }
        console.log('Checking Path...')
        if (filepath.endsWith('.pdf')) {
            const encodedPath = encodeURIComponent(filepath);
            const url = `https://firebasestorage.googleapis.com/v0/b/weather-emergency-group-6a7c0.appspot.com/o/public%2F${encodedPath}?alt=media`;
            console.log('PDF URL:', url);
            currentFile.value = {
                url,
                isPdf: true,
                isPng: false,
            };
            loading.value = false; // Done loading
        }
        else if(filepath.endsWith('.png')) {
            const encodedPath = encodeURIComponent(filepath);
            const url = `https://firebasestorage.googleapis.com/v0/b/weather-emergency-group-6a7c0.appspot.com/o/public%2F${encodedPath}?alt=media`;
            console.log('PNG URL:', url);
            currentFile.value = {
                url,
                isPdf: false,
                isPng: true,
            };
            loading.value = false
        } else {
            fetchItems(filepath);
            console.log(filepath)
        }
    });

    // Function to navigate to a new path
    function navigateTo(path) {
        router.push({ path: `/file/${encodeURIComponent(path)}` });
    }

    // Function to view a PDF
    function viewPdf(path) {
        const encodedPath = encodeURIComponent(path);
        const url = `https://firebasestorage.googleapis.com/v0/b/weather-emergency-group-6a7c0.appspot.com/o/public%2F${encodedPath}?alt=media`;
        router.push({ path: `/file/${path}` });
        currentFile.value = {
            url,
            isPdf: true,
        };
        loading.value = false; // Done loading
    }

    // Helper function to build correct file URL
    function buildUrl(path) {
        const encodedPath = encodeURIComponent(path);
        return `https://firebasestorage.googleapis.com/v0/b/weather-emergency-group-6a7c0.appspot.com/o/public%2F${encodedPath}?alt=media`;
    }
</script>

<style>
    .pdf-viewer {
        margin-top: 20px;
    }
</style>