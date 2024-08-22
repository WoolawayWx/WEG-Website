<template>
    <div>
      <h1>WEG File Browser System</h1>
      <div>
        <i>Show Files Here</i>
      </div>
      <ul>
        <li v-for="file in files" :key="file.path">
          <a :href="file.url" target="_blank">{{ file.path }}</a>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { storage } from '@/firebase';
  import { ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';
  
  // Reactive variable to store the list of files
  const files = ref([]);
  
  // Reference to the 'public' folder
  const publicRef = storageRef(storage, 'public/');
  
  // List all files in the 'public' folder
  listAll(publicRef)
    .then(async (result) => {
      const filePromises = result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return {
          path: itemRef.fullPath,
          url
        };
      });
  
      files.value = await Promise.all(filePromises);
    })
    .catch((error) => {
      console.error("Error listing files:", error);
    });
  </script>
  