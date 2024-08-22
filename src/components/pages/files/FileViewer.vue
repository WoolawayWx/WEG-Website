<template>
    <div class="bg-black w-full flex text-white">
        <button @click="goBack" v-if="canGoBack" class=" text-white uppercase text-left ml-[10%] btn-onBlack m-1">
            <i class="pi pi-angle-double-left"></i>
            <span>Back</span>
        </button>
    </div>

    <div v-if="isFolder" class="text-black">
        <p>This route points to a folder. Here are the contents:</p>
        <ul>
            <li v-for="folder in folderList" :key="folder.name" style="cursor: pointer;">
                <span @click="navigateToFolder(folder.name)" style="color: blue;">📁 {{ folder.name }}</span>
            </li>
            <li v-for="file in fileList" :key="file.name" style="cursor: pointer;">
                <span @click="navigateToFile(file.name)" style="color: blue;">📄 {{ file.name }}</span>
                <button @click="viewFile(file.name)" style="margin-left: 10px;">View</button>
            </li>
        </ul>
    </div>

    <div v-else>
        <button @click="OpenInNewTab(fileURL)" class='btn-primary' title="View On Mobile">View On Mobile</button>
        <img v-if="isImageFile" :src="fileURL" alt="Firebase file" />
        <VuePdfEmbed v-if="isPdfFile" annotation-layer text-layer :source="fileURL" />
    </div>
</template>

<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { ref, onMounted } from 'vue'
    import { ref as storageRef, getDownloadURL, listAll } from "firebase/storage";
    import { storage } from "@/firebase.js";
    import VuePdfEmbed from 'vue-pdf-embed'

    import 'vue-pdf-embed/dist/styles/annotationLayer.css'
    import 'vue-pdf-embed/dist/styles/textLayer.css'

    // Use the useRoute hook to access route parameters
    const route = useRoute();
    const router = useRouter();

    // Create reactive variables
    const filepath = ref('public');
    const fileURL = ref('');
    const isFolder = ref(false);
    const isPdfFile = ref(false);
    const isImageFile = ref(false);
    const filepathArray = route.params.filepath || [];
    const fileList = ref([]);
    const folderList = ref([]);
    const canGoBack = ref(filepathArray.length > 0);

    // Build the full file path from the route parameters
    if (Array.isArray(filepathArray)) {
        filepath.value = filepathArray.reduce((acc, cur) => `${acc}/${cur}`, filepath.value);
    } else {
        filepath.value += `/${filepathArray}`;
    }

    // Function to check if the path is a file or folder
    const isFilePath = (path) => {
        const fileExtensions = ['.jpg', '.jpeg', '.png', '.pdf']; // Add more extensions as needed
        return fileExtensions.some(ext => path.endsWith(ext));
    };

    // Function to determine the file type
    const determineFileType = (path) => {
        if (path.endsWith('.pdf')) {
            isPdfFile.value = true;
        } else if (path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.png')) {
            isImageFile.value = true;
        }
    };

    // Function to list all files and folders in the directory
    const listFilesAndFoldersInDirectory = async () => {
        try {
            const folderRef = storageRef(storage, filepath.value);
            const res = await listAll(folderRef);
            fileList.value = res.items.map(itemRef => ({ name: itemRef.name }));
            folderList.value = res.prefixes.map(prefixRef => ({ name: prefixRef.name }));
        } catch (error) {
            console.error('Error listing files and folders in directory:', error);
        }
    };

    // Function to get the file from Firebase
    const getFile = async () => {
        if (!isFilePath(filepath.value)) {
            isFolder.value = true;
            await listFilesAndFoldersInDirectory(); // List files and folders if it's a directory
            return;
        }

        try {
            const fileRef = storageRef(storage, filepath.value);
            const url = await getDownloadURL(fileRef);
            fileURL.value = url;
            determineFileType(filepath.value);
        } catch (error) {
            console.error('Error getting file from Firebase:', error);
            isFolder.value = true; // Assume it's a folder if there's an error (could also be a permission issue)
            await listFilesAndFoldersInDirectory(); // Try listing files and folders as a fallback
        }
    };

    // Function to navigate to a specific file and reload the page
    const navigateToFile = (fileName) => {
        const newFilePath = [...filepathArray, fileName];
        const newRoute = { name: route.name, params: { filepath: newFilePath } };

        // Navigate and reload the page
        router.push(newRoute).then(() => {
            window.location.reload();
        });
    };

    // Function to navigate to a specific folder
    const navigateToFolder = (folderName) => {
        const newFilePath = [...filepathArray, folderName];
        const newRoute = { name: route.name, params: { filepath: newFilePath } };

        // Navigate to the folder
        router.push(newRoute).then(() => {
            window.location.reload();
        });
    };

    // Function to view a file directly in the browser
    const viewFile = async (fileName) => {
        try {
            const fullPath = ('/public/' + ([...filepathArray, fileName].join('/')));
            console.log('/public/' + fullPath)
            const fileRef = storageRef(storage, fullPath);
            const url = await getDownloadURL(fileRef);
            console.log(url)
            window.open(url, '_blank'); // Open the file in a new tab
        } catch (error) {
            console.error('Error viewing file in browser:', error);
        }
    };

    // Function to go back to the previous route
    const goBack = () => {
        const newFilePath = filepathArray.slice(0, -1);
        const newRoute = { name: route.name, params: { filepath: newFilePath } };

        // Navigate back to the previous route
        router.push(newRoute).then(() => {
            window.location.reload();
        });
    };
    const OpenInNewTab = (url) => {
        window.open(url, '_blank')
    }

    // Fetch the file URL when the component is mounted
    onMounted(() => {
        getFile();
    });
</script>