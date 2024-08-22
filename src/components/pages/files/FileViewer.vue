<template>
    <div>
      <h1>File Viewer</h1>
      <div v-if="loading">Loading items...</div>
      <div v-if="error">{{ error }}</div>
      <ul v-if="!loading && !error">
        <li v-for="item in items" :key="item.path">
          <template v-if="item.isFolder">
            <a @click.prevent="navigateTo(item.path)">{{ item.name }}</a>
          </template>
          <template v-else>
            <a :href="item.url" target="_blank">{{ item.name }}</a>
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
  
  // Reactive variables
  const items = ref([]);
  const loading = ref(true);
  const error = ref('');
  
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
          url,
          name: itemRef.name, // Only the file name
          isFolder: false
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
    fetchItems(newPath || '');
  });
  
  // Initial fetch based on current route
  onMounted(() => {
    fetchItems(route.params.filepath || '');
  });
  
  // Function to navigate to a new path
  function navigateTo(path) {
    router.push({ path: `/file/${encodeURIComponent(path)}` });
  }
  </script>
  